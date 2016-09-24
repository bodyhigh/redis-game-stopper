'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var _ = require('underscore');

var bodyparser = require('body-parser');
var urlencoded = bodyparser.urlencoded({extended: false});

var redisClient = require('./../database/redisConnection');

router.route('/')
    .get(function(req, res) {
        res.status(200).json({message: 'OK'});
    });

router.route('/leaderboard')
    .get(function(req, res) {
        redisClient.hgetall('leaderboard', function(error, data) {
            if (error) {
                throw error;
            } else {
                res.status(200).json(data);
            }
        });
    });

router.route('/score/:userid/:score')
    .get(function(req, res) {
        var userkey = 'userid:' + req.params.userid;
        var score = parseFloat(req.params.score);
        var totalPoints = score;
        var totalSpins = 1.0;
        var avgPoints = 0.0;

        // First Get the user record
        redisClient.hgetall(userkey, function(error, userRecord) {
            if (error) {
                throw error;
            } else {
                if (userRecord) {
                    totalPoints = score + (userRecord.totalPoints * 1.0);
                    totalSpins = (userRecord.totalSpins * 1.0) + 1;
                }

                avgPoints = (totalPoints / totalSpins).toFixed(2);
                redisClient.multi()
                    .hincrby(userkey, 'totalPoints', score)
                    .hincrby(userkey, 'totalSpins', 1)
                    .zincrby('leaderboardHighestTotal', totalPoints, userkey)
                    .zincrby('leaderboardHighestAverage', avgPoints, userkey)
                    .exec(function(error, res) {
                        if (error) {
                            throw error;
                        }
                    });
            }
        });

        res.status(201).json('completed');
    });

router.route('/leaderboardHighestTotal')
    .get(function(req, res) {
        redisClient.zrevrange('leaderboardHighestTotal', 0, -1, 'withscores', function(error, results) {
            if (error) {
                throw error;
            }

            /* Man-handle the results ex. ['a', '1', 'b', '2', 'c', '3'] into something more accurate to key/value format
             * [['a', '1'], ['b', '2'], ['c', '3']]
             * learned this from http://stackoverflow.com/questions/8566667/split-javascript-array-in-chunks-using-underscore-js
            */
            var lists = _.groupBy(results, function(a,b) {
                return Math.floor(b / 2);
            });

            res.status(200).json(_.toArray(lists));
        });
    });

router.route('/session')
    .all(urlencoded)
    .post(function(req, res) {
        redisClient.incr('nextSessionId', function(error, nextId) {
            if (error) {
                throw error;
            }

            var sessionId = 'sessionId:' + nextId.toString();
            redisClient.hmset(sessionId, 'name', req.body.name, 'password', req.body.password, function(error, results) {
                if (error) {
                    throw error;
                }
            });

            res.status(201).json({sessionId: sessionId, name: req.body.name});
        });
    });

router.route('/session/:sessionid')
    .get(function(req, res) {
        redisClient.hgetall(req.params.sessionid, function(error, results) {
            if (error) {
                throw error;
            } else {
                if (results === null) {
                    res.status(204).json({error:'Session could not be found.'});
                } else {
                    res.status(200).json({sessionId: req.params.sessionid, name: results.name});
                }
            }
        });

        // TODO: Should I be closing this???
        // redisClient.quit();
    });

module.exports = router;

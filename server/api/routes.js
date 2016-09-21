'use strict';

var express = require('express');
var router = express.Router();

var redisClient = require('./../database/redisConnection');

router.route('/')
    .get(function(req, res) {
        res.status(200).json({message: 'OK'});
    });

router.route('/leaderboard')
    .get(function(req, res) {
        redisClient.hgetall('GameStopper', function(error, data) {
            if (error) {
                throw error;
            } else {
                res.status(200).json(data);
            }
        });
    });


module.exports = router;

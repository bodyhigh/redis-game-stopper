var request = require('supertest');
var should = require('should');
var async = require('async');
var app = require('./../server/server');
var redisClient = require('./../server/database/redisConnection');

describe('Request to the root path', function() {
    it('Returns a 200 status and an HTML Index page', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/game stopper/i)
            .end(function(error, res) {
                if (error) {
                    throw error;
                }

                done();
            });
    });
});

describe('Request to the API root path', function() {
    it('Returns a status 200', function(done) {
        request(app)
            .get('/api')
            .expect(200)
            .end(function(error) {
                if (error) {
                    throw error;
                } else {
                    done();
                }
            });
    });
});

describe('/api/score', function() {
    beforeEach('Clear out the database', function() {
        var dosomething = 'clear out the db';
    });

    describe('Updating user score and leaderboardHighestTotal', function() {
        it('Returns 201 status code', function(done) {
            request(app)
                .get('/api/score/1000/4')
                .expect(201, done);
        });

        it('Returns JSON content type', function(done) {
            request(app)
                .get('/api/score/1000/4')
                .expect('Content-Type', /json/, done);
        });
    });

});

describe('/api/leaderboardHighestTotal', function() {
    before('Flush the database and populate with known values', function(done) {
        // TODO: Flush the database and populate with known values
        redisClient.flushdb();

        async.series([
            function(cb) { request(app).get('/api/score/1000/42').expect(201,cb); },
            function(cb) { request(app).get('/api/score/2000/0').expect(201, cb); },
            function(cb) { request(app).get('/api/score/2000/1').expect(201, cb); },
            function(cb) { request(app).get('/api/score/3000/-12').expect(201, cb); },
            function(cb) { request(app).get('/api/score/4000/2323').expect(201, cb); }
        ], done);
    });

    describe('Listing leaderboard on /api/leaderboardHighestTotal', function() {
        it('Returns 200 status', function(done) {
            request(app)
                .get('/api/leaderboardHighestTotal')
                .expect(200, done);
        });

        it('Returns JSON format', function(done) {
            request(app)
                .get('/api/leaderboardHighestTotal')
                .expect('Content-Type', /json/, done);
        });

        it('Returns correct number of players in correct order', function(done) {
            request(app)
                .get('/api/leaderboardHighestTotal')
                .expect(200)
                .end(function(error, res) {
                    if (error) {
                        throw error;
                    }

                    var leaderboard = res.body;
                    should(leaderboard).with.lengthOf(4);
                    should(leaderboard[0][0]).equal('userid:4000');
                    should(leaderboard[0][1]).equal('2323');
                    should(leaderboard[3][0]).equal('userid:3000');
                    should(leaderboard[3][1]).equal('-12');

                    done();
                });
        });
    });
});

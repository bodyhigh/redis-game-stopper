var request = require('supertest');
var should = require('should');
var async = require('async');
var app = require('./../server/server');
var redisClient = require('./../server/database/redisConnection');

describe('/api/session', function() {
    before('Flush the database and populate with known values', function(done) {
        // TODO: Flush the database and populate with known values
        redisClient.flushdb();

        async.series([
            function(cb) { request(app).post('/api/session').send('name=bob dobbs&password=supergenius').expect(201,cb); },
            // function(cb) { request(app).get('/api/score/2000/0').expect(201, cb); },
            // function(cb) { request(app).get('/api/score/2000/1').expect(201, cb); },
            // function(cb) { request(app).get('/api/score/3000/-12').expect(201, cb); },
            // function(cb) { request(app).get('/api/score/4000/2323').expect(201, cb); }
        ], done);
    });

    describe('POST to /api/session registers a new user account', function() {
        it('Returns 200 status and a json result with sessionid and name', function(done) {
            request(app)
                .post('/api/session')
                .send('name=bob&password=hello')
                .expect(201)
                .end(function(error, results) {
                    should(results.body).have.property('sessionId');
                    should(results.body).have.property('name');
                    done();
                });
        });

        it('User\'s details were correctly recorded in the sessionId:X hash', function(done) {
            request(app)
                .post('/api/session')
                .send('name=bob&password=hello')
                .expect(201)
                .expect(/sessionid:/i)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    redisClient.hgetall(res.body.sessionId, function(error, results) {
                        should(results.name).equal('bob');
                        should(results.password).equal('hello');
                        done();
                    });
                });
        });
    });

    describe('GET to /api/session/:sessionid', function() {
        it('Returns 204 if session is not found', function(done) {
            request(app)
                .get('/api/session/sessionId:9999')
                .expect(204, done);
        });

        it('Returns 200 status and session details if one is found', function(done) {
            request(app)
                .get('/api/session/sessionId:1')
                .expect(200)
                .end(function(error, results) {
                    should(results.body).have.property('sessionId');
                    should(results.body.sessionId).equal('sessionId:1');
                    should(results.body).have.property('name');
                    should(results.body.name).equal('bob dobbs');
                    done();
                });
        });
    });
});

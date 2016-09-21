var request = require('supertest');
var app = require('./../server/server');

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

describe('Listing leaderboard on /api/leaderboard', function() {
    it('Returns 200 status', function(done) {
        request(app)
            .get('/api/leaderboard')
            .expect(200, done);
    });

    it('Returns JSON format', function(done) {
        request(app)
            .get('/api/leaderboard')
            .expect('Content-Type', /json/, done);
    });
});

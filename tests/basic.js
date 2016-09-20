var request = require('supertest');
var app = require('./../server/server');

describe('Request to the root path', function() {
    it('Returns a 200 status', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function(error) {
                if (error) {
                    throw error;
                } else {
                    done();
                }
            });
    })
})

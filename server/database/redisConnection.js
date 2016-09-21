var redisConfig = {
    host: '127.0.0.1',
    post: '6379',
    db: '1'
};
var redis = require('redis');
var client = redis.createClient();

module.exports = client;

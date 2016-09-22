var redisConfig = {
    host: '127.0.0.1',
    post: '6379',
    db: '1'
};

var env = process.env.NODE_ENV || 'development';

var redis = require('redis');
var client = redis.createClient();

if (env === 'test') {
    client.select(env.length);
}

module.exports = client;

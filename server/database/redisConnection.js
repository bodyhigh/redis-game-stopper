var env = process.env.NODE_ENV || 'development';

var redis = require('redis');

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
} else {
    var client = redis.createClient();
}

if (env === 'test') {
    client.select(4);
}

// TODO: Should I be closing the client as well?

module.exports = client;

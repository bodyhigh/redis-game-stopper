var express = require('express');
var path = require('path');

var app = express();
var root = path.normalize(__dirname + '/..');

app.set('clientPath', path.join(root, 'client'));
app.use(express.static(app.get('clientPath')));

app.use('/api', require('./api/routes'));

app.use('/environment', function(req, res) {
    var env = process.env.NODE_ENV || 'development';
    res.status(200).json(env);
});

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(app.get('clientPath') + '/index.html'));
});

module.exports = app;

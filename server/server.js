var express = require('express');
var path = require('path');

var app = express();
var root = path.normalize(__dirname + '/..');

app.set('clientPath', path.join(root, 'client'));
app.use(express.static(app.get('clientPath')));

app.get('/*', function(req, res) {
    throw 'Error';
    // res.sendFile(path.resolve(app.get('clientPath') + '/index.html'));
});

module.exports = app;

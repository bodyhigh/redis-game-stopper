var express = require('express');
var path = require('path');

var app = express();
var root = path.normalize(__dirname + '/..');

// app.get('/', function(req, res) {
//     // throw 'Some error goes here';
//     res.status(200).send('Hello world');
// });

app.set('clientPath', path.join(root, 'client'));
app.use(express.static(app.get('clientPath')));

app.use('/api', require('./api/routes'));

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(app.get('clientPath') + '/index.html'));
});

module.exports = app;

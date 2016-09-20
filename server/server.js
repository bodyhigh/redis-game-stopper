var express = require('express');
var path = require('path');

var app = express();

var root = path.normalize(__dirname + '/..');

app.set('clientPath', path.join(root, 'client'));
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(app.get('clientPath') + '/index.html'));
});

app.listen('3000', function() {
    console.log('Listening on port 3000');
});

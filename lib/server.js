var express   = require('express'),
    config    = require('./config'),
    morgan    = require('morgan');

var app = express();

// Serve static before logging
var clientDir = __dirname + '/client/';
console.log(clientDir);
app.use('/static', express.static(clientDir));

// Add Logging
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.sendfile(clientDir + '/index.html');
});

module.exports.start = function(port) {
  var server = app.listen(port, function() {
    console.log('rs-reporter server started on: http://localhost:%s', server.address().port);
  });
};

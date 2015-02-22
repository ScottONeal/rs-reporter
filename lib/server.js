var express   = require('express'),
    config    = require('./config'),
    morgan    = require('morgan'),
    build     = require('./build');

var app = express();

// Serve static before logging
var clientDir = __dirname + '/client/';
console.log(clientDir);
app.use('/static', express.static(clientDir));

// Add Logging
app.use(morgan('dev'));

// Use API Router
app.use('/api', require('./api.js'));

// Send all others to index
app.get('*', function(req, res) {
  res.sendFile(clientDir + '/index.html');
});

module.exports.start = function(pathToConfig) {
  var appConfig = config.application(pathToConfig);

  app.locals.config = appConfig;

  build.projects(appConfig, function(err) {
    if ( err ) {
      console.log('Error starting server: %s', err);
      process.exit();
    }

    var server = app.listen(appConfig.port || 3400, function() {
      console.log('rs-reporter server started on: http://localhost:%s', server.address().port);
    });
  });

};

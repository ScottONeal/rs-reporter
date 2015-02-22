var fs   = require('fs'),
    path = require('path');

module.exports.application = function(pathToConfig) {
  // TODO add validation
  var config = JSON.parse(fs.readFileSync(pathToConfig, 'utf8'));

  config.workingPath = path.parse(pathToConfig).dir;

  return config;
};

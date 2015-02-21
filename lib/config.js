var fs = require('fs');

module.exports.application = function(pathToConfig) {
  return JSON.parse(fs.readFileSync(pathToConfig, 'utf8'));
};

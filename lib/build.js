var gitane  = require('gitane'),
    async   = require('async'),
    fs      = require('fs');

module.exports.projects = function(config, callback) {
  projects = [];
  config.projects.forEach(function(project) {
    projects.push(function(callback) {
      module.exports.project(config, project, callback);
    });
  });

  async.series(projects, function(err) {
    console.log('\nAll Projects Cloned or Ready\n');
    callback(err);
  });

};

module.exports.project = function(config, projectConfig, callback) {
  var cwd     = config.workingPath,
      name    = projectConfig.name,
      projDir = cwd + '/projects/' + name;

  if ( !fs.existsSync(projDir) ) {
    fs.mkdirSync(projDir);
    console.log('Made project directory for: %s', name);
  }

  if ( fs.existsSync(projDir + '/repo') ) {
    console.log('Project %s already built', name);
  }
  else {
    console.log('Cloning Project: %s...', name);
    gitane.run(cwd + '/projects/' + name, null,  'git clone ' + projectConfig.url + ' repo', function( err, stdout, stderr, exitCode ) {
      if ( err || exitCode ) {
        console.log('Error cloning %s\nError: %s\nExitcode: %s\nSTDERR: %s', name, err, exitCode, stderr);
        callback(err);
      }
      else {
        console.log('%s successfully cloned.', name);
        callback(null);
      }
    });
  }
};

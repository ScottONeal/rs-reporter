var rswrap = require('./requiresafe-wrap'),
    async  = require('async'),
    fs     = require('fs');

module.exports = function(config, projectPath) {

  var results = [];

  async.each(config.projects, function(project, callback) {
    console.log('Scanning Project: %s', project.name);

    project.path = projectPath + '/projects/' + project.name

    rswrap.check(project, function(err, body) {
      if ( err )
        return callback(err);

      fs.appendFile(project.path + '/log', '['+(new Date()).toUTCString()+'] ' + JSON.stringify(body));
      fs.appendFile(project.path + '/result.json', JSON.stringify(body));

      var result = { name: project.name };
      if ( !body.length ) {
        result.passed = true;
        result.description = '0 vulnerabilities found.';
      }
      else {
        result.passed = false;
        result.description = body.length + ' vulnerabilities found.';
      }

      results.push(result);
      callback(null);
    });
  },
  function(err) {
    if ( err )
      return console.log("Error scanning projects: %s", err);

    fs.writeFileSync(projectPath + '/' + config.reportFile, JSON.stringify(results));
  }
  );
};

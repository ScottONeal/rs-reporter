var SDK   = require('requiresafe-sdk');
    tryIt = require('tryit'),
    fs    = require('fs'),
    pick  = require('amp-pick'),
    rc    = require('rc');

var config = rc('requiresafe', {
    token: ''
});

var proxy = process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY;

var rsAPI = new SDK({
    authToken: config.token,
    acceptType: 'application/json',
    local: config.hasOwnProperty('local'),
    proxy: proxy
});

// This Export is pretty much ripped from requiresafe commands/check...
module.exports.check = function(project, callback) {

    var result = {};

    tryIt(function () {
        result.package = pick(JSON.parse(fs.readFileSync(project.path + '/repo/package.json', 'utf8')), ['name', 'version', 'dependencies', 'devDependencies']);
    });
    //tryIt(function () {
    //    result.shrinkWrap = JSON.parse(fs.readFileSync(shrinkWrap, 'utf8'));
    //});

    if (!result.package) {
        return callback(new Error('Unable to read package.json file.'));
    }

    rsAPI.checkDependencies(result, function (err, results) {
        if (err)
            return callback(err);

        return callback(null, results);
    });
};

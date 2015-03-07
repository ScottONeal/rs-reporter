var express = require('express'),
    fs      = require('fs');

// Create API Router
var router = express.Router();

// GET /config
router.get('/config', function(req, res) {
  res.send(req.app.locals.config);
});

router.get('/projects', function(req, res) {
  res.sendFile(req.app.locals.path + '/' + req.app.locals.config.reportFile);
});

router.get('/about', function(req, res) {
  res.set('Content-Type', 'application/json');
  console.log(__dirname);
  res.sendFile('package.json', { root: __dirname + '/../'});
});

module.exports = router;

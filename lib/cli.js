#!/usr/bin/env node

if (process.getuid && process.getuid() === 0) {
  global.console.error("rs-reporter doesn't need superuser privileges. Don't run it under root.")
}

var program = require('commander'),
    chalk   = require('chalk'),
    fs      = require('fs'),
    exec    = require('child_process').exec;
    server  = require('./server'),
    pack    = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')),
    SDK     = require('requiresafe-sdk'),
    rc      = require('rc'),
    config = rc('requiresafe', {
      token: ''
    });

program
  .version(pack.version)
  .description('A Reporting Server for Require Safe')
  .option('-l, --listen <[host:]port>', 'host:port number to listen on (default: localhost:3400)')
  .option('-n, --new [name]', 'Create a new rs-reporter server')
  .option('-c, --check', 'Checks if requiresafe is setup for rs-reporter to run')
  .parse(process.argv);

if ( program.rawArgs.length == 2 )
  program.help();

if ( program.check )
  check();

if ( program.new )
  createNew();

function createNew() {
  \
}

// Checks if environment is setup correctly to run rs-reporter
function check() {

  console.log(chalk.cyan('Checking if requiresafe installed...'));
  exec('requiresafe', function(err, stdout, stderr) {
    // Check if there were any errors
    if ( err ) {
      process.stderr.write(chalk.red('requiresafe not found, please make sure it is installed before proceding.\nError: ', err, '\n\n'));
      process.exit(1);
    }

    else if ( stdout.length ) {
      console.log('requiresafe found!\n');
      console.log(chalk.cyan('Checking if authenticated with requiresafe...'));
      if ( config && config.token ) {
        console.log('it would appear you have authenticated with requiresafe.\n');
        console.log(chalk.green('Check Successful!'));
        process.exit();
      }
      else {
        process.stderr.write(chalk.red('you have not authenticated with requiresafe, please run: requiresafe login\n\n'));
        process.exit(1);
      }
    }
  });
}



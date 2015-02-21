#!/usr/bin/env node

if (process.getuid && process.getuid() === 0) {
  global.console.error("rs-reporter doesn't need superuser privileges. Don't run it under root.")
}

var program = require('commander'),
    chalk   = require('chalk'),
    fs      = require('fs'),
    exec    = require('child_process').exec,
    readline= require('readline'),
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
  .option('-s, --start <rs-config-file>', 'Start your rs-reporter server')
  .option('-n, --new [name]', 'Create a new rs-reporter server')
  .option('-c, --check', 'Checks if requiresafe is setup for rs-reporter to run')
  .parse(process.argv);

// Send to help if no args sent
if ( program.rawArgs.length == 2 )
  program.help();

// Run Check
if ( program.check )
  check();

// Create new Project
if ( program.new ) {
  if ( program.new && typeof program.new === 'boolean' )
    program.new = 'rs-reporter';
  createNew();
}

// Start rs-reporter server
if ( program.start ) {
  server.start(program.start);
}

function createNew() {

  var name = typeof program.new === 'boolean' ? 'rs-recorder' : program.new;

  var rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Are you sure you would like to create a new rs-reporter?\n\nProject Name: '+chalk.cyan(name)+'\nProjected will be created at: '+chalk.cyan(process.cwd()+name)+'\n\nContinue? (y/n)', function(answer) {

    // Check If answer is not yes
    if ( !answer.toLowerCase().match(/(y|ye|yes)/) ) {
      console.log('Stopping..');
      process.exit();
    }
    // Time to run create
    else {
      console.log(chalk.green('Proceeding with creation.'));
      // TODO add stat checks...
      createDir(name);
      createDir(name + '/projects');

      var configFileName = name + '/rs-recorder-config.json';
      fs.writeFileSync(configFileName, JSON.stringify({
        name: name,
        checkInterval: 5,
        popLogs: 20,
        projects: []
      }, null, 2));
      console.log('Created Config File: %s', configFileName);
      process.exit(0);
    }
  });

}

function createDir(path) {
  try {
    fs.mkdirSync(path)
  }
  catch (e) {
    console.log('Error creating directory %s : ', path, e);
    process.exit(1);
  }
  console.log('Created directory: %s', path);
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



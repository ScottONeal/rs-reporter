# rs-reporter

**A Reporting Server for Require Safe**

This is a informal project (and in its infancy) used for managing different projects status using [^Lift Security's](https://liftsecurity.io/) [requireSafe](http://requiresafe.com/) service. The idea is to have a continuous monitoring of multiple project dependencies, which becomes needed when operating under an organization that has a lot of concurrent projects being developed by discrete groups of people.

## Installation

```
npm install -g rs-reporter
```

## Setting up a Server

Once installed, you can create a new rs-reporter server:

```
rs-reporter --new MyReportingServer
```

Follow the prompts, if you will, and this will create the following directory tree:

```
└── MyReportingServer
    ├── projects/
    ├── report.json
    └── rs-reporter-config.json
```

You can now start your rs-reporter server by either running:

```
# Go to server's directory
 cd MyReportingServer
rs-reporter --start
```

Or

```
# Provide a path to config file
rs-reporter --start MyReportingServer/rs-reporter-config.json
```

If using the default config, this will start your server on port 3400.

## Adding Projects

TODO: Add projects from the cli

As of right now, in order to add a project to rs-reporter you need to go into rs-reporter-config.json and add hash to the projects key.
```
"projects": [
  { "name": "xfdf",
    "url": "https://github.com/ScottONeal/xfdf" }
]
```

Restarting your server will clone the project and run an initial scan. You will be able to review the results of the scan by opening rs-reporter in your browser.


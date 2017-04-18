/* eslint-disable */

exports.config = {
  specs: [
    './src/test/e2e/**/*.js',
  ],
  exclude: [],
  maxInstances: 2,
  sync: true,
  logLevel: 'debug',
  coloredLogs: true,
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 30000
  },

  onPrepare: function() {
    console.log('let\'s go');
  },

  onComplete: function() {
    console.log('that\'s it');
  }

};

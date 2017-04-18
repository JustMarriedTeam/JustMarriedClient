/* eslint-disable */
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}.png`);
  };
}

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
  screenshotPath: './errorShots/',
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-register'],
    timeout: 30000
  },

  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
      misMatchTolerance: 0.01,
    }),
    viewportChangePause: 300,
    widths: [320, 480, 640, 1024],
    orientations: ['landscape', 'portrait'],
  },

  onPrepare: function() {
    console.log('let\'s go');
  },

  onComplete: function() {
    console.log('that\'s it');
  }

};

const base = require('./wdio.base.config')

exports.config = Object.assign(base.config, {
  capabilities: [
    { browserName: 'phantomjs' }
    // If you want to use other browsers,
    // you may need local Selenium standalone server.
  ],
  services: ['phantomjs']
})

/* eslint-disable */

const base = require('./wdio.base.config')

exports.config = Object.assign(base.config, {
  capabilities: [
    // {
    //   browserName: 'phantomjs'
    // },
    {
      browserName: 'chrome'
    }
  ],
  services: ['phantomjs', 'selenium-standalone', 'static-server'],
  baseUrl: 'http://localhost:4567',
  staticServerLog: true,
  staticServerPort: 4567,
  staticServerFolders: [
    { mount: '/', path: './public' }
  ],
});

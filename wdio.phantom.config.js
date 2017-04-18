/* eslint-disable */

const base = require('./wdio.base.config')

exports.config = Object.assign(base.config, {
  capabilities: [
    {
      browserName: 'phantomjs'
    }
  ],
  services: ['phantomjs', 'static-server', 'visual-regression'],
  baseUrl: 'http://localhost:4567',
  staticServerLog: true,
  staticServerPort: 4567,
  staticServerFolders: [
    { mount: '/', path: './public' }
  ],
});


const base = require('./wdio.cloud.config');

exports.config = Object.assign(base.config, {
  capabilities: [
    {
      browserName: 'chrome',
      platform: 'WIN10',
      version: 'latest',
    },
    {
      browserName: 'firefox',
      platform: 'WIN10',
      version: 'latest',
    },
  ],
  services: ['testingbot'],
  user: process.env.TESTINGBOT_KEY,
  key: process.env.TESTINGBOT_SECRET,
});

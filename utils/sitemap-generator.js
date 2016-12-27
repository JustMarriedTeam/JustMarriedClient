const sm = require('sitemap');

module.exports = (cfg) => sm.createSitemap({
  hostname: cfg.url,
  cacheTime: 600000,
  urls: [
      { url: '/home/', changefreq: 'monthly', priority: 0.8 },
      { url: '/tasks/', changefreq: 'monthly', priority: 0.2 },
  ],
}).toString();

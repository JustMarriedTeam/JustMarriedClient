/* eslint-disable global-require */

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const merge = require('lodash/merge');
const mapValues = require('lodash/mapValues');
const debug = require('debug')('debug:webpack.config');

const envProfile = process.env.NODE_ENV || 'development';
const envDescriptorPath = path.join(__dirname, `config/environment/${envProfile}.config.yaml`);
const envDescriptor = yaml.load(fs.readFileSync(envDescriptorPath, 'UTF-8'));
const envBuildDescriptor = envDescriptor.build;
const envPropertiesDescriptor = envDescriptor.environment;
const depsPropertiesDescriptor = envDescriptor.dependencies;

debug(`Using '${envProfile}' env build features:\n${JSON.stringify(envBuildDescriptor)}`);
debug(`Using '${envProfile}' env properties:\n${JSON.stringify(envPropertiesDescriptor)}`);

const babelConfig = merge({}, JSON.parse(fs.readFileSync('.babelrc', 'utf8')), {
  babelrc: false, // needs to be dynamic
  cacheDirectory: envBuildDescriptor.useHMR,
});

const config = {

  context: path.join(__dirname, 'src/main'),

  entry: [
    '!!style!css!react-mdl/extra/material.min.css',
    '!!style!css!react-grid-layout/css/styles.css',
    '!!style!css!react-resizable/css/styles.css',
    '!!style!css!font-awesome/css/font-awesome.css',
    '!!style!css!react-mfb/mfb.css',
    'react-mdl/extra/material.min.js',
    'babel-polyfill',
    './main.js',
  ],

  output: {
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/dist/',
    filename: envBuildDescriptor.output.filename,
    chunkFilename: envBuildDescriptor.output.chunkFilename,
    sourcePrefix: '  ',
  },

  debug: envBuildDescriptor.debug,
  devtool: envBuildDescriptor.devtool,
  stats: envBuildDescriptor.stats,

  plugins: [
    new webpack.DefinePlugin(merge({
      'process.env.NODE_ENV': depsPropertiesDescriptor.production
        ? JSON.stringify('production') : JSON.stringify(envProfile),
      __DEV__: envBuildDescriptor.debug,
    }, mapValues(envPropertiesDescriptor, (value) => (`'${value}'`)))),
    new AssetsPlugin({
      path: path.resolve(__dirname, './public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],

};

if (envBuildDescriptor.compress) {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}
if (envBuildDescriptor.secure) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: envBuildDescriptor.verbose },
  }));
}
if (envBuildDescriptor.useHMR) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = merge(config,
  require('./webpack.loaders.config')({
    babelConfig,
    cssLocalName: envBuildDescriptor.cssLocalName,
    minify: envBuildDescriptor.compress,
    cssSourceMaps: envBuildDescriptor.cssSourceMaps,
  }),
  require('./webpack.postcss.config')
);

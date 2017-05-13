/* global require, __dirname, process */

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const merge = require('lodash/merge');
const mapValues = require('lodash/mapValues');
const debug = require('debug')('debug:webpack.config');

require('dotenv').config();

const buildType = process.env.ENVIRONMENT;

if(!buildType) {
  throw "Build type (NODE_ENV) not specified";
}

const buildDescriptorPath = path.join(__dirname, `config/build/${buildType}.config.yaml`);
const buildDescriptor = yaml.load(fs.readFileSync(buildDescriptorPath, 'UTF-8'));

debug(`Using '${buildType}' env build features:\n${JSON.stringify(buildDescriptor.build)}`);

const babelConfig = merge({}, JSON.parse(fs.readFileSync('.babelrc', 'utf8')), {
  babelrc: false, // needs to be dynamic
  cacheDirectory: buildDescriptor.build.useHMR,
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
    filename: buildDescriptor.build.output.filename,
    chunkFilename: buildDescriptor.build.output.chunkFilename,
    sourcePrefix: '  ',
  },

  debug: buildDescriptor.build.debug,
  devtool: buildDescriptor.build.devtool,
  stats: buildDescriptor.build.stats,

  plugins: [
    new webpack.DefinePlugin(merge({
      'process.env.NODE_ENV': buildDescriptor.dependencies.production
        ? JSON.stringify('production') : JSON.stringify(buildType),
      __DEV__: buildDescriptor.build.debug,
    }, process.env)),
    new AssetsPlugin({
      path: path.resolve(__dirname, './public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],

};

if (buildDescriptor.build.compress) {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}
if (buildDescriptor.build.secure) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: buildDescriptor.build.verbose },
  }));
}
if (buildDescriptor.build.useHMR) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = merge(config,
  require('./webpack.loaders.config')({
    babelConfig,
    cssLocalName: buildDescriptor.build.cssLocalName,
    minify: buildDescriptor.build.compress,
    cssSourceMaps: buildDescriptor.build.cssSourceMaps,
  }),
  require('./webpack.postcss.config')
);

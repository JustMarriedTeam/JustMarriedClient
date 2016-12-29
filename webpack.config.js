/* eslint-disable global-require */

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('./package.json');
const merge = require('lodash/merge');


const envProfile = process.env.NODE_ENV || 'development';
const envDescriptorPath = path.join(__dirname, `config/environment/${envProfile}.config.yaml`);
const envDescriptor = yaml.load(fs.readFileSync(envDescriptorPath, 'UTF-8'));
const envBuildDescriptor = envDescriptor.build;

console.log(`Using '${envProfile}' env build descriptor properties:\n${JSON.stringify(envBuildDescriptor)}`);

const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: envBuildDescriptor.useHMR,
});

const config = {

  context: path.join(__dirname, 'src/main'),

  entry: [
    '!!style!css!react-mdl/extra/material.min.css',
    '!!style!css!react-grid-layout/css/styles.css',
    '!!style!css!react-resizable/css/styles.css',
    '!!style!css!font-awesome/css/font-awesome.css',
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

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': envBuildDescriptor.debug ? '"development"' : '"production"',
      __DEV__: envBuildDescriptor.debug,
    }),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, './public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],

};

if (envBuildDescriptor.minify) {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}
if (envBuildDescriptor.uglify) {
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
    minify: envBuildDescriptor.minify,
    cssSourceMaps: envBuildDescriptor.cssSourceMaps,
  }),
  require('./webpack.postcss.config')
);

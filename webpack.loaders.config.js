const path = require('path');

module.exports = (cfg) => ({

  module: {
    // preLoaders: [
    //   {
    //     loader: 'eslint-loader',
    //     test: /\.js[x]?$/,
    //     include: [
    //       path.join(__dirname, 'src'),
    //     ],
    //   },
    // ],
    loaders: [
      {
        test: /\.js[x]?$/,
        include: [
          path.resolve(__dirname, './src'),
        ],
        loader: `babel-loader?${JSON.stringify(cfg.babelConfig)}`,
      },
      {
        test: /\.[p]?css$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: cfg.sourceMaps,
            modules: true,
            localIdentName: cfg.cssLocalName,
            minimize: cfg.minimize,
          })}`,
          'postcss-loader',
        ],
        include: [
          path.resolve(__dirname, 'src/main'),
        ],
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(__dirname, './src/main/routes.json'),
        ],
        loader: 'json-loader',
      },
      {
        test: /\.json$/,
        include: [
          path.resolve(__dirname, './src/main/routes.json'),
        ],
        loaders: [
          `babel-loader?${JSON.stringify(cfg.babelConfig)}`,
          path.resolve(__dirname, './utils/routes-loader.js'),
        ],
      },
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './utils/markdown-loader.js'),
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(wav|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },

});

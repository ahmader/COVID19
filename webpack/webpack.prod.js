const webpack = require('webpack'); // to access built-in plugins
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    // for MiniCssExtractPlugin:
    //
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.(less|scss)$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_PROD: true,
    }),
    ...common.plugins,
  ]

});

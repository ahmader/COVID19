const webpack = require('webpack'); // to access built-in plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(`${__dirname}/../dist`),
    // filename: "bundle.js",
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    // publicPath: './assets'
    // publicPath: '',
  },
  devtool: 'cheap-module-source-map',

  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 9000,
    host: '0.0.0.0',
  },

  performance: {
    hints: false
  },

  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('../package.json').version),
      APP_TITLE: JSON.stringify('تجربة تفاعلية | المواهب الوطنية'), // JSON.stringify(require('../package.json').name),
      IS_DEV: JSON.stringify(process.env.NODE_ENV !== 'production'),
      IS_PROD: JSON.stringify(process.env.NODE_ENV === 'production'),
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: JSON.stringify(require('../package.json').name),
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        }
      ],
      mobile: true,
      lang: 'en-US',
      links: [
        'https://fonts.googleapis.com/css?family=Roboto',
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        }
      ],
      inlineManifestWebpackName: 'webpackManifest',
      scripts: [
        'http://example.com/somescript.js',
        {
          src: '/myModule.js',
          type: 'module'
        }
      ],
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    })

  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['es2015', 'stage-2']
          // }
        }
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
            }
          }

        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('file-loader'),
      }
    ]
  }
};

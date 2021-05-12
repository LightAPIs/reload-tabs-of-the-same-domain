'use strict';

const { merge } = require('webpack-merge');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageInfo = require('../package.json');

const common = require('./webpack.common.js');
const PATHS = require('./paths');
const DEV = process.env.NODE_ENV === 'development';

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    background: PATHS.src + '/background.js',
  },
  output: {
    path: PATHS.firefox,
    filename: '[name].js',
  },
  devtool: DEV ? 'source-map' : 'none',
  plugins: [
    // Print file sizes
    new SizePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'public',
        },
        {
          from: PATHS.firefoxManifest,
          to: PATHS.firefox,
        },
      ],
    }),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    DEV
      ? null
      : new ZipWebpackPlugin({
          path: PATHS.archive,
          filename: `${packageInfo.name}_firefox_v${packageInfo.version}.zip`,
        }),
  ],
});

module.exports = config;

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'cli.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals({
    allowlist: ['jsdoc/util/dumper'],
  })],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      exclude: ['node_modules', 'dist'],
      // formatter: 'table',
    }),
  ],
};
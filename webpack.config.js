var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/d3QuickStart.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'd3qs.js',
    library: 'd3qs'
  },
  externals: {
    d3: 'd3'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      }
    ]
  }
};

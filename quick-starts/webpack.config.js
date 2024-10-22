var path = require('path');
var webpack = require('webpack');

module.exports = {
  
  entry: './src/d3QuickStart.ts',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'd3qs.js',
    libraryTarget: 'umd',
    library: 'd3qs',
    umdNamedDefine: true
  },
  externals: {
    d3: 'd3'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules'), /(\.test\.ts$|__tests__)/],
      }
    ]
  }
};

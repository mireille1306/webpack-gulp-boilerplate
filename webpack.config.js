const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  mode: process.env.NODE_ENV,
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          filename: 'vendor.js',
          chunks: 'initial',
          minSize: 1
        }
      }
    }
  },
};
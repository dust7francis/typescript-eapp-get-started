const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./base')

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = merge.smart(baseConfig, {
  target: 'electron-main',
  entry: './src/main.dev.ts',
  mode: process.env.NODE_ENV ? process.env.NODE_ENV :  'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? 'main.prod.js' : 'main.js',
    path: path.resolve(__dirname, '../app')
  },
  node: {
    __dirname: false,
    __filename: false
  },
});
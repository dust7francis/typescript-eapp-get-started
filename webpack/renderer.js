const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./base')

const port = process.env.PORT || '1414';

module.exports = merge.smart(baseConfig, {
  target: 'electron-renderer',
  entry: process.env.WEBPACK_SERVE
    ? [
      'webpack/hot/only-dev-server',
      './src/index.ts',
    ]
    : ['./src/index.ts'],
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  module: {
    rules: [
      // Extract all .global.css to style.css as is
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      // css files
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/components'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              namedExport: true
            }
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      },
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
    path: process.env.WEBPACK_SERVE ? '/' : path.join(__dirname, 'app/dist'),
    publicPath: `http://localhost:${port}/dist/`,
    filename: process.env.WEBPACK_SERVE
      ? 'renderer.js' : 'renderer.prod.js' 
  },
  node: {
    __dirname: false,
    __filename: false
  },
});
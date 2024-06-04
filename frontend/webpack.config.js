const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: '/src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin({
      template: '/src/index.html',
    }),
    new CopyPlugin(
      {
        patterns: [{
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          }
        }]
      }
    )
  ],
  module: {
    rules: [
      {
        test: /(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
}

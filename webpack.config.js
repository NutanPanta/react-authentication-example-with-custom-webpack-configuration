const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
let target = process.env.NODE_ENV === 'production' ? 'browserslist' : 'web';

module.exports = {
  mode,
  target,
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|ico)$/i,
        type: 'asset',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new Dotenv({ path: `./.env`, systemvars: true }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      publicPath: '/',
      // favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'source-map',
  devServer: {
    static: './public',
    historyApiFallback: true,
    hot: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

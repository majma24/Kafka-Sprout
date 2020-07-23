const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./index.tsx",
  devtool: "sourcemaps",
  output: {
    path: path.resolve(__dirname, "../resources/static/built/"),
    // Spring Boot serves static files from resources/static folder
    // So script files generated by HtmlWebpackPlugin should be
    // relative to static folder
    publicPath: "/built/",
    filename: "[name].[contenthash].bundle.js",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      // make sure html gets saved into templates folder
      filename: path.resolve(__dirname, "../resources/templates/index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

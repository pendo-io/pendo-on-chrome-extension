const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/js/background.js",
    "content-script": "./src/js/content-script.js",
    "content-script-iframe-snippet":
      "./src/js/content-script-iframe-snippet.js",
    options: "./src/js/options.js",
    popup: "./src/js/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "js/[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/options.html",
      filename: "./html/options.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/popup.html",
      filename: "./html/popup.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/iframe.html",
      filename: "./html/iframe.html",
      inject: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "./public/manifest.json", to: "./manifest.json" }],
    }),
  ],
};

const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");

const package = require("../package.json");
const version = package.version;
const manifestVersion = 2;

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new ReplaceInFileWebpackPlugin([
      {
        dir: "build",
        files: ["manifest.json"],
        rules: [
          {
            search: "<NAME>",
            replace: `Pendo on Chrome Extension - V${manifestVersion}`,
          },
          {
            search: `"<MANIFEST_VERSION>"`,
            replace: `${manifestVersion}`,
          },
          {
            search: "<VERSION_NUMBER>",
            replace: `${version}`,
          },
          {
            search: "<ACTION_API>",
            replace: "browser_action",
          },
          {
            search: `"<CONTENT_SECURITY_POLICY>": {}`,
            replace: `"content_security_policy": "default-src 'self'; font-src 'self' data:; script-src 'self' https://app.pendo.io https://cdn.pendo.io https://data.pendo.io https://pendo-static-5758275626074112.storage.googleapis.com https://pendo-io-static.storage.googleapis.com/; style-src 'self' 'unsafe-inline' https://cdn.pendo.io https://pendo-static-5758275626074112.storage.googleapis.com; img-src 'self' https://app.pendo.io https://data.pendo.io https://pendo-static-5758275626074112.storage.googleapis.com https://pendo-static-5668600916475904.storage.googleapis.com; frame-src https://app.pendo.io https://cdn.pendo.io  https://data.pendo.io https://pendo-static-5758275626074112.storage.googleapis.com; connect-src https://app.pendo.io https://data.pendo.io https://pendo-static-5758275626074112.storage.googleapis.com; frame-ancestors https://app.pendo.io https://*;"`,
          },
          {
            search: `"<WEB_ACCESIBLE_RESOURCES>": {}`,
            replace: `"web_accessible_resources": ["html/*.html", "js/content-script-iframe-snippet.js"]`,
          },
        ],
      },
    ]),
  ],
});

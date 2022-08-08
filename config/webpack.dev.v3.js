const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

const CopyPlugin = require("copy-webpack-plugin");
const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");

const package = require("../package.json");
const version = package.version;
const manifestVersion = 3;

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./public/agent/", to: "./agent/" },
        {
          from: "./public/guide-code-blocks/",
          to: "./guide-code-blocks/",
        },
      ],
    }),
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
            replace: "action",
          },
          {
            search: `"<CONTENT_SECURITY_POLICY>": {},`,
            replace: ``,
          },
          {
            search: `"<WEB_ACCESIBLE_RESOURCES>": {}`,
            replace: `"web_accessible_resources": [{"resources": ["html/*.html",  "agent/*", "guide-code-blocks/*.js", "js/content-script-iframe-snippet.js"], "matches": ["https://*/*"]}]`,
          },
        ],
      },
    ]),
  ],
});

const fs = require("fs");
const { zip } = require("zip-a-folder");

const manifest = require("../build/manifest.json");
const version = manifest.version;
const betaBuild = manifest.name.includes("Beta");

async function zipBuild(folder, zipFile) {
  await zip(folder, zipFile);
}

// Create directory structure if not in place
// /releases
// ../beta
// ../prod
if (!fs.existsSync("./releases/beta")) {
  fs.mkdirSync("./releases/beta", { recursive: true });
}

if (!fs.existsSync("./releases/prod")) {
  fs.mkdirSync("./releases/prod", { recursive: true });
}

// Create zip of current build
zipBuild(
  "./build",
  `./releases/${betaBuild ? "beta" : "prod"}/pendo-on-chrome-extension${
    betaBuild ? "-beta" : ""
  }-${version}.zip`
);

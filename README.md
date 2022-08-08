# Pendo On Chrome Extension

This repository contains a Chrome Extension with the Pendo Agent and in-app designer installed. The purpose of this extension is to show how Pendo can be installed in a Chrome Extension, and what the limitations of doing so are. See this [Google Doc](https://docs.google.com/document/d/1ToF_K-Ranu4gGMcu-AsgEnwUtXxIUVIASqAYI3_Rad0/edit?usp=sharing) for a more detailed write up.

Note: While this repository is created specifically as a Chrome Extension, the process and limitations demonstrated here also apply to Microsoft Edge or Mozilla Firefox Browser Add-ons.

## Usage

### Dependencies

In order to get the project up and running you will need:

- Node JS
- NPM
- Chrome Browser

### Cloning

To clone a local version of the project run:

```
git clone https://github.com/pendo-io/pendo-on-chrome-extension.git
```

### Installation

To install dependencies:

```
cd ./pendo-on-chrome-extension
npm install
```

### Build

This extension can be built using either Manifest V2 or Manifest V3. Pick one of the following commands to build the chrome extension as desired.

#### Development V2 Build

```
npm run watch:v2
```

#### Production V2 Build

```
npm run build:v2
```

#### Development V3 Build

```
npm run watch:v3
```

#### Production V3 Build

```
npm run build:v3
```

### Load Unpacked Extension

To see the extension running, load the unpacked extension in Chrome.

1. Navigate to chrome://extensions/
2. Enable developer mode via the toggle in the top right corner
3. Click the load unpacked button in the top left corner and navigate to the build directory created by the previous step

### Exploring the Chrome Extension

There are three different pages in this extension: popup.html, options.html, and iframe.html. Each of these pages has the Pendo agent installed and should show a guide on first load. By default, this example has both the in-app designer and preview mode configured. The technique used to load these assets could be extended to also load the debugger per the instructions in this [Google Doc](https://docs.google.com/document/d/1ToF_K-Ranu4gGMcu-AsgEnwUtXxIUVIASqAYI3_Rad0/edit?usp=sharing) if desired.

#### popup.html

To see the popup page, simply click the pendo-on-chrome-extension icon in the extensions menu in the top right corner of your browser. This will launch a small popup window over whatever page you are currently on.

#### options.html

To see the options page, right click the pendo-on-chrome-extension icon in the extensions menu in the top right corner of your browser. Then select options from the drop down. This will launch the options page in it's own tab.

#### iframe.html

To see the iframe page, refresh any tab in your extension. You should then see a small iframed window placed in the bottom right of the page by the extension. By default, this iframe is added to every page of your browser for testing.

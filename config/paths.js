'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  chrome: path.resolve(__dirname, '../build-chrome'),
  chromeManifest: path.resolve(__dirname, '../src/chrome/manifest.json'),
  firefox: path.resolve(__dirname, '../build-firefox'),
  firefoxManifest: path.resolve(__dirname, '../src/firefox/manifest.json'),
  archive: path.resolve(__dirname, '../archive'),
};

module.exports = PATHS;

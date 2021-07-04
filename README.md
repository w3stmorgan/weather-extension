# React Chrome Weather Extension

## Concepts 
1. Data Fetching via OpenWeather API
2. Typescript, React and Webpack
3. Chrome APIs (alarms, storage, etc...)
4. Core Extension Concepts (popup, options, background script, content script)
5. Material UI components

## Features
1. Display temperature of multiple cities based on user input
2. Badge icon that updates hourly with temperature of users home city
3. Weather overlay that can be displayed on a webpage as a user is browsing, controllable through popup
4. Support for switching between metric and imperial temperature units

## Getting Started

1. `npm i` to install dependancies
2. `npm start` to start running the fast development mode Webpack build process that bundle files into the `dist` folder

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder


# Production Build

1. `npm run build` to generate a minimized production build in the `dist` folder
2. ZIP the entire `dist` folder (e.g. `dist.zip`)
3. Publish the ZIP file on the Chrome Web Store Developer Dashboard!

## Important Default Boilerplate Notes

- Folders get flattened, static references to images from HTML do not need to be relative (i.e. `icon.png` instead of `../static/icon.png`)
- Importing local ts/tsx/css files should be relative, since Webpack will build a dependancy graph using these paths
- Update the manifest file as per usual for chrome related permissions, references to files in here should also be flattened and not be relative

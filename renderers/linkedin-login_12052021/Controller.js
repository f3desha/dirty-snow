var {remote} = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const thisWindowModel = require('./Model');
const thisWindow = new thisWindowModel();
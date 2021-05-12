var {remote} = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const linkedinModule = require('../../modules/linkedin-helper/Linkedin');
const thisWindowModel = require('./Model');
const thisWindow = new thisWindowModel();

thisWindow.getAuthLink();

/*******LISTENERS START************/

/*******LISTENERS END ***********/
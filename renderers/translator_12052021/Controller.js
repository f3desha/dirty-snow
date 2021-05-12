var {remote} = require('electron');
const TranslatorModel = require('./Model');
const translatorModel = new TranslatorModel();

translatorModel.leftButtonInit();

translatorModel.centerButtonInit();

translatorModel.rightButtonInit();
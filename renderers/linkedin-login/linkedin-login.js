var {remote} = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const linkedinModule = require('../../modules/linkedin-helper/Linkedin');
const Linkedin = new linkedinModule();
  Linkedin.oauthCodeCaller()
  .then((data) => {
    ipcRenderer.send('oauthLinkReceived', data);
  })
  .catch((reject) => {
    console.log(reject);
  });

  ipcRenderer.on('token-received', (event, arg) => {
    var window = remote.getCurrentWindow();
    window.close();
  })
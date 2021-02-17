var {remote} = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const linkedinModule = require('../../modules/linkedin-helper/Linkedin');

getAuthLink();

function getAuthLink(){
  const Linkedin = new linkedinModule();
  Linkedin.oauthCodeCaller()
  .then((data) => {
    ipcRenderer.send('oauth-link-received', data);
  })
  .catch((reject) => {
    console.log(reject);
  });
}

/*******LISTENERS START************/
  ipcRenderer.on('token-received', (event, arg) => {
    var window = remote.getCurrentWindow();
    window.close();
  })
/*******LISTENERS END ***********/
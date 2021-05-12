const BaseModel = require("../../modules/Base/BaseModel");
const linkedinModule = require('../../modules/linkedin-helper/Linkedin');

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const self = this;

        //Defining elements location
        this.windowElements = {
            buttons: {
             
            },
            spans: {
               
            },
            listeners: {
                tokenReceived: {
                    
                }
            }
        };

        this.windowElements.listeners.tokenReceived.init = () => {
            ipcRenderer.on('token-received', (event, arg) => {
                var window = remote.getCurrentWindow();
                window.close();
              })
        };

        //Mandatory section for running Model initialization
        super.init();
    }

    getAuthLink(){
        const Linkedin = new linkedinModule();
        Linkedin.oauthCodeCaller()
        .then((data) => {
          ipcRenderer.send('oauth-link-received', data);
        })
        .catch((reject) => {
          console.log(reject);
        });
      }

}


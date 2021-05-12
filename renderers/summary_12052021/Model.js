const BaseModel = require("../../modules/Base/BaseModel");

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const Window = this;

        //Defining elements location
        this.windowElements = {
            buttons: {
                getit:    {
                    location: document.getElementById("getit")
                },
                close:  {
                    location: document.getElementById("close")
                },
            },
            spans: {
                validation_bar: {
                    location: document.querySelector('#validation-bar-span')
                },
                first: {
                    location: document.querySelector('#first')
                },
                second: {
                    location: document.querySelector('#second')
                },
            },
        };
    
        this.windowElements.buttons.getit.init = () => {
            Window.get('buttons','getit').addEventListener("click", function (e) {
                Window.get('spans','validation_bar').innerHTML = Window.get('spans','first').value + Window.get('spans','second').value;
            }); 
        }

        this.windowElements.buttons.close.init = () => {
            Window.get('buttons','close').addEventListener("click", function (e) {
                let window = remote.getCurrentWindow();
                window.close();
            }); 
        }

        //Mandatory section for running Model initialization
        super.init();
    }

}
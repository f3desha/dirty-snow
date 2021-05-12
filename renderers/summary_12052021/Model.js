const BaseModel = require("../../modules/Base/BaseModel");

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const self = this;

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
            this.windowElements.buttons.getit.location.addEventListener("click", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = self.windowElements.spans.first.location.value + self.windowElements.spans.second.location.value;
            }); 
        }

        this.windowElements.buttons.close.init = () => {
            this.windowElements.buttons.close.location.addEventListener("click", function (e) {
                let window = remote.getCurrentWindow();
                window.close();
            }); 
        }

        //Mandatory section for running Model initialization
        super.init();
    }

}
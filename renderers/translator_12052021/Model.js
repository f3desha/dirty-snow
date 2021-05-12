const BaseModel = require("../../modules/Base/BaseModel");

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const self = this;

        //Defining elements location
        this.windowElements = {
            buttons: {
                left_button:    {
                    location: document.getElementById("left_button")
                },
                center_button:  {
                    location: document.getElementById("center_button")
                },
                right_button:   {
                    location: document.getElementById("right_button")
                }
            },
            spans: {
                validation_bar: {
                    location: document.querySelector('#validation-bar-span')
                },
                left_word:      {
                    location: document.querySelector('#left_word')
                },
                center_word:    {
                    location: document.querySelector('#center_word')
                },
                right_word:     {
                    location: document.querySelector('#right_word')
                }
            },
        };
    
        //Defining elements behavior
        this.windowElements.buttons.left_button.init = () => {

            this.windowElements.buttons.left_button.location.addEventListener("click", function (e) {
                self.windowElements.spans.left_word.location.style.visibility = "visible";
                self.windowElements.spans.center_word.location.style.visibility = "hidden";
                self.windowElements.spans.right_word.location.style.visibility = "hidden";
            }); 
    
            this.windowElements.buttons.left_button.location.addEventListener("mouseover", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = 'Press left button';
            }); 
            
            this.windowElements.buttons.left_button.location.addEventListener("mouseout", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = '&nbsp';
            }); 
        }

        this.windowElements.buttons.center_button.init = () => {

            self.windowElements.buttons.center_button.location.addEventListener("click", function (e) {
                self.windowElements.spans.left_word.location.style.visibility = "hidden";
                self.windowElements.spans.center_word.location.style.visibility = "visible";
                self.windowElements.spans.right_word.location.style.visibility = "hidden";
            }); 
    
            self.windowElements.buttons.center_button.location.addEventListener("mouseover", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = 'Press center button';
            }); 
            
            self.windowElements.buttons.center_button.location.addEventListener("mouseout", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = '&nbsp';
            }); 
        }

        this.windowElements.buttons.right_button.init = () => {

            this.windowElements.buttons.right_button.location.addEventListener("click", function (e) {
                self.windowElements.spans.left_word.location.style.visibility = "hidden";
                self.windowElements.spans.center_word.location.style.visibility = "hidden";
                self.windowElements.spans.right_word.location.style.visibility = "visible";
            }); 
    
            this.windowElements.buttons.right_button.location.addEventListener("mouseover", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = 'Press right button';
            }); 
            
            this.windowElements.buttons.right_button.location.addEventListener("mouseout", function (e) {
                self.windowElements.spans.validation_bar.location.innerHTML = '&nbsp';
            }); 
        }

        //Mandatory section for running Model initialization
        super.init();
    }

}
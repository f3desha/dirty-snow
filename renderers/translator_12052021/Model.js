const BaseModel = require("../../modules/Base/BaseModel");

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const Window = this;

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
        Window.windowElements.buttons.left_button.init = () => {

            Window.get('buttons','left_button').addEventListener("click", function (e) {
                Window.get('spans','left_word').style.visibility = "visible";
                Window.get('spans','center_word').style.visibility = "hidden";
                Window.get('spans','right_word').style.visibility = "hidden";
            }); 
    
            Window.get('buttons','left_button').addEventListener("mouseover", function (e) {
                Window.get('spans','validation_bar').innerHTML = 'Press left button';
            }); 
            
            Window.get('buttons','left_button').addEventListener("mouseout", function (e) {
                Window.get('spans','validation_bar').innerHTML = '&nbsp';
            }); 
        }

        Window.windowElements.buttons.center_button.init = () => {

            Window.get('buttons','center_button').addEventListener("click", function (e) {
                Window.get('spans','left_word').style.visibility = "hidden";
                Window.get('spans','center_word').style.visibility = "visible";
                Window.get('spans','right_word').style.visibility = "hidden";
            }); 
    
            Window.get('buttons','center_button').addEventListener("mouseover", function (e) {
                Window.get('spans','validation_bar').innerHTML = 'Press center button';
            }); 
            
            Window.get('buttons','center_button').addEventListener("mouseout", function (e) {
                Window.get('spans','validation_bar').location.innerHTML = '&nbsp';
            }); 
        }

        Window.windowElements.buttons.right_button.init = () => {

            Window.get('buttons','right_button').addEventListener("click", function (e) {
                Window.get('spans','left_word').style.visibility = "hidden";
                Window.get('spans','center_word').style.visibility = "hidden";
                Window.get('spans','right_word').style.visibility = "visible";
            }); 
    
            Window.get('buttons','right_button').addEventListener("mouseover", function (e) {
                Window.get('spans','validation_bar').innerHTML = 'Press right button';
            }); 
            
            Window.get('buttons','right_button').addEventListener("mouseout", function (e) {
                Window.get('spans','validation_bar').innerHTML = '&nbsp';
            }); 
        }

        //Mandatory section for running Model initialization
        super.init();
    }

}
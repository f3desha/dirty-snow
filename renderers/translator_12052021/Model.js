const BaseModel = require("../../modules/Base/BaseModel");

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const DS = this;

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
        DS.windowElements.buttons.left_button.init = () => {

            DS.get('buttons','left_button').addEventListener("click", function (e) {
                DS.get('spans','left_word').style.visibility = "visible";
                DS.get('spans','center_word').style.visibility = "hidden";
                DS.get('spans','right_word').style.visibility = "hidden";
            }); 
    
            DS.get('buttons','left_button').addEventListener("mouseover", function (e) {
                DS.get('spans','validation_bar').innerHTML = 'Press left button';
            }); 
            
            DS.get('buttons','left_button').addEventListener("mouseout", function (e) {
                DS.get('spans','validation_bar').innerHTML = '&nbsp';
            }); 
        }

        DS.windowElements.buttons.center_button.init = () => {

            DS.get('buttons','center_button').addEventListener("click", function (e) {
                DS.get('spans','left_word').style.visibility = "hidden";
                DS.get('spans','center_word').style.visibility = "visible";
                DS.get('spans','right_word').style.visibility = "hidden";
            }); 
    
            DS.get('buttons','center_button').addEventListener("mouseover", function (e) {
                DS.get('spans','validation_bar').innerHTML = 'Press center button';
            }); 
            
            DS.get('buttons','center_button').addEventListener("mouseout", function (e) {
                DS.get('spans','validation_bar').location.innerHTML = '&nbsp';
            }); 
        }

        DS.windowElements.buttons.right_button.init = () => {

            DS.get('buttons','right_button').addEventListener("click", function (e) {
                DS.get('spans','left_word').style.visibility = "hidden";
                DS.get('spans','center_word').style.visibility = "hidden";
                DS.get('spans','right_word').style.visibility = "visible";
            }); 
    
            DS.get('buttons','right_button').addEventListener("mouseover", function (e) {
                DS.get('spans','validation_bar').innerHTML = 'Press right button';
            }); 
            
            DS.get('buttons','right_button').addEventListener("mouseout", function (e) {
                DS.get('spans','validation_bar').innerHTML = '&nbsp';
            }); 
        }

        //Mandatory section for running Model initialization
        super.init();
    }

}
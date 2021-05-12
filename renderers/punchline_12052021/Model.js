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
                right_button:   {
                    location: document.getElementById("right_button")
                }
            },
            spans: {
                validation_bar: {
                    location: document.querySelector('#validation-bar-span')
                },
                center_word:    {
                    location: document.querySelector('#center_word')
                }
            },
        };
    
        //Defining elements behavior
        DS.windowElements.buttons.left_button.init = () => {

            DS.get('buttons','left_button').addEventListener("click", function (e) {
                DS.get('spans','center_word').innerHTML = 'Why Java programmers wear glasses?';
            }); 
           
        }

        DS.windowElements.buttons.right_button.init = () => {

            DS.get('buttons','right_button').addEventListener("click", function (e) {
                DS.get('spans','center_word').innerHTML = 'Because they cant C#';
            }); 
    
        }

        //Mandatory section for running Model initialization
        super.init();
    }

}
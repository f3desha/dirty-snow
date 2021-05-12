const BaseModel = require("../../modules/Base/BaseModel");

module.exports = class Model extends BaseModel {
    constructor(){
        super();
        const DS = this;

        //Defining elements location
        this.windowElements = {
            images: {
                image1: {location: document.getElementById("image1")},
                image2: {location: document.getElementById("image2")},
                image3: {location: document.getElementById("image3")},
                image4: {location: document.getElementById("image4")},
                image5: {location: document.getElementById("image5")}
            }
        };
    
        //Defining elements behavior
        DS.windowElements.images.image1.init = () => {

            DS.get('images','image1').addEventListener("click", function (e) {
                DS.dialogResponse();
            }); 
            DS.get('images','image2').addEventListener("click", function (e) {
                DS.dialogResponse();
            }); 
            DS.get('images','image3').addEventListener("click", function (e) {
                DS.dialogResponse();
            }); 
            DS.get('images','image4').addEventListener("click", function (e) {
                DS.dialogResponse();
            });
            DS.get('images','image5').addEventListener("click", function (e) {
                DS.dialogResponse();
            }); 
    
        }

        //Mandatory section for running Model initialization
        super.init();
    }

    dialogResponse(){
        dialog.showMessageBox(
            null,
            {
              title: "Good Job",
              message: "We received your choice. Thank You and Good Luck!",
              buttons: ["Ok"],
              defaultId: 0 // bound to buttons array
            })
            .then(result => {
             
            }
          );
    }
}
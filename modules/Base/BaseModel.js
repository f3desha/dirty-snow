module.exports = class BaseModel {
    constructor(){

    }

    init(){
        //Init section
        for (let section in this.windowElements){
            for(let element in this.windowElements[section]){
                if(this.windowElements.buttons[element].init !== undefined){
                    this.windowElements.buttons[element].init();
                }
            }
        }
    }

}
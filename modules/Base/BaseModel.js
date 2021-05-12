module.exports = class BaseModel {
    constructor(){

    }

    init(){
        //Init section
        for (let section in this.windowElements){
            for(let element in this.windowElements[section]){
                if(this.windowElements[section][element].init !== undefined){
                    this.windowElements[section][element].init();
                }
            }
        }
    }

}
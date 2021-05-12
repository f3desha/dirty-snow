module.exports = class BaseModel {
    constructor(){

    }

    init(){
        for (let section in this.windowElements){
            for(let element in this.windowElements[section]){
                //Init section
                if(this.windowElements[section][element].init !== undefined){
                    this.windowElements[section][element].init();
                }
            }
        }
    }

    get(elements_group, elements_id){
        return this.windowElements[elements_group][elements_id].location;
    }

}
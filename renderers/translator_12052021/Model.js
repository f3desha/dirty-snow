module.exports = class Model {
    constructor(){
        this.left_word = document.querySelector('#left_word');
        this.center_word = document.querySelector('#center_word');
        this.right_word = document.querySelector('#right_word');
    }

    leftButtonInit(){
        const self = this;

        document.getElementById("left_button").addEventListener("click", function (e) {
            self.left_word.style.visibility = "visible";
            self.center_word.style.visibility = "hidden";
            self.right_word.style.visibility = "hidden";
        }); 

        document.getElementById("left_button").addEventListener("mouseover", function (e) {
            document.querySelector('#validation-bar-span').innerHTML = 'Press left button';
        }); 
        
        document.getElementById("left_button").addEventListener("mouseout", function (e) {
            document.querySelector('#validation-bar-span').innerHTML = '&nbsp';
        }); 
    }

    centerButtonInit(){
        const self = this;

        document.getElementById("center_button").addEventListener("click", function (e) {
            self.left_word.style.visibility = "hidden";
            self.center_word.style.visibility = "visible";
            self.right_word.style.visibility = "hidden";
        }); 

        document.getElementById("center_button").addEventListener("mouseover", function (e) {
            document.querySelector('#validation-bar-span').innerHTML = 'Press center button';
        }); 
        
        document.getElementById("center_button").addEventListener("mouseout", function (e) {
            document.querySelector('#validation-bar-span').innerHTML = '&nbsp';
        }); 
    }

    rightButtonInit(){
        const self = this;

        document.getElementById("right_button").addEventListener("click", function (e) {
            self.left_word.style.visibility = "hidden";
            self.center_word.style.visibility = "hidden";
            self.right_word.style.visibility = "visible";
        }); 

        document.getElementById("right_button").addEventListener("mouseover", function (e) {
            document.querySelector('#validation-bar-span').innerHTML = 'Press right button';
        }); 
        
        document.getElementById("right_button").addEventListener("mouseout", function (e) {
            document.querySelector('#validation-bar-span').innerHTML = '&nbsp';
        }); 
     }
}
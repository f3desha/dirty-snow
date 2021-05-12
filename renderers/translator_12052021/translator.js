var {remote} = require('electron');

let left_word = document.querySelector('#left_word');
let center_word = document.querySelector('#center_word');
let right_word = document.querySelector('#right_word');

document.getElementById("left_button").addEventListener("click", function (e) {
    left_word.style.visibility = "visible";
    center_word.style.visibility = "hidden";
    right_word.style.visibility = "hidden";
}); 

document.getElementById("center_button").addEventListener("click", function (e) {
    left_word.style.visibility = "hidden";
    center_word.style.visibility = "visible";
    right_word.style.visibility = "hidden";
}); 

document.getElementById("right_button").addEventListener("click", function (e) {
    left_word.style.visibility = "hidden";
    center_word.style.visibility = "hidden";
    right_word.style.visibility = "visible";
}); 

document.getElementById("left_button").addEventListener("mouseover", function (e) {
    document.querySelector('#validation-bar-span').innerHTML = 'Press left button';
}); 

document.getElementById("left_button").addEventListener("mouseout", function (e) {
    document.querySelector('#validation-bar-span').innerHTML = '&nbsp';
}); 

document.getElementById("center_button").addEventListener("mouseover", function (e) {
    document.querySelector('#validation-bar-span').innerHTML = 'Press center button';
}); 

document.getElementById("center_button").addEventListener("mouseout", function (e) {
    document.querySelector('#validation-bar-span').innerHTML = '&nbsp';
}); 

document.getElementById("right_button").addEventListener("mouseover", function (e) {
    document.querySelector('#validation-bar-span').innerHTML = 'Press right button';
}); 

document.getElementById("right_button").addEventListener("mouseout", function (e) {
    document.querySelector('#validation-bar-span').innerHTML = '&nbsp';
}); 
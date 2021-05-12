var {remote} = require('electron');

document.querySelector('#getit').addEventListener('click', function(){
    var first = document.querySelector('#first').value;
    var second = document.querySelector('#second').value;
    document.querySelector('#validation-bar-span').innerHTML = first + second;
});

document.getElementById("close").addEventListener("click", function (e) {
    var window = remote.getCurrentWindow();
    window.close();
}); 
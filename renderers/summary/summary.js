document.querySelector('#getit').addEventListener('click', function(){
    var first = document.querySelector('#first').value;
    var second = document.querySelector('#second').value;
    document.querySelector('#validation-bar-span').innerHTML = first + second;
});
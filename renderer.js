// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const ipcRenderer = require('electron').ipcRenderer;
const linkedinModule = require('./modules/linkedin-helper/Linkedin');

ipcRenderer.on('profile-update', (event, token) => {
    const Linkedin = new linkedinModule();
    Linkedin.oauthProfileCaller(token)
    .then((data) => {
        let imageUrl = data.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
        console.log(data);
        ipcRenderer.send('download-url', {
            url: imageUrl,
            firstName: data.localizedFirstName,
            lastName: data.localizedLastName
        });
        
    })
    .catch((reject) => {
      console.log(reject);
    });
    
    ipcRenderer.on('avatar-uploaded', (event, result) => {
        let avatarBlock = document.getElementById('avatar-block');
        avatarBlock.innerHTML = `<div class="avatar-holder" id="avatar-holder">
        <span class="name-holder">${result.firstName} ${result.lastName}</span>
        <span id="avatar-span"><img class="avatar" id="avatar" src="./files/temp/file.jpg" alt=""></span></div>`;
    });
    
})

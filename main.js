// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, session, dialog, MenuItem} = require('electron')
const ipcMain = require('electron').ipcMain;
const path = require('path')
const config = require('./config.json');
const https = require('https');
const fs   = require('fs');
const isMac = process.platform === 'darwin'
let applicationUser = null;
let mainMenu = null;

/********MENU TEMPLATE START *************** */
const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' },
    ]
  },
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Summary Example 12-05-2021',
        click (item, focusedWindow) {
        if (focusedWindow) getSummary();;
       }
      },
      {
        label: 'Translator Example 12-05-2021',
        click (item, focusedWindow) {
        if (focusedWindow) getTranslator();;id="left_button"
       }
      },
      {
        label: 'Login',
        id: 'login-menu',
        accelerator: isMac ? 'Alt+Cmd+L' : 'Alt+Ctrl+L',
        click (item, focusedWindow) {
         if (focusedWindow) linkedinLogin();
        }
      },
      {
        label: 'Logout',
        id: 'logout-menu',
        visible: false,
        accelerator: isMac ? 'Alt+Cmd+L' : 'Alt+Ctrl+L',
        click (item, focusedWindow) {
         if (focusedWindow) linkedinLogout();
        }
      }
    ]
  },
  // {
  //   label: 'View',
  //   submenu: [
  //     { role: 'reload' },
  //     { role: 'forceReload' },
  //     { role: 'toggleDevTools' },
  //   ]
  // }
]
mainMenu = Menu.buildFromTemplate(template);
/*******MENU TEMPLATE ENDS*****************/

/***********FUNCTIONS******** */
function linkedinLogin(){
  createSubwindow(config.subwindows.linkedinlogin_12052021);
}

function linkedinLogout(){
  userLoggedOut();
}

function userLoggedIn(){
  //Menu rebuilds
  mainMenu.getMenuItemById('login-menu').visible = false;
  mainMenu.getMenuItemById('logout-menu').visible = true;
}

function userLoggedOut(){
  applicationUser = null;
  //Menu rebuilds
  mainMenu.getMenuItemById('login-menu').visible = true;
  mainMenu.getMenuItemById('logout-menu').visible = false;
}

function getSummary(){
  createSubwindow(config.subwindows.summary_12052021);  
}

function getTranslator(){
  createSubwindow(config.subwindows.translator_12052021);  
}

function createSubwindow(config){
   const subWindow = new BrowserWindow({
    minWidth: config.width,
    minHeight: config.height,
    maxWidth: config.width,
    maxHeight: config.height,
    width: config.width,
    height: config.height,
    show: config.show == false ? false : true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  subWindow.removeMenu();
  subWindow.loadFile(`./renderers/${config.id}/View.html`);
  //subWindow.webContents.openDevTools();
  return subWindow;
}

function createMainMenu(){
  Menu.setApplicationMenu(mainMenu)
}

function createMainWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./index.html');
  mainWindow.maximize();

  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const download = async (url, filename) => {
  return await new Promise((resolve, reject) => {
      if (!fs.existsSync("./files/images/avatars/"+filename)) {
        var file = fs.createWriteStream("./files/images/avatars/"+filename);
        var request = https.get(url, function(response) {
        response.pipe(file);
        resolve(1);
      });
    } else {
      resolve(2);
    }
  });

};
/**********FUNCTIONS END***************** */

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainMenu()
  createMainWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



/*************LISTENERS ************ */
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('oauth-link-received', function(event1, args) {
  const subWindow = new BrowserWindow({
    frame: false,
    minWidth: 700,
    minHeight: 700,
    width: 700,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  subWindow.removeMenu();
  subWindow.loadURL(args.url);
  subWindow.webContents.on('did-redirect-navigation', function (event2, newUrl) {
    var urlParams = new URLSearchParams(newUrl);
      /////////////////////////
    if(urlParams.has('https://thawing-bastion-45853.herokuapp.com/api/v1/callback?code')){
      subWindow.webContents.executeJavaScript(`function gethtml () {
        return new Promise((resolve, reject) => { resolve(document.getElementById('access_token').innerHTML); });
        }
        gethtml();`).then((html) => {
    
          const cookie = { url: 'https://www.linkedin.com', name: 'auth_token', value: html }
          session.defaultSession.cookies.set(cookie)
          .then(() => {
            session.defaultSession.cookies.get({name: 'auth_token', domain: 'www.linkedin.com'})
            .then((cookies) => {
              let tempToken = cookies[0].value;
              event1.sender.send('token-received',true);
              mainWindow.webContents.send('profile-update',tempToken);
              subWindow.close();
              userLoggedIn();
            }).catch((error) => {
              console.log(error)
            })
          }, (error) => {
            console.error(error)
          })
        
      })  
      ////////////////////////

    }
    
    // More complex code to handle tokens goes here
});
});

ipcMain.on('user-init', (event, obj) => {

  applicationUser = {
    id: 'session_user_object',
    firstName: obj.firstName,
    lastName: obj.lastName,
    linkedin_id: obj.user_id,
    avatarPath: './files/images/avatars/'+obj.user_id+'.jpg',
    auth_token: obj.auth_token
  };
  console.log(applicationUser);

  download(obj.url, obj.user_id+'.jpg').then(function(data){
    mainWindow.webContents.send('avatar-uploaded',obj);
  });  
});
/*************LISTENERS END********* */
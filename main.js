// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, session, dialog} = require('electron')
const ipcMain = require('electron').ipcMain;
const path = require('path')
const config = require('./config.json');
const https = require('https');
const fs   = require('fs');
const isMac = process.platform === 'darwin'
let linkedinToken = null;
let linkedinWindow = null;
let summaryWindow = null;

function linkedinLogin(){
  linkedinWindow = createSubwindow(config.subwindows.linkedinlogin);
}

function getSummary(){
  summaryWindow = createSubwindow(config.subwindows.summary);  
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
  subWindow.loadFile(config.template);
  // subWindow.webContents.openDevTools();
  return subWindow;
}

ipcMain.on('oauthLinkReceived', function(event1, args) {
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
              linkedinToken = cookies[0].value;
              event1.sender.send('token-received',true);
              mainWindow.webContents.send('profile-update',linkedinToken);
              subWindow.close();
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

function createMainWindow () {

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
          label: 'Summary',
          click (item, focusedWindow) {
            console.log(linkedinToken);
          if (focusedWindow) getSummary();;
         }
        },
        {
          label: 'Login',
          click (item, focusedWindow) {
           if (focusedWindow) linkedinLogin();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

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
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const download = async (url) => {
  return new Promise((resolve, reject) => {
    var file = fs.createWriteStream("./files/temp/file.jpg");
    var request = https.get(url, function(response) {
    response.pipe(file);
    resolve(1);
    });
  });
};

ipcMain.on('download-url', (event, obj) => {
  download(obj.url).then(function(data){
    mainWindow.webContents.send('avatar-uploaded',obj);
  });  
});
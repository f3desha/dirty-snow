// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const config = require('./config.json');

const isMac = process.platform === 'darwin'

function createSubwindow(config){
   const subWindow = new BrowserWindow({
    minWidth: config.width,
    minHeight: config.height,
    maxWidth: config.width,
    maxHeight: config.height,
    width: config.width,
    height: config.height,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  subWindow.removeMenu();
  subWindow.loadFile(config.template);
  // subWindow.webContents.openDevTools()
}

function createMainWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./index.html');
  mainWindow.maximize();

 

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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
    label: 'Summary',
    click (item, focusedWindow) {
      if (focusedWindow) createSubwindow(config.subwindows.summary);
    }
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
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
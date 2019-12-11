const { app, BrowserWindow, Menu} = require('electron')
const {session} = require('electron')

let menuTemplate = [
    {role : "reload"}
   ];

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      // brackgroundColor: '#312450', cor de fundo do app, mas como uso o iframe nao faz tanta diferença
      icon: __dirname + "/Icon/Icon.png",
      webPreferences: {
        nodeIntegration: false,
        plugins: false,
        //webviewTag: true desativo pois Iframe tem melhor performance, além do bug do input cursor no webview
      },
      //show: false faz nao aparecer a janela
    })
    
  
    //limpeza de cookies
    //mainSession.clearCache()
    //mainSession.clearStorageData()
  
    win.loadURL('https://web.threema.ch/');
    session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })
  
  
    /*win.once('ready-to-show', () => { aparecer quando tiver carregado ja
    win.show()
  }) 
  */
    
    //win.setMenuBarVisibility(false)
    // win.removeMenu(true) remove todos os atalhos de abrir as coisas tipo F11, o console etc
    
  
    // and load the index.html of the app.
    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
      })
    
    }

    app.on('ready', createWindow)
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

// When app is ready.
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    center: true,
    resizable: true,
    'title-bar-style': 'hidden-inset'
  });
  
  mainWindow.loadUrl('file://' + __dirname + '/../index.html');
});

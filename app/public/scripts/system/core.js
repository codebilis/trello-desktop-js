var gui = require('nw.gui');
var fs = require('fs');
var win = gui.Window.get();

// Debugger Mode
win.showDevTools();


// Minimize App
function minimize() {
  win.minimize();
};

// Maximize App
function maximize() {
  win.maximize();
};

// Live Reload
var path = './';

fs.watch(path, function() {
  if(location) {
    location.reload();
  }
});
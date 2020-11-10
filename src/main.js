const { BrowserWindow, Notification, screen } = require("electron");
const { getConnection } = require("./database");

let window;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  window = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
    },
  });
}

module.exports = {
  createWindow,
};
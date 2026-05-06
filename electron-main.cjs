const { app, BrowserWindow, Menu, net, protocol, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const APP_SCHEME = 'ub';
const APP_HOST = 'app';

protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_SCHEME,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true
    }
  }
]);

function getAppRoot() {
  return __dirname;
}

function resolveAppPath(requestUrl) {
  const url = new URL(requestUrl);
  const requested = decodeURIComponent(url.pathname || '/index.html');
  const relativePath = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
  const appRoot = getAppRoot();
  const filePath = path.normalize(path.join(appRoot, relativePath));
  if (!filePath.startsWith(appRoot)) return path.join(appRoot, 'index.html');
  return filePath;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1000,
    minHeight: 650,
    backgroundColor: '#161209',
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadURL(`${APP_SCHEME}://${APP_HOST}/index.html`);
}

app.setAppUserModelId('com.universitybasketball.game');

app.whenReady().then(() => {
  protocol.handle(APP_SCHEME, request => {
    const filePath = resolveAppPath(request.url);
    return net.fetch(pathToFileURL(filePath).toString());
  });

  Menu.setApplicationMenu(null);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

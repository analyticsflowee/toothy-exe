"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  nativeImage,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import psList from "ps-list";
import path from "path";
import settings from "electron-settings";

const isDevelopment = process.env.NODE_ENV !== "production";
let tray;
let isQuiting;
let window;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function getProcesses() {
  return (await psList()).map((p) => ({ ...p, cmd: p.cmd || p.name }));
}

function cleanCmd(process) {
  const cmd = (process && process.cmd) || "";
  return cmd.split(" ")[0];
}

let showOnNextClose = true;
async function scanProcesses(win) {
  const list = await getProcesses();
  const toCheck = await settings.get("process");
  const find = list.find((l) => cleanCmd(l) === cleanCmd(toCheck));

  if (!find && showOnNextClose) {
    try {
      win.webContents.send("refresh");
      win.show();
      showOnNextClose = false;
    } catch (e) {
      console.log(e);
    }
  } else if (find) {
    showOnNextClose = true;
  }
}

async function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width: 1280,
    height: 1280,
    skipTaskbar: true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) window.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    window.loadURL("app://./index.html");
  }
}

app.on("before-quit", function () {
  isQuiting = true;
});

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  const iconPath = nativeImage.createFromPath("build/icon-tray.png");

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: function () {
        window.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);

  await createWindow();

  window.on("close", (event) => {
    if (!isQuiting) {
      event.preventDefault();
      window.hide();
      event.returnValue = false;
    }
  });

  window.on("minimize", (event) => {
    event.preventDefault();
    window.hide();
    event.returnValue = false;
  });

  if (app.dock) {
    app.dock.hide();
  }

  setInterval(() => scanProcesses(window), 2000);

  ipcMain.handle("get-processes", getProcesses);
  ipcMain.handle("hide", () => {
    return window.hide();
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

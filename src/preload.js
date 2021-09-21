import { ipcRenderer } from "electron";
import settings from "electron-settings";
window.ipcRenderer = ipcRenderer;
window.electronSettings = settings;
window.electronSettings.configure({
  dir: `${__dirname.split("toothy-tron")[0]}/toothy-tron`,
});
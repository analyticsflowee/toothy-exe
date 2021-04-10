import { ipcRenderer } from "electron";
import settings from "electron-settings";
window.ipcRenderer = ipcRenderer;
window.electronSettings = settings;

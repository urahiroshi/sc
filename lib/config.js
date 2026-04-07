const fs = require("fs");
const path = require("path");
const os = require("os");

const CONFIG_DIR = path.join(os.homedir(), ".config", "sc");
const CONFIG_FILE = path.join(CONFIG_DIR, "window.json");
const SCREENSHOTS_DIR = path.join(CONFIG_DIR, "screenshots");

function ensureDirs() {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function saveWindow(windowInfo) {
  ensureDirs();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(windowInfo, null, 2));
}

function loadWindow() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
}

module.exports = { CONFIG_DIR, CONFIG_FILE, SCREENSHOTS_DIR, ensureDirs, saveWindow, loadWindow };

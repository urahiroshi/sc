import fs from "fs";
import path from "path";
import os from "os";

export const CONFIG_DIR = path.join(os.homedir(), ".config", "sc");
export const CONFIG_FILE = path.join(CONFIG_DIR, "sc.json");
const DEFAULT_SCREENSHOTS_DIR = path.join(CONFIG_DIR, "screenshots");

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
}

function saveConfig(config) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function getScreenshotsDir() {
  const config = loadConfig();
  return config.screenshotsDir || DEFAULT_SCREENSHOTS_DIR;
}

export function ensureDirs() {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.mkdirSync(getScreenshotsDir(), { recursive: true });
}

export function saveWindow(windowInfo) {
  const config = loadConfig();
  config.window = windowInfo;
  saveConfig(config);
}

export function loadWindow() {
  const config = loadConfig();
  return config.window || null;
}

import fs from "fs";
import path from "path";
import os from "os";

export const CONFIG_DIR = path.join(os.homedir(), ".config", "sc");
export const CONFIG_FILE = path.join(CONFIG_DIR, "window.json");
export const SCREENSHOTS_DIR = path.join(CONFIG_DIR, "screenshots");

export function ensureDirs() {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

export function saveWindow(windowInfo) {
  ensureDirs();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(windowInfo, null, 2));
}

export function loadWindow() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
}

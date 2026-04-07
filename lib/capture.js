import { execSync } from "child_process";
import path from "path";
import { loadWindow, SCREENSHOTS_DIR, ensureDirs } from "./config.js";

export function capture() {
  const win = loadWindow();
  if (!win) {
    console.error("No target window configured. Run 'sc select' first.");
    process.exit(1);
  }

  ensureDirs();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${win.app}_${timestamp}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);

  // Capture by window ID without activating the window
  execSync(`screencapture -l ${win.id} -o "${filepath}"`, { encoding: "utf-8" });

  console.log(filepath);
}

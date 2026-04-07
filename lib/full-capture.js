import { execSync } from "child_process";
import path from "path";
import { getScreenshotsDir, ensureDirs } from "./config.js";

export function fullCapture() {
  ensureDirs();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `FullScreen_${timestamp}.png`;
  const filepath = path.join(getScreenshotsDir(), filename);

  execSync(`screencapture -o "${filepath}"`, { encoding: "utf-8" });

  console.log(filepath);
}

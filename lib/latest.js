import fs from "fs";
import path from "path";
import { getScreenshotsDir } from "./config.js";

export function latest() {
  const screenshotsDir = getScreenshotsDir();

  if (!fs.existsSync(screenshotsDir)) {
    console.error("No screenshots found.");
    process.exit(1);
  }

  const files = fs
    .readdirSync(screenshotsDir)
    .filter((f) => f.endsWith(".png"))
    .map((f) => ({
      name: f,
      path: path.join(screenshotsDir, f),
      mtime: fs.statSync(path.join(screenshotsDir, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) {
    console.error("No screenshots found.");
    process.exit(1);
  }

  console.log(files[0].path);
}

const fs = require("fs");
const path = require("path");
const { SCREENSHOTS_DIR } = require("./config");

function latest() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    console.error("スクリーンショットがまだありません。");
    process.exit(1);
  }

  const files = fs
    .readdirSync(SCREENSHOTS_DIR)
    .filter((f) => f.endsWith(".png"))
    .map((f) => ({
      name: f,
      path: path.join(SCREENSHOTS_DIR, f),
      mtime: fs.statSync(path.join(SCREENSHOTS_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (files.length === 0) {
    console.error("スクリーンショットがまだありません。");
    process.exit(1);
  }

  console.log(files[0].path);
}

module.exports = { latest };

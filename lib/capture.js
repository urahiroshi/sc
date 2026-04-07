const { execSync } = require("child_process");
const path = require("path");
const { loadWindow, SCREENSHOTS_DIR, ensureDirs } = require("./config");

function capture() {
  const win = loadWindow();
  if (!win) {
    console.error("対象ウィンドウが未設定です。先に sc select を実行してください。");
    process.exit(1);
  }

  ensureDirs();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${win.app}_${timestamp}.png`;
  const filepath = path.join(SCREENSHOTS_DIR, filename);

  // screencapture -l でウィンドウIDを指定してキャプチャ（ウィンドウを活性化しない）
  execSync(`screencapture -l ${win.id} -o "${filepath}"`, { encoding: "utf-8" });

  console.log(filepath);
}

module.exports = { capture };

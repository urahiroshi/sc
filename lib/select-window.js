const { select } = require("@inquirer/prompts");
const { listWindows } = require("./list-windows");
const { saveWindow } = require("./config");

async function selectWindow() {
  const windows = listWindows();

  if (windows.length === 0) {
    console.error("表示中のウィンドウが見つかりません。");
    process.exit(1);
  }

  const answer = await select({
    message: "対象のウィンドウを選択してください:",
    choices: windows.map((w, i) => ({
      name: `${w.app} — ${w.title}`,
      value: i,
    })),
  });

  const selected = windows[answer];
  saveWindow(selected);
  console.log(`保存しました: ${selected.app} — ${selected.title}`);
}

module.exports = { selectWindow };

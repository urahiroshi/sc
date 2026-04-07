#!/usr/bin/env node

const command = process.argv[2];

async function main() {
  switch (command) {
    case "select": {
      const { selectWindow } = require("../lib/select-window");
      await selectWindow();
      break;
    }
    case "capture": {
      const { capture } = require("../lib/capture");
      capture();
      break;
    }
    case "latest": {
      const { latest } = require("../lib/latest");
      latest();
      break;
    }
    default:
      console.log(`使い方:
  sc select   - 対象ウィンドウを選択・保存
  sc capture  - スクリーンショットを取得
  sc latest   - 直近のスクリーンショットのパスを表示`);
      break;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

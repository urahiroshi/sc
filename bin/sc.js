#!/usr/bin/env node

const command = process.argv[2];

switch (command) {
  case "select": {
    const { selectWindow } = await import("../lib/select-window.js");
    await selectWindow();
    break;
  }
  case "capture": {
    const { capture } = await import("../lib/capture.js");
    capture();
    break;
  }
  case "latest": {
    const { latest } = await import("../lib/latest.js");
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

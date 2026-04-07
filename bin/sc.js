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
    console.log(`Usage:
  sc select   - Select and save the target window
  sc capture  - Take a screenshot
  sc latest   - Show the path of the latest screenshot`);
    break;
}

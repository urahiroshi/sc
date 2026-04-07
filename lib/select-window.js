import prompts from "prompts";
import { listWindows } from "./list-windows.js";
import { saveWindow } from "./config.js";

export async function selectWindow() {
  const windows = await listWindows();

  if (windows.length === 0) {
    console.error("No visible windows found.");
    process.exit(1);
  }

  const { index } = await prompts({
    type: "select",
    name: "index",
    message: "Select the target window:",
    choices: windows.map((w, i) => ({
      title: `${w.app} — ${w.title}`,
      value: i,
    })),
  });

  if (index === undefined) {
    process.exit(1);
  }

  const selected = windows[index];
  saveWindow(selected);
  console.log(`Saved: ${selected.app} — ${selected.title}`);
}

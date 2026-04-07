import { select } from "@inquirer/prompts";
import { listWindows } from "./list-windows.js";
import { saveWindow } from "./config.js";

export async function selectWindow() {
  const windows = await listWindows();

  if (windows.length === 0) {
    console.error("No visible windows found.");
    process.exit(1);
  }

  const answer = await select({
    message: "Select the target window:",
    choices: windows.map((w, i) => ({
      name: `${w.app} — ${w.title}`,
      value: i,
    })),
  });

  const selected = windows[answer];
  saveWindow(selected);
  console.log(`Saved: ${selected.app} — ${selected.title}`);
}

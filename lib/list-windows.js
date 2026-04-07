import { openWindows } from "get-windows";

export async function listWindows() {
  const windows = await openWindows();
  return windows
    .filter((w) => w.title)
    .map((w) => ({
      id: w.id,
      app: w.owner.name,
      title: w.title,
    }));
}

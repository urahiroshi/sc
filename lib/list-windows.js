const { execSync } = require("child_process");
const { windowManager } = require("node-window-manager");

const APPLESCRIPT = `
tell application "System Events"
  set output to ""
  set procList to every process whose visible is true
  repeat with proc in procList
    set procName to name of proc
    try
      set winList to every window of proc
      repeat with i from 1 to count of winList
        set win to item i of winList
        set winTitle to name of win
        if winTitle is not missing value and winTitle is not "" then
          set {x, y} to position of win
          set {w, h} to size of win
          set output to output & procName & "\\t" & winTitle & "\\t" & x & "\\t" & y & "\\t" & w & "\\t" & h & linefeed
        end if
      end repeat
    end try
  end repeat
  return output
end tell
`;

function listWindows() {
  // AppleScript: タイトル・位置・サイズ取得
  const asOutput = execSync(
    `osascript -e '${APPLESCRIPT.replace(/'/g, "'\\''")}'`,
    { encoding: "utf-8" }
  );
  const asWindows = asOutput
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [app, title, x, y, w, h] = line.split("\t");
      return { app, title, x: Number(x), y: Number(y), w: Number(w), h: Number(h) };
    });

  // node-window-manager: CGWindowID・位置取得
  const nwmWindows = windowManager.getWindows().map((w) => {
    const b = w.getBounds();
    return { id: w.id, x: b.x, y: b.y, w: b.width, h: b.height };
  });

  // 位置とサイズでマッチングしてCGWindowIDを付与
  const seen = new Set();
  return asWindows
    .map((aw) => {
      const match = nwmWindows.find(
        (nw) => nw.x === aw.x && nw.y === aw.y && nw.w === aw.w && nw.h === aw.h
      );
      if (!match || seen.has(match.id)) return null;
      seen.add(match.id);
      return { id: match.id, app: aw.app, title: aw.title };
    })
    .filter(Boolean);
}

module.exports = { listWindows };

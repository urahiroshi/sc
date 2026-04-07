import { execSync } from "child_process";

const SWIFT_CODE = `
import CoreGraphics
import Foundation

let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
guard let list = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as? [[String: Any]] else { exit(1) }
var result: [[String: Any]] = []
var totalWindows = 0
for w in list {
    let name = w["kCGWindowOwnerName"] as? String ?? ""
    let title = w["kCGWindowName"] as? String ?? ""
    let id = w["kCGWindowNumber"] as? Int ?? 0
    let layer = w["kCGWindowLayer"] as? Int ?? -1
    if layer == 0 {
        totalWindows += 1
        if !title.isEmpty {
            result.append(["id": id, "app": name, "title": title])
        }
    }
}
let output: [String: Any] = ["windows": result, "totalWindows": totalWindows]
let data = try JSONSerialization.data(withJSONObject: output)
print(String(data: data, encoding: .utf8)!)
`;

export async function listWindows() {
  const output = execSync(`swift -e '${SWIFT_CODE}'`, {
    encoding: "utf-8",
  });
  const { windows, totalWindows } = JSON.parse(output);

  if (windows.length === 0 && totalWindows > 0) {
    console.error(
      "Screen Recording permission is required.\n" +
      "Go to System Settings > Privacy & Security > Screen Recording and enable your terminal app."
    );
    process.exit(1);
  }

  return windows;
}

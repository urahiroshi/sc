import { execSync } from "child_process";

const SWIFT_CODE = `
import CoreGraphics
import Foundation

let options: CGWindowListOption = [.optionOnScreenOnly, .excludeDesktopElements]
guard let list = CGWindowListCopyWindowInfo(options, kCGNullWindowID) as? [[String: Any]] else { exit(1) }
var result: [[String: Any]] = []
for w in list {
    let name = w["kCGWindowOwnerName"] as? String ?? ""
    let title = w["kCGWindowName"] as? String ?? ""
    let id = w["kCGWindowNumber"] as? Int ?? 0
    let layer = w["kCGWindowLayer"] as? Int ?? -1
    if !title.isEmpty && layer == 0 {
        result.append(["id": id, "app": name, "title": title])
    }
}
let data = try JSONSerialization.data(withJSONObject: result)
print(String(data: data, encoding: .utf8)!)
`;

export async function listWindows() {
  const output = execSync(`swift -e '${SWIFT_CODE}'`, {
    encoding: "utf-8",
  });
  return JSON.parse(output);
}

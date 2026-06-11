import * as fs from "fs";
import * as path from "path";

function searchLogs(dir: string): void {
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const full = path.join(dir, file);
      let s;
      try { s = fs.statSync(full); } catch(e) { continue; }
      if (s.isDirectory()) {
        if (file === "node_modules" || file === ".git" || file === "dist") continue;
        searchLogs(full);
      } else {
        if (file.endsWith(".jsonl") || file.endsWith(".log") || file.includes("transcript")) {
          console.log("Found log file:", full, "size:", s.size);
        }
      }
    }
  } catch (e) {}
}

console.log("Searching for transcripts or log files...");
searchLogs("/root");
searchLogs("/app");
searchLogs("/home");
searchLogs("/usr");
searchLogs("/tmp");
searchLogs("/www-data-home");
// Check /.gemini recursively if possible
searchLogs("/.gemini");

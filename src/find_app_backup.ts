import * as fs from "fs";
import * as path from "path";

function findBackups(dir: string): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === "node_modules" || file === ".git" || file === "dist") continue;
      const fullPath = path.join(dir, file);
      // skip system directories that are slow/fail
      if (["/proc", "/sys", "/dev", "/var/lib", "/var/cache", "/etc"].some(p => fullPath.startsWith(p))) continue;
      
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) { continue; }

      if (stat.isDirectory()) {
         results = results.concat(findBackups(fullPath));
      } else if (file.includes("App.tsx") && file !== "App.tsx") {
         results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

console.log("Searching parent directories for backups...");
console.log("Results in /app:", findBackups("/app"));
console.log("Results in /tmp:", findBackups("/tmp"));
console.log("Results in /root:", findBackups("/root"));

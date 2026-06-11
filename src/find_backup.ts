import * as fs from "fs";
import * as path from "path";

function findFiles(dir: string, pattern: RegExp): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === "node_modules" || file === ".git" || file === "dist") continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
         results = results.concat(findFiles(fullPath, pattern));
      } else if (pattern.test(file)) {
         results.push(fullPath);
      }
    }
  } catch (e) {}
  return results;
}

console.log("Searching in workspace:", process.cwd());
const workspaceFiles = findFiles(process.cwd(), /transcript|log|backup|App/);
console.log("Found workspace files:", workspaceFiles);

// Let's also check if we can list the directory `/app` or similar nearby folders:
const appFiles = findFiles("/app", /transcript|log|backup|App/);
console.log("Found files in /app:", appFiles);

import * as fs from "fs";
import * as path from "path";

function findVideos(dir: string, depth = 0): void {
  if (depth > 6) return;
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const full = path.join(dir, file);
      let s;
      try { s = fs.statSync(full); } catch(e) { continue; }
      if (s.isDirectory()) {
        if (file === "node_modules" || file === ".git" || file === "dist" || file === "proc" || file === "sys" || file === "dev" || file === "lib" || file === "lib64" || file === "bin" || file === "sbin" || file === "etc" || file === "usr") continue;
        findVideos(full, depth + 1);
      } else {
        const ext = path.extname(file).toLowerCase();
        if ([".mp4", ".mov", ".webm", ".avi", ".mkv", ".3gp"].includes(ext) || file.toLowerCase().includes("upload") || file.toLowerCase().includes("attach")) {
          console.log("FOUND VIDEO:", full, "size:", s.size, "mtime:", s.mtime);
        }
      }
    }
  } catch (e) {}
}

console.log("Searching for any video files...");
findVideos("/app");
findVideos("/tmp");
findVideos("/home");
findVideos("/www-data-home");
findVideos(".");





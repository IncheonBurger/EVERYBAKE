import * as fs from "fs";
import * as path from "path";

const logDir = "/.gemini/antigravity/brain/b55c589c-e90b-4338-9c14-773151c6209b/.system_generated/logs";
const logPath = path.join(logDir, "transcript.jsonl");

try {
  if (fs.existsSync(logPath)) {
    console.log("Log path exists! Size:", fs.statSync(logPath).size);
    // Read the last 200KB of the file to search for previous segments
    const fd = fs.openSync(logPath, "r");
    const size = fs.statSync(logPath).size;
    const bufferSize = Math.min(200000, size);
    const buffer = Buffer.alloc(bufferSize);
    fs.readSync(fd, buffer, 0, bufferSize, size - bufferSize);
    fs.closeSync(fd);

    const text = buffer.toString("utf-8");
    console.log("Search results for activePlazaTab or plazaPosts:");
    const index = text.lastIndexOf("activePlazaTab");
    if (index !== -1) {
      console.log("Found snippet in logs:");
      console.log(text.substring(index - 500, index + 2500));
    } else {
      console.log("activePlazaTab not found in log snippet.");
    }
  } else {
    console.log("Log path does not exist:", logPath);
  }
} catch (e: any) {
  console.error("Error reading logs:", e.message || e);
}

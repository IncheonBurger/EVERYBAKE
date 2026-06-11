import { execSync } from "child_process";

try {
  console.log("Checking git status...");
  const status = execSync("git status", { encoding: "utf-8" });
  console.log(status);

  console.log("Reverting App.tsx to last committed state...");
  const revert = execSync("git checkout src/App.tsx", { encoding: "utf-8" });
  console.log("Revert result:", revert);
} catch (error: any) {
  console.error("Error running restore:", error.message || error);
}

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My printer has one job and does it the way a cat does fetch: it stares at me, blinks twice, then prints the wrong document in a language I don't speak and demands new ink for the privilege. I pay $40 for a cartridge that dries out while it sleeps, and when I finally need it, it says the tray is empty — while holding the paper. It is not broken. It is a hostage negotiator with a USB cable.";

// Gate (per RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 400
// characters, not only white space.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 400) {
  throw new Error(`entry is ${chars.length} characters, gate needs 1-400`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: what was written must be byte-identical.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the entry");
}

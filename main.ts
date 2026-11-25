import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The screen door banged behind me a hundred times a day, and my mother never once fixed the spring, because she said she liked knowing exactly when I came home.";

function fail(message: string): never {
  throw new Error(message);
}

if (LINE.length < 1 || LINE.length > 280) {
  fail(`line must be 1 to 280 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  fail("line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  fail("line must not contain control characters");
}
if (!LINE.endsWith(".")) {
  fail("line must end with a period, as a single clean sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const readBack = readFileSync(outPath, "utf8");
if (readBack !== LINE) {
  fail("round-trip read-back mismatch");
}

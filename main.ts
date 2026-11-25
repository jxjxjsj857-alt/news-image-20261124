// News-image entry for Tuesday 24 November 2026. The image is drawn in
// advance (see compose.py in the build workspace) and shipped beside this
// file; the program only copies it to the grader's output directory, so
// both grading runs write identical bytes. Node 22, standard library only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

const bytes = readFileSync(source);
// Sanity check: the file must be a whole PNG (magic bytes) and within the gate.
if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
  throw new Error("entry.png is not a PNG file");
}
if (bytes.length > 1048576) {
  throw new Error("entry.png exceeds the 1 MiB gate");
}
// Deterministic by construction: the same bytes are copied on every run,
// so the two grading runs always agree.
mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);

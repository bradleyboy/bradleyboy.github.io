import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssDir = join(__dirname, "..", "css");

function hashFile(relativePath) {
  const content = readFileSync(join(cssDir, relativePath));
  return createHash("sha256").update(content).digest("hex").slice(0, 8);
}

export default {
  mainCss: hashFile("main.css"),
  prismCss: hashFile("prism-theme.css"),
};

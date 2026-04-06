#!/usr/bin/env node
/**
 * Generate API reference docs from TypeScript source via TypeDoc.
 *
 * Output goes to docs/api/ — these files are committed to the repo
 * so www.chan.run can consume them via docs:fetch without running typedoc.
 *
 * Steps:
 *   1. Preserve meta.json (sidebar ordering)
 *   2. Run typedoc → docs/api/
 *   3. Strip .md extensions from internal links (fumadocs uses extensionless routes)
 *   4. Restore meta.json
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const API_DIR = "docs/api";
const META_PATH = join(API_DIR, "meta.json");

// 1. Preserve meta.json
let metaBackup;
if (existsSync(META_PATH)) {
  metaBackup = readFileSync(META_PATH);
}

// 2. Run typedoc
execSync("typedoc", { stdio: "inherit" });

// 3. Strip .md from internal markdown links
const mdFiles = execSync(`find ${API_DIR} -name '*.md'`, { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean);

for (const file of mdFiles) {
  const content = readFileSync(file, "utf8");
  const fixed = content.replace(/\]\(([^)]*?)\.md\)/g, "]($1)");
  if (fixed !== content) {
    writeFileSync(file, fixed);
  }
}

// 4. Restore meta.json
if (metaBackup) {
  writeFileSync(META_PATH, metaBackup);
}

console.log(`✓ API docs generated in ${API_DIR}/`);

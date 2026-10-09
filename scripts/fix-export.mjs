// Runs after `npm run build`.
// Next.js writes small page-prefetch files such as out/about/__next.about.__PAGE__.txt. When the site is built
// on Windows, a path-separator bug writes them as out/about/__next.about/__PAGE__.txt instead, so the browser's
// prefetch requests get 404s. This moves them to the names the browser asks for. On Mac/Linux it finds nothing to do.
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out", import.meta.url));
let moved = 0;

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? filesIn(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesIn(p)) {
        const flat = `${name}.${relative(p, file).split(sep).join(".")}`;
        renameSync(file, join(dir, flat));
        moved++;
      }
      rmSync(p, { recursive: true, force: true });
    } else {
      walk(p);
    }
  }
}

walk(out);
console.log(moved ? `fix-export: renamed ${moved} prefetch files` : "fix-export: nothing to fix");

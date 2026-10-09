// Runs before `npm run dev` and `npm run build`.
// Looks for the Android app in public/downloads/ and writes its details to lib/app-meta.json,
// which the Staff, Download and Home pages read. No APK = available: false ("Available soon").
import { createHash } from "node:crypto";
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "downloads");
const apk = join(dir, "indigenous-app.apk");
const versionFile = join(dir, "version.txt");
const out = join(root, "lib", "app-meta.json");

mkdirSync(dir, { recursive: true });

function sha256(file) {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    createReadStream(file)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", () => resolve(hash.digest("hex")))
      .on("error", reject);
  });
}

let meta = { available: false };

if (existsSync(apk) && statSync(apk).isFile() && statSync(apk).size > 0) {
  const stat = statSync(apk);
  meta = {
    available: true,
    file: "/downloads/indigenous-app.apk",
    version: existsSync(versionFile) ? readFileSync(versionFile, "utf8").trim().split(/\r?\n/)[0] : "",
    sizeMB: Math.round((stat.size / (1024 * 1024)) * 10) / 10,
    buildDate: stat.mtime.toISOString().slice(0, 10),
    sha256: await sha256(apk),
  };
  console.log(`app-meta: found APK (${meta.sizeMB} MB${meta.version ? `, version ${meta.version}` : ""})`);
} else {
  console.log("app-meta: no APK in public/downloads/, the site will show \"Available soon\"");
}

const json = JSON.stringify(meta, null, 2) + "\n";
// Only rewrite when something changed, so the file does not churn in git.
if (!existsSync(out) || readFileSync(out, "utf8") !== json) writeFileSync(out, json);

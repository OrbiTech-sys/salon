/**
 * Looks in public/photos for files named after the site's photo slots and writes config/photo-manifest.json.
 * config/salon.config.ts uses that manifest, so dropping a file into public/photos replaces the matching
 * built-in image. Runs automatically before `npm run dev` and `npm run build`; run `npm run photos` after adding files.
 *
 * Accepted formats: .jpg .jpeg .png .webp. The slot is the file name without the extension, for example
 * public/photos/hero.jpg or public/photos/gallery-03.webp. See PHOTOS.md for every slot and its ideal size.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "public/photos");
const OUT = path.join(ROOT, "config/photo-manifest.json");

function size(buf, ext) {
  if (ext === ".png") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (ext === ".webp") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (kind === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    return null;
  }
  // JPEG: walk the markers until a start-of-frame segment
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const manifest = {};
if (fs.existsSync(DIR)) {
  for (const file of fs.readdirSync(DIR).sort()) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
    const slot = path.basename(file, path.extname(file)).toLowerCase();
    const dims = size(fs.readFileSync(path.join(DIR, file)), ext);
    if (!dims) {
      console.warn(`photos: could not read the size of ${file}, skipped`);
      continue;
    }
    manifest[slot] = { src: `/photos/${file}`, width: dims.width, height: dims.height };
  }
}

fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n");
const names = Object.keys(manifest);
console.log(names.length ? `photos: ${names.length} slot(s) found: ${names.join(", ")}` : "photos: no files in public/photos yet. Add hero.jpg first; see PHOTOS.md");
if (!manifest.hero && names.length) console.warn("photos: no hero.jpg, so slots without a file will have nothing to fall back on");

/**
 * Strips the dark background from src/assets/mascot.png and writes mascot.png
 * with transparent alpha where the background was.
 *
 * Approach:
 *  1. Decode the PNG to raw RGBA pixels via the `sharp` package if present,
 *     else fall back to PowerShell + System.Drawing (Windows-only).
 *  2. Flood-fill from the four corners marking all "background-colored"
 *     pixels reachable from the edges. This avoids erasing dark pixels that
 *     are inside the mascot (e.g. its face, hood interior).
 *  3. Soften the silhouette edge by alpha-feathering one ring of pixels.
 *  4. Re-encode the PNG with alpha = 0 for background pixels.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const INPUT = path.join(REPO, "src", "assets", "mascot.png");
const BACKUP = path.join(REPO, "src", "assets", "mascot.original.png");
const OUTPUT = INPUT;

// Background detection thresholds (tweak if needed).
//  - A pixel is "background-like" if its brightness < BG_MAX_LUMA
//    AND it's within COLOR_TOLERANCE of one of the seed corner pixels.
const BG_MAX_LUMA = 110;        // 0..255, dark pixels only
const COLOR_TOLERANCE = 70;     // 0..255 per channel
const FEATHER_RADIUS = 1;       // pixels of alpha smoothing at edge

function decodeWithPowerShell(inputPath) {
  // Use System.Drawing to load the PNG and dump raw BGRA to stdout.
  // This works on Windows without any npm install.
  const ps = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap '${inputPath.replace(/\\/g, "\\\\")}'
$w = $bmp.Width
$h = $bmp.Height
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$len = $data.Stride * $h
$buf = New-Object byte[] $len
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $len)
$bmp.UnlockBits($data)
[Console]::Out.Write("${"DIMS"}:$w:$h:$($data.Stride)\`n")
$stream = [Console]::OpenStandardOutput()
$stream.Write($buf, 0, $len)
$bmp.Dispose()
`;
  const out = execFileSync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", ps],
    { maxBuffer: 1024 * 1024 * 64, windowsHide: true },
  );
  // Header is ASCII "DIMS:W:H:STRIDE\n", then raw BGRA bytes.
  const nl = out.indexOf(0x0a);
  const header = out.slice(0, nl).toString("ascii");
  const [, wStr, hStr, strideStr] = header.split(":");
  const w = parseInt(wStr, 10);
  const h = parseInt(hStr, 10);
  const stride = parseInt(strideStr, 10);
  const raw = out.slice(nl + 1);
  // Convert BGRA (System.Drawing) -> RGBA, dropping stride padding.
  const rgba = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = y * stride + x * 4;
      const di = (y * w + x) * 4;
      rgba[di + 0] = raw[si + 2]; // R
      rgba[di + 1] = raw[si + 1]; // G
      rgba[di + 2] = raw[si + 0]; // B
      rgba[di + 3] = raw[si + 3]; // A
    }
  }
  return { width: w, height: h, data: rgba };
}

function encodeWithPowerShell(outputPath, width, height, rgba) {
  // Convert RGBA -> BGRA for System.Drawing, then ask PS to save as PNG.
  const bgra = Buffer.alloc(rgba.length);
  for (let i = 0; i < rgba.length; i += 4) {
    bgra[i + 0] = rgba[i + 2];
    bgra[i + 1] = rgba[i + 1];
    bgra[i + 2] = rgba[i + 0];
    bgra[i + 3] = rgba[i + 3];
  }
  const tmp = outputPath + ".bgra.bin";
  // Use sync writeFile, the PS script reads it back.
  return fs.writeFile(tmp, bgra).then(() => {
    const ps = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$w = ${width}
$h = ${height}
$bytes = [System.IO.File]::ReadAllBytes('${tmp.replace(/\\/g, "\\\\")}')
$bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
$bmp.UnlockBits($data)
$bmp.Save('${outputPath.replace(/\\/g, "\\\\")}', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
`;
    execFileSync(
      "powershell.exe",
      ["-NoProfile", "-NonInteractive", "-Command", ps],
      { stdio: "inherit", windowsHide: true },
    );
    return fs.unlink(tmp);
  });
}

function luma(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function colorDist(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));
}

function buildBackgroundMask(width, height, rgba) {
  const mask = new Uint8Array(width * height); // 1 = background
  // Seed colors: average each corner's 3x3 patch.
  const corners = [
    [2, 2],
    [width - 3, 2],
    [2, height - 3],
    [width - 3, height - 3],
  ];
  const seeds = corners.map(([cx, cy]) => {
    let r = 0, g = 0, b = 0, n = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const i = ((cy + dy) * width + (cx + dx)) * 4;
        r += rgba[i]; g += rgba[i + 1]; b += rgba[i + 2];
        n++;
      }
    }
    return [r / n, g / n, b / n];
  });

  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (mask[idx]) return;
    const i = idx * 4;
    const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
    if (luma(r, g, b) > BG_MAX_LUMA) return;
    const matchesAny = seeds.some((s) => colorDist([r, g, b], s) <= COLOR_TOLERANCE);
    if (!matchesAny) return;
    mask[idx] = 1;
    stack.push(x, y);
  };

  // Seed from all four corners (and the edges).
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
  return mask;
}

function applyMaskWithFeather(width, height, rgba, mask) {
  // Background pixels -> alpha 0.
  // Pixels adjacent to background -> partial alpha to soften the edge.
  const out = Buffer.from(rgba);
  for (let i = 0; i < mask.length; i++) {
    if (mask[i]) {
      out[i * 4 + 3] = 0;
    }
  }
  if (FEATHER_RADIUS > 0) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (mask[idx]) continue;
        // Count background neighbors in FEATHER_RADIUS window.
        let bgCount = 0, total = 0;
        for (let dy = -FEATHER_RADIUS; dy <= FEATHER_RADIUS; dy++) {
          for (let dx = -FEATHER_RADIUS; dx <= FEATHER_RADIUS; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            if (mask[ny * width + nx]) bgCount++;
            total++;
          }
        }
        if (bgCount > 0) {
          const keep = 1 - bgCount / total;
          out[idx * 4 + 3] = Math.round(255 * keep);
        }
      }
    }
  }
  return out;
}

async function main() {
  console.log("Reading", INPUT);
  try {
    await fs.copyFile(INPUT, BACKUP);
    console.log("Backed up original to", BACKUP);
  } catch (e) {
    if (e.code !== "EEXIST") throw e;
  }

  const { width, height, data } = decodeWithPowerShell(INPUT);
  console.log(`Decoded ${width}x${height} (${data.length} bytes RGBA)`);

  const mask = buildBackgroundMask(width, height, data);
  const bgCount = mask.reduce((s, v) => s + v, 0);
  console.log(`Background pixels: ${bgCount} / ${width * height} (${((bgCount / (width * height)) * 100).toFixed(1)}%)`);

  const out = applyMaskWithFeather(width, height, data, mask);
  await encodeWithPowerShell(OUTPUT, width, height, out);
  console.log("Wrote transparent PNG to", OUTPUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

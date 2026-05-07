import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Flood-fill knockout: starts at all four corners (which sit on the seamless
// white backdrop) and consumes any connected pixel within `TOLERANCE` of the
// seed color. Anything not reachable from a corner — bottle, tissue, label —
// stays opaque. Edges feathered via Gaussian blur on the alpha channel.
const TOLERANCE = 28; // chroma distance to treat as "same as backdrop"
const FEATHER_PX = 1.2;

function colorDist(a, b, c, x, y, z) {
  const dr = a - x;
  const dg = b - y;
  const db = c - z;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function knockout(input, output) {
  mkdirSync(dirname(output), { recursive: true });

  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`expected 4 channels, got ${channels}`);

  // Seed color = average of the four corner pixels.
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  let sr = 0,
    sg = 0,
    sb = 0;
  for (const [x, y] of corners) {
    const idx = (y * width + x) * 4;
    sr += data[idx];
    sg += data[idx + 1];
    sb += data[idx + 2];
  }
  const seedR = sr / 4;
  const seedG = sg / 4;
  const seedB = sb / 4;

  // BFS flood fill across pixels within TOLERANCE of the seed.
  const isBg = new Uint8Array(width * height);
  const stack = [];
  for (const [x, y] of corners) stack.push(y * width + x);

  while (stack.length) {
    const p = stack.pop();
    if (isBg[p]) continue;
    const idx = p * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (colorDist(r, g, b, seedR, seedG, seedB) > TOLERANCE) continue;
    isBg[p] = 1;
    const x = p % width;
    const y = (p - x) / width;
    if (x > 0) stack.push(p - 1);
    if (x < width - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - width);
    if (y < height - 1) stack.push(p + width);
  }

  // Apply mask to alpha channel.
  const out = Buffer.from(data);
  for (let p = 0; p < isBg.length; p++) {
    if (isBg[p]) out[p * 4 + 3] = 0;
  }

  // Feather the alpha edge with a Gaussian blur on the alpha channel only.
  // We extract alpha, blur, and composite back.
  const rgba = sharp(out, { raw: { width, height, channels: 4 } });
  const alphaOnly = await rgba
    .clone()
    .extractChannel("alpha")
    .blur(FEATHER_PX)
    .toBuffer();
  const rgb = await rgba.clone().removeAlpha().raw().toBuffer();

  const merged = Buffer.alloc(width * height * 4);
  for (let p = 0; p < width * height; p++) {
    merged[p * 4] = rgb[p * 3];
    merged[p * 4 + 1] = rgb[p * 3 + 1];
    merged[p * 4 + 2] = rgb[p * 3 + 2];
    merged[p * 4 + 3] = alphaOnly[p];
  }

  // Trim the canvas to the visible bounds so the bottle isn't lost in empty space.
  await sharp(merged, { raw: { width, height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  return { width, height, output };
}

const projectRoot = resolve(new URL(".", import.meta.url).pathname, "..");
const input = resolve(projectRoot, "public/images/Fonte-di-Foiano-Grand-Cru.jpg");
const output = resolve(projectRoot, "public/images/Fonte-di-Foiano-Grand-Cru.png");

const result = await knockout(input, output);
console.log(`wrote ${result.output} (input ${result.width}x${result.height})`);

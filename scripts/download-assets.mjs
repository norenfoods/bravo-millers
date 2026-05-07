// Downloads the bottle images, logo and favicon used by the bestoliveoils.org/search clone.
// Run: node scripts/download-assets.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');

const slugs = [
  '10303','10130','10379','10202','10524','10341','10125','10017','10473',
  '10037','10327','10381','10586','10527','10222','10540','10025','10414',
  '9853','10161','10135','10596','10659','10144','10801','10185','10646',
  '9787','10622','10230','10542','9875','10071','10384','9867','10041',
  '10407','10188','9880','10528',
];

const items = [
  ...slugs.map((s) => ({
    url: `https://bestoliveoils.com/cdn/images/2026/${s}.png`,
    dest: join(PUBLIC, 'images', 'bottles', `${s}.png`),
  })),
  { url: 'https://bestoliveoils.org/assets/logo-dark-Cs1grXKM.svg', dest: join(PUBLIC, 'logo-dark.svg') },
  { url: 'https://bestoliveoils.org/favicon.png', dest: join(PUBLIC, 'seo', 'favicon.png') },
];

async function fetchOne(item) {
  if (existsSync(item.dest)) return { ok: true, skipped: true, dest: item.dest };
  const res = await fetch(item.url);
  if (!res.ok) throw new Error(`${res.status} ${item.url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(item.dest), { recursive: true });
  await writeFile(item.dest, buf);
  return { ok: true, dest: item.dest, size: buf.length };
}

async function batched(items, limit) {
  const results = [];
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    const r = await Promise.allSettled(chunk.map(fetchOne));
    results.push(...r);
  }
  return results;
}

const t0 = Date.now();
const results = await batched(items, 6);
const ok = results.filter((r) => r.status === 'fulfilled').length;
const fail = results.filter((r) => r.status === 'rejected');
console.log(`Done: ${ok}/${items.length} in ${Date.now() - t0}ms`);
fail.forEach((f) => console.error('FAIL', f.reason?.message ?? f.reason));
if (fail.length) process.exit(1);

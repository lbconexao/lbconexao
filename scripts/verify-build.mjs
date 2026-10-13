import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(directory, e.name)) : path.join(directory, e.name)))).flat();
}
const all = await files(root);
assert(!all.some(f => /(?:^|[\\/])(?:\.env[^\\/]*|node_modules|\.git)(?:[\\/]|$)/.test(f)), 'Private/development files in dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
assert(html.includes('/lbconexao/assets/'), 'GitHub Pages base missing');
assert(!html.includes('cdn.tailwindcss.com'), 'Runtime CSS CDN should be absent');
for (const file of all.filter(f => /\.(?:js|html|css)$/.test(f))) {
  const text = await readFile(file, 'utf8');
  for (const forbidden of ['GEMINI_API_KEY', 'script.google.com/macros/', 'picsum.photos', 'Equipamento Saúde Premium', 'lb_user']) {
    assert(!text.includes(forbidden), `Unexpected legacy/secret marker: ${forbidden}`);
  }
}
for (const media of ['marca-lb-small.webp','marca-dev.webp','marca-saude.webp','marca-store.webp','institucional.mp4','institucional-2.mp4','poster.webp','poster-2.webp']) {
  assert((await stat(path.join(root,'media',media))).size > 0, `Missing media ${media}`);
}
console.log(`Build verified: ${all.length} files; /lbconexao/ base, official assets, no environment files or legacy endpoints in bundle.`);

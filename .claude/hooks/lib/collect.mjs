// .claude/hooks/lib/collect.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { extractSourceMeta } from './parse.mjs';

const RAW_DIRS = ['raw/articles', 'raw/papers', 'raw/notes'];
const RAW_EXTS = new Set(['.md', '.pdf', '.ppt', '.pptx']);

function walk(dir) {
  let out = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

export function collectRawFiles(projectDir) {
  const files = [];
  for (const d of RAW_DIRS) {
    for (const f of walk(join(projectDir, d))) {
      const ext = f.toLowerCase().match(/\.[^.\\\/]+$/)?.[0] || '';
      if (RAW_EXTS.has(ext)) files.push(f);
    }
  }
  return files;
}

export function collectSources(projectDir) {
  const res = [];
  for (const f of walk(join(projectDir, 'wiki/sources'))) {
    if (!f.toLowerCase().endsWith('.md')) continue;
    let content;
    try { content = readFileSync(f, 'utf8'); } catch { continue; }
    const meta = extractSourceMeta(content);
    res.push({ path: f, ingested_from: meta.ingested_from, raw_hash: meta.raw_hash });
  }
  return res;
}

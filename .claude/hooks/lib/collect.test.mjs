// .claude/hooks/lib/collect.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { collectRawFiles, collectSources } from './collect.mjs';

function fixture(cb) {
  const dir = mkdtempSync(join(tmpdir(), 'hook-'));
  mkdirSync(join(dir, 'raw/articles'), { recursive: true });
  mkdirSync(join(dir, 'wiki/sources'), { recursive: true });
  cb(dir);
}

test('collectRawFiles 收集 md/pdf/ppt，排除 assets 与非资料扩展名', () => {
  fixture(dir => {
    writeFileSync(join(dir, 'raw/articles/a.md'), 'x');
    writeFileSync(join(dir, 'raw/articles/b.pdf'), 'x');
    mkdirSync(join(dir, 'raw/assets'), { recursive: true });
    writeFileSync(join(dir, 'raw/assets/img.png'), 'x');
    const files = collectRawFiles(dir).map(f => f.replace(/\\/g, '/'));
    assert.equal(files.length, 2);
    assert.ok(files.some(f => f.endsWith('raw/articles/a.md')));
    assert.ok(files.some(f => f.endsWith('raw/articles/b.pdf')));
  });
});

test('collectSources 解析各页 ingested_from/raw_hash', () => {
  fixture(dir => {
    writeFileSync(join(dir, 'wiki/sources/s1.md'),
      '---\ntype: source\ningested_from: /raw/articles/a.md\nraw_hash: h1\n---\n');
    writeFileSync(join(dir, 'wiki/sources/s2.md'), '---\ntype: source\n---\n');
    const srcs = collectSources(dir);
    const s1 = srcs.find(s => s.path.endsWith('s1.md'));
    assert.equal(s1.ingested_from, '/raw/articles/a.md');
    assert.equal(s1.raw_hash, 'h1');
    const s2 = srcs.find(s => s.path.endsWith('s2.md'));
    assert.equal(s2.ingested_from, null);
  });
});

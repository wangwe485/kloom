// .claude/hooks/lib/detect.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { detectUningested, detectDrift } from './detect.mjs';

test('detectUningested 列出无 source 指向的 raw', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hook-'));
  const a = join(dir, 'raw/articles/a.md').replace(/\\/g, '/');
  const b = join(dir, 'raw/articles/b.md').replace(/\\/g, '/');
  const sources = [
    { path: 's1', ingested_from: '/raw/articles/a.md', raw_hash: null }, // a 已 ingest，不列入
  ];
  const out = detectUningested([a, b], sources, dir);
  assert.deepEqual(out, ['b.md']);   // a 已被 source 指向，不列入；仅 b
});

test('detectDrift 标记 hash 不一致 + 缺 raw_hash 标 unknown', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hook-'));
  execSync('git init -q', { cwd: dir });
  mkdirSync(join(dir, 'raw/articles'), { recursive: true });
  writeFileSync(join(dir, 'raw/articles/a.md'), 'v1');
  const realHash = execSync('git hash-object raw/articles/a.md', { cwd: dir, encoding: 'utf8' }).trim();
  const sources = [
    { path: join(dir, 's1.md'), ingested_from: '/raw/articles/a.md', raw_hash: 'stale' },       // drift
    { path: join(dir, 's2.md'), ingested_from: '/raw/articles/a.md', raw_hash: realHash },       // ok
    { path: join(dir, 's3.md'), ingested_from: '/raw/articles/a.md', raw_hash: null },           // unknown
  ];
  const { drift, unknown } = detectDrift(sources, dir);
  assert.ok(drift.includes('s1.md'));
  assert.ok(!drift.includes('s2.md'));
  assert.ok(unknown.includes('s3.md'));
});

test('detectUningested 容忍反斜杠 ingested_from（归一化对称，Issue #2）', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hook-'));
  const a = join(dir, 'raw/articles/a.md'); // Windows 下 join 含反斜杠
  const sources = [
    { path: 's1', ingested_from: '\\raw\\articles\\a.md', raw_hash: null }, // 手写反斜杠写法
  ];
  const out = detectUningested([a], sources, dir);
  assert.deepEqual(out, []); // a 被反斜杠 ingested_from 匹配，不误判为未 ingest
});

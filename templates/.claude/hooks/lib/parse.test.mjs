// .claude/hooks/lib/parse.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFrontmatter, extractSourceMeta } from './parse.mjs';

test('parseFrontmatter 提取键值', () => {
  const md = '---\ntype: source\ntitle: X\nconfidence: 0.85\n---\n正文';
  assert.deepEqual(parseFrontmatter(md), { type: 'source', title: 'X', confidence: '0.85' });
});

test('parseFrontmatter 无 frontmatter 返回空对象', () => {
  assert.deepEqual(parseFrontmatter('纯正文无 fm'), {});
});

test('extractSourceMeta 取 ingested_from 与 raw_hash', () => {
  const md = '---\ntype: source\ningested_from: /raw/articles/a.md\nraw_hash: abc123\n---\n';
  assert.deepEqual(extractSourceMeta(md), { ingested_from: '/raw/articles/a.md', raw_hash: 'abc123' });
});

test('extractSourceMeta 缺字段返回 null', () => {
  const md = '---\ntype: source\n---\n';
  assert.deepEqual(extractSourceMeta(md), { ingested_from: null, raw_hash: null });
});

test('extractSourceMeta 在含 relations 嵌套块的 frontmatter 中仍正确（缩进行被跳过）', () => {
  const md = '---\ntype: source\nrelations:\n  - type: uses\n    target: /wiki/x.md\n    confidence: 0.9\ningested_from: /raw/articles/a.md\nraw_hash: abc123\n---\n';
  assert.deepEqual(extractSourceMeta(md), { ingested_from: '/raw/articles/a.md', raw_hash: 'abc123' });
});

test('parseFrontmatter 容忍 CRLF 行尾', () => {
  const md = '---\r\ntype: source\r\ningested_from: /raw/a.md\r\n---\r\n';
  assert.equal(parseFrontmatter(md).ingested_from, '/raw/a.md');
});

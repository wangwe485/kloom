// .claude/hooks/lib/format.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summarizeIndex, buildContext } from './format.mjs';

test('summarizeIndex 短目录原样返回', () => {
  const idx = '## Organizations\n* [A](/a.md) - x\n';
  assert.equal(summarizeIndex(idx), idx.trim());
});

test('summarizeIndex 超阈值降级为标题', () => {
  const long = '## Organizations\n' + '* [x](/x.md)\n'.repeat(200);
  const out = summarizeIndex(long);
  assert.ok(out.includes('## Organizations'));
  assert.ok(out.includes('完整见 wiki/index.md'));
  assert.ok(!out.includes('[x]'));
});

test('buildContext 组装四段并标注计数', () => {
  const out = buildContext({
    index: 'IDX', logTail: 'LOG',
    uningested: ['a.md'], drift: ['b.md'], unknown: [],
  });
  assert.ok(out.includes('Wiki 当前状态'));
  assert.ok(out.includes('IDX'));
  assert.ok(out.includes('LOG'));
  assert.ok(out.includes('未 ingest 的 raw（1 个）'));
  assert.ok(out.includes('a.md'));
  assert.ok(out.includes('raw drift'));
  assert.ok(out.includes('版本未知（缺 raw_hash'));
});

test('buildContext 超硬上限截断', () => {
  const out = buildContext({
    index: 'X'.repeat(5000), logTail: '',
    uningested: [], drift: [], unknown: [],
  });
  assert.ok(out.length <= 4100);
  assert.ok(out.includes('已截断'));
});

test('buildContext 行动项在超长截断时优先保留（段顺序）', () => {
  const out = buildContext({
    index: 'X'.repeat(5000), logTail: '',
    uningested: ['urgent-uningested.md'], drift: ['urgent-drift.md'], unknown: ['urgent-unknown.md'],
  });
  // 行动项前置：截断只伤尾部 index 段，三段行动项必须全部存活
  assert.ok(out.includes('urgent-uningested.md'), '未 ingest 段存活');
  assert.ok(out.includes('urgent-drift.md'), 'drift 段存活');
  assert.ok(out.includes('urgent-unknown.md'), '版本未知段存活');
  assert.ok(out.includes('已截断'));
  assert.ok(out.length <= 4100);
});

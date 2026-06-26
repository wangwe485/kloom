#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { collectRawFiles, collectSources } from './lib/collect.mjs';
import { detectUningested, detectDrift } from './lib/detect.mjs';
import { summarizeIndex, buildContext } from './lib/format.mjs';

function readStdin() {
  return new Promise(resolve => {
    if (process.stdin.isTTY) { resolve('{}'); return; }
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', c => { data += c; });
    process.stdin.on('end', () => resolve(data || '{}'));
  });
}

function tailEntries(text, n) {
  return text.split(/\r?\n/)
    .filter(l => l.trim().startsWith('*'))
    .filter(Boolean)
    .slice(-n)
    .join('\n');
}

function emit(additionalContext) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext },
  }));
}

async function main() {
  const payload = JSON.parse(await readStdin());
  if (payload.source === 'resume') { emit(''); return; }   // resume 不注入
  const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

  let index = '';
  try { index = summarizeIndex(readFileSync(join(projectDir, 'wiki/index.md'), 'utf8')); } catch {}
  let logTail = '';
  try { logTail = tailEntries(readFileSync(join(projectDir, 'log.md'), 'utf8'), 6); } catch {}

  const rawFiles = collectRawFiles(projectDir);
  const sources = collectSources(projectDir);
  const uningested = detectUningested(rawFiles, sources, projectDir);
  const { drift, unknown } = detectDrift(sources, projectDir);

  emit(buildContext({ index, logTail, uningested, drift, unknown }));
}

main().catch(e => {
  process.stderr.write('session-start hook error: ' + (e?.message || e) + '\n');
  emit('');          // 失败永不阻塞会话
  process.exit(0);
});

// .claude/hooks/lib/detect.mjs
import { execSync } from 'node:child_process';
import { relative, basename } from 'node:path';

// 归一化 bundle-relative 路径：去前导 / + 反斜杠转正斜杠
// 兼容手写 /raw/... 与 \raw\... 两种写法（detectUningested 与 detectDrift 共用，保证对称）
function normalizeRawPath(v) {
  return v.replace(/\\/g, '/').replace(/^\/+/, '');
}

function norm(p, projectDir) {
  return normalizeRawPath(relative(projectDir, p));
}

export function detectUningested(rawFiles, sources, projectDir) {
  const ingested = new Set(
    sources.map(s => s.ingested_from).filter(Boolean).map(normalizeRawPath)
  );
  return rawFiles
    .filter(f => !ingested.has(norm(f, projectDir)))
    .map(f => basename(f));
}

export function detectDrift(sources, projectDir) {
  const drift = [];
  const unknown = [];
  for (const s of sources) {
    if (!s.ingested_from) continue;
    if (!s.raw_hash) { unknown.push(basename(s.path)); continue; }
    const rel = normalizeRawPath(s.ingested_from);
    try {
      const current = execSync(`git hash-object "${rel}"`, { cwd: projectDir, encoding: 'utf8' }).trim();
      if (current !== s.raw_hash) drift.push(basename(s.path));
    } catch {
      // git 不可用或文件缺失 → 静默跳过
    }
  }
  return { drift, unknown };
}

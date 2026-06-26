// .claude/hooks/lib/format.mjs
export const MAX_CHARS = 4000;
const INDEX_FULL_THRESHOLD_LINES = 120;

export function summarizeIndex(indexContent) {
  const lines = indexContent.split(/\r?\n/);
  if (lines.length <= INDEX_FULL_THRESHOLD_LINES) return indexContent.trim();
  const headers = lines.filter(l => /^##\s/.test(l));
  return headers.join('\n') + '\n\n（目录较长，已省略条目；完整见 wiki/index.md）';
}

export function buildContext({ index, logTail, uningested, drift, unknown }) {
  const list = arr => (arr.length ? arr.join('\n') : '无');
  // 行动项前置：超长截断时只伤尾部的 index 导航段，行动项始终存活
  const text = [
    '## 📚 Wiki 当前状态（SessionStart 自动注入）',
    `### ⚠️ 未 ingest 的 raw（${uningested.length} 个）\n` + list(uningested),
    `### ⚠️ raw drift（被人改过，需 re-ingest）（${drift.length} 个）\n` + list(drift),
    `### 版本未知（缺 raw_hash，待补基线）（${unknown.length} 个）\n` + list(unknown),
    '### 近期动态（log.md 末尾 6 条）\n' + (logTail || '（文件不存在）'),
    '### 实体/概念目录（wiki/index.md）\n' + (index || '（文件不存在）'),
  ].join('\n\n');
  if (text.length > MAX_CHARS) {
    return text.slice(0, MAX_CHARS) + '\n\n…（已截断，完整见 wiki/index.md / log.md）';
  }
  return text;
}

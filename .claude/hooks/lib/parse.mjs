// .claude/hooks/lib/parse.mjs
export function parseFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (line.startsWith(' ') || line.startsWith('\t')) continue; // 跳过嵌套/列表行（如 relations 块），只取顶层 scalar
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2];
  }
  return out;
}

export function extractSourceMeta(content) {
  const fm = parseFrontmatter(content);
  return {
    ingested_from: fm.ingested_from ? fm.ingested_from.trim() : null,
    raw_hash: fm.raw_hash ? fm.raw_hash.trim() : null,
  };
}

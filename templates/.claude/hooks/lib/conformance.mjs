#!/usr/bin/env node
// .claude/hooks/lib/conformance.mjs
// OKF v0.1 conformance linter：扫描知识层每个 .md，要求合法 frontmatter + 非空 type。
// 复用 parse.mjs 的 parseFrontmatter，正确处理 type 值后的行内 # 注释。
// 用法：node .claude/hooks/lib/conformance.mjs [projectDir]   （默认当前目录）
// 退出码：0 = 全部合规；1 = 存在不合规文件。.claude/ 是工具配置，不计入。
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseFrontmatter } from './parse.mjs';

const SKIP_DIRS = new Set(['.claude', '.git', '.obsidian', 'node_modules']);

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (name.endsWith('.md')) acc.push(full);
  }
  return acc;
}

// 去掉 unquoted YAML 标量后的行内注释（" # ..."），再 trim
function cleanType(raw) {
  if (raw == null) return '';
  return String(raw).replace(/\s+#.*$/, '').replace(/^["']|["']$/g, '').trim();
}

function main() {
  const projectDir = process.argv[2] || process.cwd();
  const files = walk(projectDir).sort();
  const fails = [];
  const oks = [];
  for (const f of files) {
    const rel = relative(projectDir, f);
    const content = readFileSync(f, 'utf8');
    if (!content.startsWith('---')) { fails.push([rel, '缺 frontmatter']); continue; }
    const fm = parseFrontmatter(content);
    const type = cleanType(fm.type);
    if (!type) fails.push([rel, fm.type === undefined ? '缺 type' : 'type 为空']);
    else oks.push([rel, type]);
  }

  for (const [rel, type] of oks) console.log(`OK    type=${type.padEnd(14)} ${rel}`);
  for (const [rel, why] of fails) console.log(`FAIL  ${why.padEnd(18)} ${rel}`);
  console.log('----');
  if (fails.length === 0) {
    console.log(`OKF CONFORMANCE: PASS（${oks.length} 个知识 .md 均有非空 type）`);
    process.exit(0);
  } else {
    console.log(`OKF CONFORMANCE: FAIL（${fails.length} 个不合规 / 共 ${files.length}）`);
    process.exit(1);
  }
}

main();

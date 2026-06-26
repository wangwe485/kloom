---
description: 查询并显示 wiki 当前状态（待 ingest / drift / 近期动态 / 规模），主动提议下一步
---
查询并向用户**显示** wiki 当前状态（我主动执行本命令，要看状态）。流程：

1. 运行状态检测（复用 SessionStart hook 的检测逻辑，单一数据源）：

   ```bash
   echo '{"source":"startup"}' | CLAUDE_PROJECT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)" node .claude/hooks/session-start.mjs
   ```

   取输出 JSON 的 `hookSpecificOutput.additionalContext`，内含：未 ingest 的 raw、raw drift、版本未知、log 末尾 6 条、index 目录。

2. 向我简洁汇报（中文，表格/列表优先，**要显示出来**——这是我主动查的）：
   - ⚠️ **未 ingest 的 raw**：数量 + 文件名（这是最该行动的）
   - ⚠️ **raw drift**（被人改过需 re-ingest）：数量 + 文件名
   - **版本未知**（source 页缺 `raw_hash`）：数量
   - **近期动态**：log 末尾几条的一句话主题
   - **wiki 规模**：`Glob wiki/**/*.md` 数总数，并按 index 目录报实体/概念/source/synthesis 各多少

3. **主动提议下一步**：若未 ingest，建议从哪份开始（按重要性/体积）；若 drift，提示哪份需 re-ingest；若都无，说一句「wiki 状态最新，无待办」。

约束：只读不写；汇报必须显示给我（不要只注入上下文）。

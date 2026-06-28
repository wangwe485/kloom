---
description: 从模板新建一个 kloom 知识库并按主题定制
argument-hint: <新 wiki 路径> <主题描述>
---
从模板 `${CLAUDE_PLUGIN_ROOT}/templates` 复制骨架到 `$1` 指定路径，创建一个主题为 "$2..." 的新 kloom 知识库。

步骤：

1. **复制**：把 `${CLAUDE_PLUGIN_ROOT}/templates` 的全部内容复制到新路径 `$1`，**排除 `.git`、`.obsidian`、`.DS_Store`**。
2. **初始化 git**：在新路径 `git init`、设 `main` 分支；若用户无全局 `user.name`/`user.email`，设一个中性本地身份并在报告里提示用户改成自己的。
3. **按主题定制**（核心，发挥你的理解）：
   - `CLAUDE.md §2 领域 type`：根据主题生成 5–8 个实体 type（小写 kebab-case，带一行说明 + 示例），替换占位注释 `<!-- /init-wiki 在此插入... -->`
   - `CLAUDE.md §4 示例`：换成该主题的实体 frontmatter 示例
   - `CLAUDE.md` 引言、frontmatter description、`README.md`、根 `index.md`、`wiki/index.md` 的主题描述与分类标题
4. **统一时间戳**：把复制进实例的所有知识层 `.md`（根 `.md` + `wiki/**`）的 frontmatter `timestamp` 改成**今日**（ISO 8601），避免实例文件的日期早于实例自身的创建日。
5. **重置 `log.md`**：清空模板的历史条目（如模板创建记录），重写为只含新 wiki 的一条 `* **Initialization**: ...`（今日日期）—— 模板的 log 历史不应带入新 wiki。
6. **写 Obsidian 合规默认值**：在 `$1/.obsidian/app.json` 写入，让「不用 `[[ ]]` 双链」开箱即默认（OKF 合规）：
   ```json
   {
     "useMarkdownLinks": true,
     "newLinkFormat": "absolute",
     "attachmentFolderPath": "raw/assets"
   }
   ```
7. **OKF conformance 自检**：运行 `node .claude/hooks/lib/conformance.mjs $1`（退出码 0 = 全部知识 `.md` 有合法 frontmatter + 非空 `type`）。并扫一遍确认无残留 `{{占位}}` 或"通用模板/实例化"等模板态文案。
8. **首次提交**：`git -C $1 add -A && git -C $1 commit -m "init $2 wiki"`，让实例落地为一个干净的初始 commit（不留半初始化状态）。
9. 报告：新 wiki 路径、生成的领域 type 清单、自检结果（合规 + 首次 commit）、下一步（照生成的 `SETUP.md` 配 Obsidian + Claude Code + 首次 ingest）。

硬约束：
- **只写新路径 `$1`**，绝不修改模板源 `${CLAUDE_PLUGIN_ROOT}/templates`。
- 保留通用 type（concept/source/synthesis/playbook/schema/index）不变，只动领域 type。
- 所有新写/改写的 `timestamp` 用**今日真实日期**，不要照抄模板里的占位日期。

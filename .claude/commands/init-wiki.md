---
description: 从模板新建一个 LLM Wiki 并按主题定制
argument-hint: <新 wiki 路径> <主题描述>
---
从模板 `E:\ai\llm-wiki-template` 复制骨架到 `$1` 指定路径，创建一个主题为 "$2..." 的新 LLM Wiki。

步骤：

1. **复制**：把 `E:\ai\llm-wiki-template` 的全部内容复制到新路径 `$1`，**排除 `.git` 和 `.obsidian`**。
2. **初始化 git**：在新路径 `git init`、设 `main` 分支、设本地身份（若用户无全局身份）。
3. **按主题定制**（核心，发挥你的理解）：
   - `CLAUDE.md §2 领域 type`：根据主题生成 5–8 个实体 type（小写 kebab-case，带一行说明 + 示例），替换占位注释 `<!-- /init-wiki 在此插入... -->`
   - `CLAUDE.md §4 示例`：换成该主题的实体 frontmatter 示例
   - `CLAUDE.md` 引言、frontmatter description、`README.md`、根 `index.md`、`wiki/index.md` 的主题描述与分类标题
4. `log.md` 记一条 `* **Initialization**: 从 llm-wiki-template 实例化 <主题> wiki`（今日日期）。
5. **OKF conformance 自检**：确认新 wiki 每个 `.md` 有合法 frontmatter + 非空 `type`。
6. 报告：新 wiki 路径、生成的领域 type 清单、下一步（照 `SETUP.md` 配 Obsidian + Claude Code + 首次 ingest）。

硬约束：
- **只写新路径 `$1`**，绝不修改模板源 `E:\ai\llm-wiki-template`。
- 保留通用 type（concept/source/synthesis/playbook/schema/index）不变，只动领域 type。

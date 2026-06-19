# 第一部分 AI编程概述

1个token大约等于4个英文字符或1-2个中文字符；1000 tokens大约等于750个英文单词或500个中文单词。

上下文窗口：AI的工作记忆

AI生成内容的本质是预测概率最高的下一个词。
大多数时候它预测得很准，但有时会出现幻觉（hallucination），即生成不准确或虚假的信息。
“信任但验证”是AI编程的黄金法则。

SDD:规范驱动开发（Specification-Driven Development）是一种以规范为中心的软件开发方法。它强调在编码之前先定义清晰的规范和需求，以确保开发过程的高效和准确。

一个智能体的工作循环是：感知->推理->行动->反馈

## 国产大模型旗舰

### GLM系列

### DeepSeek 系列

极致的性价比，适合个人开发者和小型团队。

# 第二部分 AI编程工具生态

L5 自主工程-端到端自主完成项目（探索中）
L4 项目管理-多Agent协同、任务分解（Qoder）
L3 任务执行-自主修改文件、运行命令（Claude Code、Cursor Agent）

Agentic Search:像人一样按需读取代码库，理解上下文，执行任务。
不需要像传统RAG检索一样，预先嵌入整个代码库为向量，查询时按相似度拼凑。Agent可以直接访问代码库，按需读取相关文件（传给模型服务），理解上下文，执行任务。

Claude Code的工程化能力抽象成7个扩展点：

1. CLAUDE.md 项目上下文文件
2. Hooks 会话生命周期钩子
3. Skills 按需加载的专业知识包
4. Plugins Skills+Hooks+MCP 打包分发
5. LSP(语言服务器)给AI装上IDE导航能力
6. MCP Servers 接入外部工具与数据源
7. Subagents(子代理) 独立上下文窗口去调研/执行

codex对多模态处理更优秀，能处理文本、代码、图像等多种输入输出形式。

## 中转站

OpenRouter,CloseAI  (跟原厂相比有较高溢价，不推荐)

## vscode的claude插件

需要先配置好apiKey，才能使用(可以使用cc switch做好配置)。安装后可以在vscode中直接与Claude进行交互，执行代码修改、运行命令等操作。

# 第三部分 Claude Code深度使用与进阶技巧

## 7层扩展（Harness）

1. CLAUDE.md 项目上下文文件：用来提供项目的背景信息、已完成的工作、待办事项等，帮助Claude更好地理解项目状态和需求。
2. Hooks 会话生命周期钩子：在Claude的会话生命周期中，可以设置不同的钩子函数，在特定的时间点执行自定义的操作，如会话开始、结束、错误发生等。
3. Skills 按需加载的专业知识包：可以将特定领域的知识和技能打包成Skills，按需加载到Claude中，增强其在特定任务上的表现。
4. Plugins Skills+Hooks+MCP 打包分发：将Skills、Hooks和MCP服务器打包成插件，方便分发和复用。
5. LSP(语言服务器)给AI装上IDE导航能力：通过接入语言服务器协议（LSP），可以让Claude具备IDE的导航能力，如代码补全、跳转定义、查看文档等功能。
6. MCP Servers 接入外部工具与数据源：通过MCP服务器，可以让Claude接入各种外部工具和数据源，扩展其功能和应用场景。
7. Subagents(子代理) 独立上下文窗口去调研/执行：可以创建独立的子代理，拥有自己的上下文窗口，用于特定的调研或执行任务，避免干扰主代理的上下文。

前3层是基础配置，后4层是高级扩展。

项目/.claude/settings.local.json 配置为当前项目个人私有，不要提交到git仓库

Claude Code 的配置文件位于 `~/.claude/settings.json`（全局）或项目目录下的 `.claude/settings.json`（项目级）。

常用配置项
{
// 允许 Claude Code 执行的操作（不再需要每次确认）
"permissions": {
"allow": [
"Read", // 读取文件
"Write", // 写入文件
"Bash(npm *)", // 执行 npm 命令
"Bash(git *)", // 执行 git 命令
"Bash(node *)"   // 执行 node 命令
],
"deny": [
"Bash(rm -rf *)" // 禁止执行危险的删除命令
]
},
// 默认使用的模型
"model": "sonnet",
// 自动紧凑阈值（上下文使用超过此比例时自动压缩）
"autoCompactThreshold": 80
}

## CLAUDE.md文件

### 文件内容

红线操作：
以下操作即使在auto-accept模式下也必须先问我：

- 删除文件、目录或git历史
- 修改.env、密钥、token、证书、CI/CD配置
- git push, git rebase, git reset --hard、强制推送
- 公开发布（npm publish、生产部署等）

### 相关命令

/init 生成CLAUDE.md文件，包含项目背景、已完成工作、待办事项等信息，帮助Claude更好地理解项目状态和需求。

/memory 编辑全局级：在cc会话里输入/memory 选择“全局CLAUDE.md”,会用默认编辑器打开该文件供你修改。修改全局后需重启CC才生效。

Auto-memory:可以关闭

## 卡帕西的md文档

## 三层记忆

/memory 命令可以看到

第一层记忆：Claude.md（项目上下文文件）
第二层记忆：Auto Memory（cc 自己的笔记本）
第三层记忆：自建参考文档（渐进式披露）cc遇到对应任务才读
例如：

- 修改前端视觉，调颜色->必读`docs/brand-visual.md`
- 写API、定义返回格式时->必读`docs/api-design.md`

## claudeignore文件

指定Claude Code在执行操作时应忽略的文件或目录，类似于.gitignore。可以用来避免Claude修改不相关或敏感的文件。

## 斜杠命令

/add-dir <项目地址>：添加项目目录，claude会分析项目结构和文件内容，构建知识库。

/init 初始化项目的记忆文档，claude会根据项目文件内容生成记忆文档，记录项目的结构、功能、依赖等信息。

/clear 清除项目的记忆文档，重新初始化项目的记忆文档。
`宁可多/clear几次重新介绍背景，也不要一直聊一直聊。每个/clear都是给AI一次重新聚焦的机会。`

/compact 压缩对话内容，保留重要信息，删除冗余内容，减少对话历史的长度。（解决AI用久了变笨的问题）

/memory 编辑会话记忆文件，claude会根据记忆文件的内容调整对话的上下文和回答的内容。

/status 查看会话状态，包括当前使用的模型、对话历史长度、记忆文档的状态等信息。

/cost 令牌消耗统计，查看当前会话的令牌消耗情况，包括输入令牌、输出令牌、总令牌等信息。

/config 查看并修改配置文件

/model 查看可用模型列表，选择使用的模型。

/context 查看当前上下文窗口的内容，包括对话历史、记忆文等信息。

/review 对当前项目进行代码审查（当前与上次提交的差异代码审查）

/plan 切入Plan Mode(只读规划模式，无法修改代码)，在该模式下可以让Claude专注于规划和设计，而不涉及具体的代码修改。

/rewind 回滚cc之前的修改（后悔药）

/resume 选择历史会话恢复（上次话题还没聊完）

/btw 主任务进行中想问个无关问题（顺便问一句）

扩展管理命令

/skill <名称> 直接调用某个skill
/agent 创建，查看，调用子代理（SubAgent）
/plugin 管理插件（安装、卸载、查看已安装插件等）
/simplify 派3个子Agent从代码质量、性能、复用性三个角度优化
/login 使用Claude官方订阅会员登录

! 进入Bash模式，直接执行命令行指令
@文件/目录，给cc精准上下文

反直觉小冗识：你给cc的指令越短，它反而可能花更多的token--因为它需要更多费力探索项目才能猜到你想要什么。

## 三种启动参数

claude #默认启动
claude -c # =--continue,启动时直接接上次会话
claude -permission-mode plan # 启动后直接进 Plan Mode
claude --dangerously-skip-permissions #危险模式：一路路灯不问任何确认

## 官方推荐工作流

explore（探索）->plan（规划,评估边界情况）->implement（实现）->commit（提交）

## 大型代码库最佳实践

1. 用/init 自动生成CLAUDE.md(项目初始化)
2. 任务粒度要小且聚焦（避免万能prompt）
3. 频繁重置上下文（/clear 是好朋友）
4. 复杂任务从Plan Mode起手（权限控制）
5. 用Skills与Subagents卸载长任务
   例如将高频调研流程封装成Skill,每次一键触发
6. 接入MCP/LSP(给AI装上团队协作工作)

## 三个容易被忽视的官方进阶建议

1. 在子目录初始化Claude,别从仓库根目录开始；
2. 配置要定期审查（每3-6个月）
3. 团队内应该有个“人”负责Claude Code(DRI/Agent Manager)

## 自定义斜杠命令

在项目根目录创建 .claude/commands/目录 文件，然后添加Markdown文件，例如
.claude/commands/deploy.md，再增加md文档内容

# codex

先检查，再说明；确认后，再执行。

### 安装软件

帮我安装Hermes。请优先查看官方文档，确认安装步骤和系统要求。安装完成后验证版本，并告诉我启动方式。

### 上下文管理

请把当前项目进展，已修改文件，未完成事项和下一步建议压缩成一份简短摘要。

### 持久记忆与agents.md

codex的持久记忆可以分为两类：一类是你主动写下来的规则，另一类是系统自动总结的记忆。最值得掌握的是agents.md

自动自己适合作为补充，不适合作为唯一依赖。

### 计划模式与实战开发

执行中及时纠偏；使用fork保留好上下文；预览与批注

### 插件系统

mcp服务器：魔搭平台 https://www.modelscope.cn/mcp

### 自动化任务

每周一汇总github趋势项目，生成中文推荐稿

### 手机端远程控制

### 总结

AI模型都有幻觉，要设置边界，不能完全依赖；需要人类的监督和判断；工具和插件可以提高效率，但也要注意安全和隐私；持续学习和适应是关键。
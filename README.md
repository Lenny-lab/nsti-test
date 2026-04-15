# NSTI

NSTI（NNU Student Type Indicator）是一个面向南京师范大学校园场景的静态测评网站。

它用南师大的学习、通勤、协作与社交场景组织题面，输出 4 组偏好、16 类校园结果卡与对应的场景化建议。项目定位是“校园偏好画像工具”，适合自我理解、社团破冰和协作讨论，不用于心理诊断、能力评定或筛选。

## 当前版本

- 题量：24 题
- 结构：4 组偏好 / 16 类结果
- 形式：纯前端静态站点，无账号、无后端、无数据库
- 入口页面：[index.html](index.html)

## 本地预览

可以直接打开 [index.html](index.html)，它会跳转到 [app/index.html](app/index.html)。

如果你想用本地静态服务器预览：

```bash
python -m http.server 5173
```

然后访问 `http://localhost:5173/`

## Vercel 部署

这个仓库已经整理成可以直接托管静态站点的结构，适合“GitHub 仓库导入 Vercel 一键部署”：

1. 把当前项目推到 GitHub
2. 在 Vercel 中选择 `Add New Project`
3. 导入这个 GitHub 仓库
4. Framework Preset 选择 `Other`
5. `Build Command`、`Output Directory`、`Install Command` 都保持为空
6. 点击 `Deploy`

部署后，站点根路径会通过根目录的 [index.html](index.html) 自动跳转到 [app/index.html](app/index.html)

## 仓库结构

- [app](app)：线上实际运行的页面、样式和前端脚本
- [docs](docs)：设计说明、评价说明、隐私口径与开发说明
- [data/source](data/source)：当前保留的正式题库源文件
- [data/raw](data/raw)：公开资料抓取与研究归档
- [data/seeds](data/seeds)：题库采集种子与来源目录
- [scripts](scripts)：仍保留的辅助脚本

## 当前维护口径

- 网页运行时数据：[app/question-bank.js](app/question-bank.js)
- 正式题库源：[data/source/nsti_question_bank.csv](data/source/nsti_question_bank.csv)
- 正式结果类型源：[data/source/type_library.json](data/source/type_library.json)
- 主页面逻辑：[app/nsti-v2.js](app/nsti-v2.js)
- 首页与题目页样式：[app/styles.css](app/styles.css)
- 说明页与图鉴页样式：[app/docs-ui.css](app/docs-ui.css)

## 文档入口

- 背景说明：[docs/background.md](docs/background.md)
- 整体设计构想：[docs/design-concept.md](docs/design-concept.md)
- 题库说明：[docs/question-bank.md](docs/question-bank.md)
- 评价体系：[docs/evaluation-system.md](docs/evaluation-system.md)
- 隐私与免责声明：[docs/privacy.md](docs/privacy.md)
- 开发与部署：[docs/dev.md](docs/dev.md)
- 后续清单：[docs/roadmap.md](docs/roadmap.md)
- 公开资料调研：[docs/web-research.md](docs/web-research.md)
- 题库采集流程：[docs/data-collection-workflow.md](docs/data-collection-workflow.md)

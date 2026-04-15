# NSTI 开发与部署说明

## 1. 项目形态

NSTI 当前是一个纯静态网站：

- 没有后端服务
- 没有数据库
- 没有账号系统
- 所有结果都在浏览器端即时计算

线上运行时真正需要的只有 [app](../app) 目录和根目录的 [index.html](../index.html)

## 2. 本地运行

### 直接打开

直接打开根目录的 [index.html](../index.html) 即可，它就是网站正式首页

### 本地静态服务器

如果要避免浏览器本地文件权限差异，推荐用静态服务器：

```bash
python -m http.server 5173
```

访问 `http://localhost:5173/`

## 3. 线上部署

### GitHub + Vercel

当前仓库已经适合直接导入 Vercel：

1. 将仓库推到 GitHub
2. 在 Vercel 中导入该仓库
3. Framework Preset 选择 `Other`
4. `Build Command`、`Output Directory`、`Install Command` 保持为空
5. 直接部署

### 为什么不需要构建

- 页面是原生 HTML + CSS + JavaScript
- 不依赖 Node 构建流程
- 不依赖打包器
- 不依赖服务端渲染

## 4. 当前代码结构

- [index.html](../index.html)：首页、测评页、结果页主入口
- [app/question-bank.html](../app/question-bank.html)：题库说明页
- [app/evaluation-system.html](../app/evaluation-system.html)：评价体系页
- [app/privacy.html](../app/privacy.html)：隐私与免责声明页
- [app/type-gallery.html](../app/type-gallery.html)：16 类结果图鉴页
- [app/question-bank.js](../app/question-bank.js)：当前网页实际使用的题库与结果类型库
- [app/nsti-v2.js](../app/nsti-v2.js)：答题、计分、结果生成逻辑
- [app/styles.css](../app/styles.css)：首页、测评页、结果页样式
- [app/docs-ui.css](../app/docs-ui.css)：说明页与图鉴页通用样式

## 5. 内容维护

当前建议把下面三份文件视为主要维护对象：

- 题库源文件：[data/source/nsti_question_bank.csv](../data/source/nsti_question_bank.csv)
- 结果类型源文件：[data/source/type_library.json](../data/source/type_library.json)
- 网页运行数据：[app/question-bank.js](../app/question-bank.js)

如果以后继续迭代题库，建议先改 CSV，再同步网页端数据，避免出现多份内容互相冲突

## 6. 仓库清理策略

为了适合公开托管和后续维护，仓库已经做了这些约束：

- 删除了旧原型脚本和中间生成文件
- 把根目录的临时脚本和重复数据清掉
- 保留研究资料，但通过忽略规则避免它们进入部署产物
- 使用 [.gitignore](../.gitignore) 和 [.vercelignore](../.vercelignore) 控制本地与部署环境

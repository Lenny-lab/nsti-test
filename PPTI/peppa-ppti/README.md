# Peppa Pig Ti

一个可以直接部署的静态网页项目，主题是“小猪佩奇角色人格测试”。

现在这套项目已经不是单纯的数据浏览页，而是完整闭环：

1. 抓取 `Peppa Pig Wiki` 与 `BuzzFeed` 的公开页面。
2. 清洗角色资料，提取性格标签，构建角色维度向量。
3. 输出一套完整站点数据包。
4. 生成可直接上线的 `dist/` 静态目录。
5. 提供首页、题目流程、结果页、角色库四部分体验。

## 项目结构

```text
peppa-ppti/
  data/
    raw/                 # 抓到的原始 HTML 缓存
    processed/           # 数据产物
  dist/                  # 可直接部署的静态站点
  scripts/
    build_dataset.py     # 一键构建数据 + 站点
  src/ppti/
    pipeline.py          # 抓取、清洗、打包、导出
  web/                   # 站点源码模板
  package.json
  vercel.json
```

## 安装

```bash
pip install -r requirements.txt
```

## 构建

```bash
python scripts/build_dataset.py
```

或：

```bash
npm run build
```

构建完成后会更新这些内容：

- `data/processed/ppti_dataset.json`
- `data/processed/ppti_dataset.js`
- `dist/index.html`
- `dist/assets/app.js`
- `dist/assets/styles.css`
- `dist/assets/ppti-data.js`

## 本地预览

```bash
npm run start
```

然后访问：

- `http://127.0.0.1:4173`

## 数据内容

站点数据里已经包含：

- 角色基础资料
- 角色性格摘要
- 提炼后的 traits 标签
- 结果候选角色向量
- 四维评价体系
- 可直接运行的题库
- 结果页所需的匹配信息

## 当前评价维度

- `火花值`：慢热稳稳派 / 高能点火派
- `互动感`：边界清晰派 / 照顾气氛派
- `做事轴`：即兴跳步派 / 稳妥靠谱派
- `主导力`：观察蓄势派 / 直接带队派

## 说明

BuzzFeed 页面里虽然抓到了结果映射，但题目正文几乎为空，所以当前正式测试题库使用的是项目内自定义的维度题库，而不是直接复用 BuzzFeed 原题。

这套结构已经适合继续往下扩展：

- 接入更多题目
- 增加更多角色权重规则
- 加入后端统计或用户提交
- 拆成前后端项目

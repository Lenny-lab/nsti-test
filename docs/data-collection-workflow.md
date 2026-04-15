# 题库采集工作流

## 目标

把公开可见的 MBTI / STi / 校园人格测试题目线索整理成后续可复用的数据资产，而不是一次性爬完就散掉。

当前工作流分成 4 层：

1. `data/seeds/source_catalog.csv`
   维护来源目录，区分公开可抓取页面与受限平台搜索入口。
2. `data/raw/html/`
   保存抓取到的原始 HTML 快照，方便复查。
3. `data/raw/question_bank_public.csv`
   保存抽取后的题目级数据。
4. 后续可再增加 `data/processed/`
   用于去重、聚类、改写成 NSTI 候选题库。

## CSV 字段建议

### source_catalog.csv

- `source_id`：来源唯一 ID
- `platform`：平台
- `source_type`：测试页 / 文章 / 搜索入口 / 参考页
- `title`：标题
- `url`：页面 URL
- `fetch_mode`：`public_html` 或 `manual_search`
- `access_level`：`public` / `restricted`
- `question_style`：`forced_choice_ab` / `likert_5` / `likert_7` / `reference` / `unknown`
- `topic`：MBTI、校园版、学习风格等
- `status`：来源状态
- `notes`：备注

### question_bank_public.csv

- `source_id`
- `platform`
- `title`
- `url`
- `question_number`
- `part`
- `question_type`
- `stem`
- `option_a`
- `option_b`
- `scale_hint`
- `raw_excerpt`

## 平台分层策略

### A. 公开网页层

优先抓：

- 公开问卷页
- 公开测试页
- 纯前端测试站点
- 能直接拿到题目文本的文章页

这类页面最适合先做自动化抽取。

### B. 受限平台线索层

包括：

- 小红书
- 微博
- 微信公众号

这类来源通常存在几个问题：

- 登录态
- 图片化内容
- 搜索结果不稳定
- 前端动态渲染
- 平台规则与反爬限制

因此更适合：

- 先保存搜索入口和人工筛选链接
- 再做浏览器自动化、截图保存或 OCR
- 只抽取题目文本，不碰用户评论、互动数据和个人信息

## 采集时的边界

- 只处理公开可访问页面。
- 只保留题目、选项、来源信息，不保留用户作答记录。
- 不采集个人手机号、微信号、院系班级等表单字段。
- 对同题异表述做去重，保留来源链路，便于后续改写成 NSTI 自有题库。

## 推荐使用方式

1. 先维护 `source_catalog.csv`，不断补种子。
2. 跑 `scripts/collect_public_question_bank.py`，先把公开网页题库落到 CSV。
3. 用抽取结果做一次去重和主题聚类。
4. 再从聚类结果里改写出“南师大场景化”候选题。

## 当前脚本覆盖范围

当前脚本优先支持：

- 问卷星公开页
- 通用 HTML 文本抽取

对以下来源先做目录化，不强行自动抓题：

- 小红书搜索页
- 微博搜索页
- 微信搜索入口

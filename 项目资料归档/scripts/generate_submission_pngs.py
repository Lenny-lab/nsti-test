from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "竞赛提交" / "NSTI应用案例提交材料" / "配图"

BG = "#F6FBF8"
CARD = "#FFFFFF"
CARD_BORDER = "#D8E7DF"
ACCENT = "#2B7A67"
ACCENT_LIGHT = "#EAF4F0"
TEXT = "#153731"
SUBTEXT = "#4A6D63"
GRID = "#E9F2EE"

FONT_REG = r"C:\Windows\Fonts\msyh.ttc"
FONT_BOLD = r"C:\Windows\Fonts\msyhbd.ttc"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def rounded_card(draw: ImageDraw.ImageDraw, box, radius=28, fill=CARD, outline=CARD_BORDER, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def center_text(draw, xy, text, fnt, fill=TEXT):
    bbox = draw.textbbox((0, 0), text, font=fnt)
    x = xy[0] - (bbox[2] - bbox[0]) / 2
    y = xy[1] - (bbox[3] - bbox[1]) / 2
    draw.text((x, y), text, font=fnt, fill=fill)


def wrap_text(draw, text, fnt, max_width):
    lines = []
    for raw in text.split("\n"):
        if not raw:
            lines.append("")
            continue
        line = ""
        for ch in raw:
            test = line + ch
            width = draw.textbbox((0, 0), test, font=fnt)[2]
            if width <= max_width or not line:
                line = test
            else:
                lines.append(line)
                line = ch
        if line:
            lines.append(line)
    return lines


def draw_wrapped(draw, xy, text, fnt, max_width, fill=TEXT, line_gap=10):
    lines = wrap_text(draw, text, fnt, max_width)
    _, _, _, line_h = draw.textbbox((0, 0), "南师", font=fnt)
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += line_h + line_gap
    return y


def arrow(draw, start, end, fill=ACCENT, width=6, head=14):
    draw.line([start, end], fill=fill, width=width)
    x1, y1 = start
    x2, y2 = end
    if x2 == x1 and y2 == y1:
        return
    import math
    angle = math.atan2(y2 - y1, x2 - x1)
    left = (
        x2 - head * math.cos(angle) - head * 0.55 * math.sin(angle),
        y2 - head * math.sin(angle) + head * 0.55 * math.cos(angle),
    )
    right = (
        x2 - head * math.cos(angle) + head * 0.55 * math.sin(angle),
        y2 - head * math.sin(angle) - head * 0.55 * math.cos(angle),
    )
    draw.polygon([end, left, right], fill=fill)


def canvas(size):
    img = Image.new("RGB", size, BG)
    draw = ImageDraw.Draw(img)
    return img, draw


def draw_header(draw, title, subtitle, width):
    draw.text((90, 70), title, font=font(FONT_BOLD, 40), fill=TEXT)
    draw.text((90, 128), subtitle, font=font(FONT_REG, 20), fill=SUBTEXT)
    draw.line((90, 170, width - 90, 170), fill=GRID, width=3)


def step_card(draw, x, y, w, h, idx, title, bullets):
    rounded_card(draw, (x, y, x + w, y + h), radius=28)
    draw.ellipse((x + 26, y + 22, x + 78, y + 74), fill=ACCENT)
    center_text(draw, (x + 52, y + 48), str(idx), font(FONT_BOLD, 22), fill="#FFFFFF")
    draw.text((x + 96, y + 34), title, font=font(FONT_BOLD, 25), fill=TEXT)
    yy = y + 88
    bullet_font = font(FONT_REG, 18)
    for bullet in bullets:
        draw.ellipse((x + 34, yy + 8, x + 42, yy + 16), fill=ACCENT)
        yy = draw_wrapped(draw, (x + 54, yy), bullet, bullet_font, w - 80, fill=SUBTEXT, line_gap=8) + 10


def panel(draw, x, y, w, h, tag, title, sections):
    rounded_card(draw, (x, y, x + w, y + h), radius=30)
    draw.ellipse((x + 28, y + 28, x + 80, y + 80), fill=ACCENT)
    center_text(draw, (x + 54, y + 54), tag, font(FONT_BOLD, 22), fill="#FFFFFF")
    draw.text((x + 100, y + 38), title, font=font(FONT_BOLD, 28), fill=TEXT)
    yy = y + 110
    for section_title, items in sections:
        draw.text((x + 40, yy), section_title, font=font(FONT_BOLD, 22), fill=ACCENT)
        yy += 42
        for item in items:
            draw.ellipse((x + 44, yy + 10, x + 52, yy + 18), fill=ACCENT)
            yy = draw_wrapped(draw, (x + 68, yy), item, font(FONT_REG, 18), w - 100, fill=SUBTEXT, line_gap=7) + 12
        yy += 10


def fig1():
    img, draw = canvas((1800, 1020))
    draw_header(draw, "NSTI 项目中 AI 工具的全过程应用", "从问题提出、题库构建到网页实现与部署交付，形成完整学习实践闭环", 1800)
    top_y = 235
    card_w, card_h = 325, 205
    xs = [90, 520, 950, 1380]
    steps_top = [
        ("问题提出", ["明确项目主题", "界定任务边界", "确定校园化方向"]),
        ("前期调研", ["梳理 MBTI / STI 逻辑", "提炼可借鉴结构", "形成 NSTI 基础框架"]),
        ("题库设计", ["搜集公开题目样本", "改写为南师大场景", "人工多轮复核定稿"]),
        ("评价体系", ["提炼四组偏好维度", "构建 16 类结果卡", "生成场景化解释文案"]),
    ]
    for i, (title, bullets) in enumerate(steps_top, start=1):
        step_card(draw, xs[i - 1], top_y, card_w, card_h, i, title, bullets)
    for i in range(3):
        arrow(draw, (xs[i] + card_w, top_y + 102), (xs[i + 1] - 18, top_y + 102))

    bottom_y = 545
    bottom_xs = [305, 765, 1225]
    bottom_w, bottom_h = 365, 220
    steps_bottom = [
        ("前端实现", ["首页、题目页、结果页", "说明页、图鉴页与随园页", "桌面端与移动端适配"]),
        ("功能迭代", ["地图与天气接入", "访问统计与结构整理", "整体风格统一与文案打磨"]),
        ("部署交付", ["GitHub 仓库整理", "Vercel 部署与域名接入", "竞赛提交材料生成"]),
    ]
    for i, (title, bullets) in enumerate(steps_bottom, start=5):
        step_card(draw, bottom_xs[i - 5], bottom_y, bottom_w, bottom_h, i, title, bullets)
    arrow(draw, (1542, top_y + card_h), (1410, bottom_y - 18))
    arrow(draw, (1225, bottom_y + 110), (1130, bottom_y + 110))
    arrow(draw, (765, bottom_y + 110), (670, bottom_y + 110))

    info_box = (90, 830, 1710, 948)
    rounded_card(draw, info_box, radius=24, fill=ACCENT_LIGHT, outline="#D3E6DD")
    draw.text((120, 865), "AI 在各阶段的主要作用", font=font(FONT_BOLD, 24), fill=ACCENT)
    draw.text((120, 905), "需求拆解、资料整理、题目改写、代码实现、风格优化、部署辅助、材料整理", font=font(FONT_REG, 20), fill=SUBTEXT)

    img.save(OUT_DIR / "图1_AI应用全过程.png", "PNG")


def fig2():
    img, draw = canvas((1800, 1080))
    draw_header(draw, "NSTI 项目系统结构示意", "围绕“校园偏好画像”构建题库、评价体系、结果输出与网页展示", 1800)

    panels = [
        ("A", "题库结构", [
            ("正式题库", ["共 24 题", "按“这学期的我”作答", "单题 4 选 1", "围绕南师大真实校园场景展开"]),
            ("构建方式", ["公开题库逻辑参考", "校园语境重写", "多轮人工复核与校正"]),
            ("典型场景", ["随园、仙林、图书馆、起霞坡、月亮湾", "小白与大黄校车、社团招新、小组协作"]),
        ]),
        ("B", "评价体系", [
            ("四组偏好维度", ["能量补给", "观察视角", "逻辑基准", "生活步调"]),
            ("结果形式", ["16 类校园结果卡", "地标命名 + 场景化解释", "适配场景 + 协作提醒 + 学习建议"]),
            ("使用边界", ["非诊断工具", "不用于能力评定与筛选场景"]),
        ]),
        ("C", "网页成果", [
            ("核心页面", ["首页", "题目页", "结果页", "结果图鉴页"]),
            ("说明页面", ["题库说明", "评价体系", "隐私与免责声明", "关于随园"]),
            ("上线交付", ["GitHub 仓库", "Vercel 部署", "自定义域名访问"]),
        ]),
    ]
    x_positions = [90, 620, 1150]
    for x, (tag, title, sections) in zip(x_positions, panels):
        panel(draw, x, 220, 470, 720, tag, title, sections)

    arrow(draw, (560, 590), (610, 590))
    arrow(draw, (1090, 590), (1140, 590))

    img.save(OUT_DIR / "图2_NSTI系统结构.png", "PNG")


def fig3():
    img, draw = canvas((1800, 1020))
    draw_header(draw, "NSTI 项目中的人机协同分工", "AI 负责加速与生成，人工负责判断、筛选、校正与最终定稿", 1800)

    left_box = (100, 230, 635, 830)
    right_box = (1165, 230, 1700, 830)
    rounded_card(draw, left_box, radius=32)
    rounded_card(draw, right_box, radius=32)

    draw.text((150, 290), "AI 工具主要承担", font=font(FONT_BOLD, 32), fill=TEXT)
    ai_items = [
        "需求拆解与结构梳理",
        "调研资料归纳与信息整理",
        "题目改写候选与文案润色",
        "页面代码生成与逻辑补全",
        "样式优化与多轮快速迭代",
        "部署结构整理与材料辅助撰写",
    ]
    yy = 360
    for idx, item in enumerate(ai_items, start=1):
        draw.ellipse((155, yy + 5, 185, yy + 35), fill=ACCENT)
        center_text(draw, (170, yy + 20), str(idx), font(FONT_BOLD, 16), fill="#FFFFFF")
        yy = draw_wrapped(draw, (205, yy), item, font(FONT_REG, 22), 380, fill=SUBTEXT, line_gap=10) + 20

    draw.text((1215, 290), "人工主要承担", font=font(FONT_BOLD, 32), fill=TEXT)
    human_items = [
        "确定选题与项目价值",
        "判断校园场景是否真实贴切",
        "筛选题目并消除“AI 味”表达",
        "决定维度、命名与结果口径",
        "控制隐私、免责声明与使用边界",
        "验收页面效果并完成最终定稿",
    ]
    yy = 360
    for idx, item in enumerate(human_items, start=1):
        draw.ellipse((1220, yy + 5, 1250, yy + 35), fill=ACCENT)
        center_text(draw, (1235, yy + 20), str(idx), font(FONT_BOLD, 16), fill="#FFFFFF")
        yy = draw_wrapped(draw, (1270, yy), item, font(FONT_REG, 22), 380, fill=SUBTEXT, line_gap=10) + 20

    draw.ellipse((715, 370, 1085, 740), fill=ACCENT, outline=ACCENT, width=4)
    center_text(draw, (900, 500), "项目成果", font(FONT_BOLD, 38), fill="#FFFFFF")
    center_text(draw, (900, 558), "由人主导完成", font(FONT_BOLD, 32), fill="#FFFFFF")

    arrow(draw, (635, 555), (715, 555))
    arrow(draw, (1085, 555), (1165, 555))

    note = (340, 872, 1460, 956)
    rounded_card(draw, note, radius=22, fill=ACCENT_LIGHT, outline="#D3E6DD")
    center_text(draw, (900, 914), "本项目采用的是“人提出问题—AI 提供候选—人完成判断与修正”的协同模式", font(FONT_REG, 22), fill=SUBTEXT)

    img.save(OUT_DIR / "图3_人机协同分工.png", "PNG")


def pill(draw, box, text, fill=ACCENT_LIGHT, outline="#D3E6DD", text_fill=ACCENT, size=18):
    draw.rounded_rectangle(box, radius=(box[3] - box[1]) // 2, fill=fill, outline=outline, width=2)
    center_text(draw, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), text, font(FONT_BOLD, size), fill=text_fill)


def mini_metric(draw, x, y, label, value):
    rounded_card(draw, (x, y, x + 245, y + 112), radius=22, fill="#FFFFFF", outline="#D9E9E1")
    draw.text((x + 28, y + 24), value, font=font(FONT_BOLD, 34), fill=ACCENT)
    draw.text((x + 28, y + 72), label, font=font(FONT_REG, 18), fill=SUBTEXT)


def fig4():
    img, draw = canvas((1920, 1080))
    draw_header(draw, "NSTI 项目概述图", "以南京师范大学校园生活为语境，用 AI 辅助完成测评工具的设计、开发与交付", 1920)

    center = (735, 285, 1185, 735)
    draw.ellipse(center, fill=ACCENT, outline="#1D5E4F", width=5)
    center_text(draw, (960, 430), "NSTI", font(FONT_BOLD, 64), fill="#FFFFFF")
    center_text(draw, (960, 498), "校园偏好测评工具", font(FONT_BOLD, 30), fill="#FFFFFF")
    center_text(draw, (960, 555), "NNU Student Type Indicator", font(FONT_REG, 22), fill="#E7F5EF")

    blocks = [
        (120, 245, 560, 470, "校园语境", ["随园 / 仙林 / 图书馆 / 月亮湾", "校车、社团、小组协作等日常场景", "把抽象人格表达转化为校园生活语言"]),
        (1360, 245, 1800, 470, "测评内容", ["24 道正式题目", "4 组偏好维度", "16 类校园结果卡"]),
        (120, 610, 560, 835, "AI 辅助", ["ChatGPT：文案与结构化整理", "Trae：前端代码与交互草稿", "Codex：仓库级修改与材料整理"]),
        (1360, 610, 1800, 835, "最终成果", ["可访问的静态网页", "完整说明文档与材料清单", "可复盘的人机协同案例"]),
    ]
    for x1, y1, x2, y2, title, items in blocks:
        rounded_card(draw, (x1, y1, x2, y2), radius=30, fill="#FFFFFF", outline="#D8E7DF")
        draw.text((x1 + 36, y1 + 30), title, font=font(FONT_BOLD, 30), fill=TEXT)
        yy = y1 + 88
        for item in items:
            draw.ellipse((x1 + 40, yy + 10, x1 + 50, yy + 20), fill=ACCENT)
            yy = draw_wrapped(draw, (x1 + 68, yy), item, font(FONT_REG, 20), x2 - x1 - 100, fill=SUBTEXT, line_gap=8) + 14

    arrow(draw, (560, 357), (725, 450))
    arrow(draw, (1360, 357), (1195, 450))
    arrow(draw, (560, 722), (725, 570))
    arrow(draw, (1360, 722), (1195, 570))

    mini_metric(draw, 300, 900, "正式测评题目", "24 题")
    mini_metric(draw, 610, 900, "核心偏好维度", "4 组")
    mini_metric(draw, 920, 900, "结果类型卡", "16 类")
    mini_metric(draw, 1230, 900, "交付页面与文档", "多页面")

    img.save(OUT_DIR / "图4_项目概述图.png", "PNG")


def route_node(draw, x, y, w, h, idx, title, body, tech):
    rounded_card(draw, (x, y, x + w, y + h), radius=26, fill="#FFFFFF", outline="#D8E7DF")
    draw.ellipse((x + 24, y + 24, x + 76, y + 76), fill=ACCENT)
    center_text(draw, (x + 50, y + 50), str(idx), font(FONT_BOLD, 22), fill="#FFFFFF")
    draw.text((x + 96, y + 30), title, font=font(FONT_BOLD, 26), fill=TEXT)
    draw_wrapped(draw, (x + 34, y + 100), body, font(FONT_REG, 18), w - 68, fill=SUBTEXT, line_gap=8)
    pill(draw, (x + 34, y + h - 58, x + w - 34, y + h - 20), tech, size=16)


def fig5():
    img, draw = canvas((1920, 1080))
    draw_header(draw, "NSTI 技术路线图", "从内容模型到前端实现，再到 GitHub / Vercel 线上交付的完整路径", 1920)

    nodes = [
        ("需求与调研", "明确校园偏好测评定位，梳理 MBTI / STI 类内容的传播逻辑与题目结构。", "资料归纳 + 场景筛选"),
        ("内容模型", "将校园行为拆分为学习、通勤、协作、社交、停留等真实场景，形成题目与结果框架。", "题库设计 + 维度抽象"),
        ("测评逻辑", "用多题目累积分值映射四组偏好维度，再输出对应校园结果卡。", "JavaScript 得分计算"),
        ("前端实现", "构建首页、答题页、结果页、说明页、图鉴页和随园扩展页，并完成响应式适配。", "HTML + CSS + JS"),
        ("部署交付", "通过 Git/GitHub 管理版本，使用 Vercel 部署为可公开访问的静态站点。", "GitHub + Vercel"),
    ]
    x0, y0, w, h, gap = 80, 260, 320, 315, 46
    for i, (title, body, tech) in enumerate(nodes, start=1):
        x = x0 + (i - 1) * (w + gap)
        route_node(draw, x, y0, w, h, i, title, body, tech)
        if i < len(nodes):
            arrow(draw, (x + w, y0 + h / 2), (x + w + gap - 12, y0 + h / 2))

    lanes = [
        ("内容层", "校园场景、题库、评价维度、结果解释"),
        ("逻辑层", "答案记录、得分累积、类型匹配、结果展示"),
        ("表现层", "绿色视觉体系、卡片布局、移动端适配"),
        ("交付层", "仓库结构、部署路径、说明文档、提交材料"),
    ]
    y = 680
    for title, body in lanes:
        rounded_card(draw, (130, y, 1790, y + 68), radius=18, fill="#FFFFFF", outline="#D8E7DF")
        draw.text((170, y + 20), title, font=font(FONT_BOLD, 22), fill=ACCENT)
        draw.text((330, y + 22), body, font=font(FONT_REG, 21), fill=SUBTEXT)
        y += 88

    img.save(OUT_DIR / "图5_技术路线图.png", "PNG")


def tool_card(draw, x, y, w, h, title, model, bullets):
    rounded_card(draw, (x, y, x + w, y + h), radius=26, fill="#FFFFFF", outline="#D8E7DF")
    draw.text((x + 30, y + 28), title, font=font(FONT_BOLD, 28), fill=TEXT)
    pill(draw, (x + 30, y + 76, x + w - 30, y + 116), model, size=16)
    yy = y + 150
    for item in bullets:
        draw.ellipse((x + 34, yy + 10, x + 44, yy + 20), fill=ACCENT)
        yy = draw_wrapped(draw, (x + 62, yy), item, font(FONT_REG, 19), w - 92, fill=SUBTEXT, line_gap=8) + 13


def fig6():
    img, draw = canvas((1920, 1080))
    draw_header(draw, "AI 工具、模型与 Skills 协同图", "把不同 AI 工具放在最适合的位置：内容归纳、代码实现、仓库整理、验证与部署", 1920)

    cards = [
        ("ChatGPT", "GPT-4o / GPT 系列", ["项目定位讨论", "题目与结果文案改写", "应用案例说明润色"]),
        ("Trae", "AI 编程模型", ["编辑器内代码补全", "HTML/CSS/JS 草稿生成", "局部样式和交互排查"]),
        ("OpenAI Codex", "GPT-5 / Codex 系列", ["读取本地仓库上下文", "批量修改 Markdown 与项目文件", "统一提交材料口径"]),
        ("GitHub / Vercel", "工程化交付工具", ["版本管理和文件归档", "静态站点部署", "线上访问与展示验证"]),
    ]
    card_w, card_h, gap = 370, 345, 50
    start_x = (1920 - (card_w * 4 + gap * 3)) // 2
    positions = [(start_x + i * (card_w + gap), 235) for i in range(4)]
    for (title, model, bullets), (x, y) in zip(cards, positions):
        tool_card(draw, x, y, card_w, card_h, title, model, bullets)

    skill_box = (145, 655, 1775, 955)
    rounded_card(draw, skill_box, radius=30, fill="#FFFFFF", outline="#D8E7DF")
    draw.text((205, 700), "已调用 / 添加的能力模块", font=font(FONT_BOLD, 30), fill=TEXT)
    draw.text(
        (205, 746),
        "Skills 是可复用的任务能力或工作流，用来把前端开发、文档整理、验证部署等步骤拆成稳定模块。",
        font=font(FONT_REG, 18),
        fill=SUBTEXT,
    )
    skills = [
        ("前端开发", "页面结构、样式系统、交互逻辑"),
        ("文档整理", "Markdown、材料清单、说明文本"),
        ("浏览器验证", "页面打开、跳转、桌面与移动端检查"),
        ("部署交付", "Vercel 静态站点与仓库结构"),
        ("信息结构化", "题库、维度、结果和案例归纳"),
        ("可视化辅助", "流程图、系统图、协同图与概述图"),
    ]
    sx, sy = 215, 808
    for i, (name, desc) in enumerate(skills):
        x = sx + (i % 3) * 525
        y = sy + (i // 3) * 72
        pill(draw, (x, y, x + 142, y + 42), name, size=17)
        draw.text((x + 165, y + 9), desc, font=font(FONT_REG, 18), fill=SUBTEXT)

    center_text(draw, (960, 1010), "协同原则：AI 提供候选和加速，人工负责判断、筛选、校正与最终定稿", font(FONT_BOLD, 24), fill=ACCENT)

    img.save(OUT_DIR / "图6_AI工具与模型协同图.png", "PNG")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fig1()
    fig2()
    fig3()
    fig4()
    fig5()
    fig6()
    print("PNG figures generated:", OUT_DIR)


if __name__ == "__main__":
    main()

from __future__ import annotations

import csv
import re
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from html import unescape
from pathlib import Path
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
SEED_CSV = ROOT / "data" / "seeds" / "source_catalog.csv"
RAW_DIR = ROOT / "data" / "raw"
HTML_DIR = RAW_DIR / "html"
QUESTION_CSV = RAW_DIR / "question_bank_public.csv"
REPORT_CSV = RAW_DIR / "fetch_report.csv"

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/123.0.0.0 Safari/537.36"
)

IGNORE_LINE_PREFIXES = (
    "问卷星",
    "Powered by",
    "技术支持",
    "正在加载",
    "请稍候",
    "开始作答",
    "下一页",
    "上一页",
    "提交",
    "重新填写",
    "点击",
    "返回",
    "复制",
    "分享",
    "扫码",
    "微信扫一扫",
    "打开微信",
    "登录",
    "注册",
    "下载",
    "APP",
    "首页",
    "联系我们",
    "隐私",
    "Cookie",
)

IGNORE_LINE_EXACT = {
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
}

METADATA_TERMS = (
    "姓名",
    "性别",
    "手机",
    "手机号",
    "手机号码",
    "电话",
    "联系方式",
    "微信号",
    "QQ",
    "学院",
    "院系",
    "专业",
    "班级",
    "学号",
    "工号",
    "部门",
    "单位",
)


@dataclass
class Source:
    source_id: str
    platform: str
    source_type: str
    title: str
    url: str
    fetch_mode: str
    access_level: str
    question_style: str
    topic: str
    status: str
    notes: str


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def read_sources() -> list[Source]:
    with SEED_CSV.open("r", encoding="utf-8-sig", newline="") as fh:
        rows = csv.DictReader(fh)
        return [
            Source(
                source_id=row["source_id"],
                platform=row["platform"],
                source_type=row["source_type"],
                title=row["title"],
                url=row["url"],
                fetch_mode=row["fetch_mode"],
                access_level=row["access_level"],
                question_style=row["question_style"],
                topic=row["topic"],
                status=row["status"],
                notes=row["notes"],
            )
            for row in rows
        ]


def fetch_html(url: str) -> str:
    errors: list[str] = []
    for getter in (fetch_html_via_urllib, fetch_html_via_powershell, fetch_html_via_curl):
        try:
            html = getter(url)
            if html and html.strip():
                return html
            raise RuntimeError("empty response")
        except Exception as exc:
            errors.append(f"{getter.__name__}: {exc}")
    raise RuntimeError(" | ".join(errors))


def fetch_html_via_urllib(url: str) -> str:
    req = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        },
    )
    with urlopen(req, timeout=25) as resp:
        data = resp.read()
    return data.decode("utf-8", errors="ignore")


def fetch_html_via_powershell(url: str) -> str:
    quoted_url = url.replace("'", "''")
    quoted_ua = USER_AGENT.replace("'", "''")
    ps = (
        "$ProgressPreference='SilentlyContinue'; "
        "[Console]::OutputEncoding=[System.Text.Encoding]::UTF8; "
        "$headers=@{"
        f"'User-Agent'='{quoted_ua}';"
        "'Accept-Language'='zh-CN,zh;q=0.9,en;q=0.8'"
        "}; "
        f"$r=Invoke-WebRequest -UseBasicParsing -Uri '{quoted_url}' -Headers $headers -TimeoutSec 30; "
        "$r.Content"
    )
    proc = subprocess.run(
        ["powershell", "-NoProfile", "-Command", ps],
        capture_output=True,
        text=True,
        encoding="utf-8",
        timeout=40,
        check=False,
    )
    if proc.returncode != 0:
        message = proc.stderr.strip() or proc.stdout.strip() or "powershell fetch failed"
        raise RuntimeError(message)
    return proc.stdout


def fetch_html_via_curl(url: str) -> str:
    proc = subprocess.run(
        [
            "curl.exe",
            "-L",
            "--compressed",
            "--max-time",
            "40",
            "-A",
            USER_AGENT,
            "-H",
            "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8",
            url,
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore",
        timeout=50,
        check=False,
    )
    if proc.returncode != 0:
        message = proc.stderr.strip() or proc.stdout.strip() or "curl fetch failed"
        raise RuntimeError(message)
    return proc.stdout


def save_html_snapshot(source_id: str, html: str) -> None:
    target = HTML_DIR / f"{source_id}.html"
    target.write_text(html, encoding="utf-8")


def normalize_space(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def html_to_lines(html: str) -> list[str]:
    html = re.sub(r"(?is)<script\b.*?</script>", "\n", html)
    html = re.sub(r"(?is)<style\b.*?</style>", "\n", html)
    html = re.sub(r"(?is)<noscript\b.*?</noscript>", "\n", html)
    html = re.sub(r"(?i)<br\s*/?>", "\n", html)
    text = re.sub(r"(?s)<[^>]+>", "\n", html)
    text = unescape(text)
    lines = []
    for raw in text.splitlines():
        line = normalize_space(raw)
        if not line:
            continue
        if line in IGNORE_LINE_EXACT:
            continue
        if any(line.startswith(prefix) for prefix in IGNORE_LINE_PREFIXES):
            continue
        lines.append(line)
    return lines


def extract_title(html: str, fallback: str) -> str:
    match = re.search(r"(?is)<title>(.*?)</title>", html)
    if not match:
        return fallback
    title = normalize_space(unescape(match.group(1)))
    return title or fallback


def is_part_heading(line: str) -> bool:
    return bool(re.match(r"^第[一二三四五六七八九十0-9]+部分", line))


def question_start(line: str) -> tuple[int, str] | None:
    match = re.match(r"^(\d{1,3})[\.、．\s]*(.*)$", line)
    if not match:
        return None
    number = int(match.group(1))
    rest = normalize_space(match.group(2))
    return number, rest


def split_ab_inline(text: str) -> tuple[str, str] | None:
    match = re.match(r"^A[\.、:：\s]*(.+?)\s+B[\.、:：\s]*(.+)$", text)
    if match:
        return normalize_space(match.group(1)), normalize_space(match.group(2))
    return None


def option_line(line: str, letter: str) -> str | None:
    match = re.match(rf"^{letter}[\.、:：\s]+(.+)$", line)
    if match:
        return normalize_space(match.group(1))
    return None


def is_metadata_question(text: str) -> bool:
    if not text:
        return False
    return any(term in text for term in METADATA_TERMS)


def is_scale_line(line: str) -> bool:
    if len(line) > 120:
        return False
    digit_hits = sum(ch.isdigit() for ch in line)
    hint_hits = sum(token in line for token in ("非常", "符合", "不符合", "同意", "不同意", "一般"))
    return digit_hits >= 3 and hint_hits >= 1


def generic_question_rows(source: Source, html: str) -> list[dict[str, str]]:
    if source.question_style == "reference":
        return []

    lines = html_to_lines(html)
    part = ""
    current: dict[str, str] | None = None
    rows: list[dict[str, str]] = []

    def push_current() -> None:
        if not current:
            return
        stem = current.get("stem", "").strip()
        option_a = current.get("option_a", "").strip()
        option_b = current.get("option_b", "").strip()
        scale_hint = current.get("scale_hint", "").strip()
        if not stem and not option_a and not option_b:
            return
        rows.append(
            {
                "source_id": source.source_id,
                "platform": source.platform,
                "title": current.get("title", source.title),
                "url": source.url,
                "question_number": current.get("question_number", ""),
                "part": current.get("part", ""),
                "question_type": current.get("question_type", source.question_style),
                "stem": stem,
                "option_a": option_a,
                "option_b": option_b,
                "scale_hint": scale_hint,
                "raw_excerpt": current.get("raw_excerpt", "")[:400],
            }
        )

    for line in lines:
        if is_part_heading(line):
            part = line
            continue

        start = question_start(line)
        if start:
            number, rest = start
            if current:
                push_current()
            current = {
                "title": source.title,
                "question_number": str(number),
                "part": part,
                "question_type": source.question_style,
                "stem": "",
                "option_a": "",
                "option_b": "",
                "scale_hint": "",
                "raw_excerpt": line,
            }

            inline_ab = split_ab_inline(rest) if rest else None
            if inline_ab:
                current["option_a"], current["option_b"] = inline_ab
            elif rest and not is_metadata_question(rest):
                current["stem"] = rest
            else:
                current["stem"] = ""
            continue

        if not current:
            continue

        inline_ab = split_ab_inline(line)
        if inline_ab:
            current["option_a"], current["option_b"] = inline_ab
            current["raw_excerpt"] += " || " + line
            continue

        a_text = option_line(line, "A")
        if a_text:
            current["option_a"] = a_text
            current["raw_excerpt"] += " || " + line
            continue

        b_text = option_line(line, "B")
        if b_text:
            current["option_b"] = b_text
            current["raw_excerpt"] += " || " + line
            continue

        if is_scale_line(line):
            current["scale_hint"] = line
            current["raw_excerpt"] += " || " + line
            continue

        if current["stem"]:
            if len(current["stem"]) < 160 and len(line) < 120:
                current["stem"] = f"{current['stem']} {line}".strip()
                current["raw_excerpt"] += " || " + line
        elif not is_metadata_question(line):
            current["stem"] = line
            current["raw_excerpt"] += " || " + line

    if current:
        push_current()

    return rows


def wjx_question_rows(source: Source, html: str) -> list[dict[str, str]]:
    lines = html_to_lines(html)
    rows: list[dict[str, str]] = []
    part = ""
    started = False
    current: dict[str, str] | None = None

    def push_current() -> None:
        if not current:
            return
        if not current.get("question_number"):
            return
        if not (current.get("option_a") or current.get("option_b")):
            return
        rows.append(
            {
                "source_id": source.source_id,
                "platform": source.platform,
                "title": source.title,
                "url": source.url,
                "question_number": current["question_number"],
                "part": current.get("part", ""),
                "question_type": "forced_choice_ab",
                "stem": current.get("stem", "").strip(),
                "option_a": current.get("option_a", "").strip(),
                "option_b": current.get("option_b", "").strip(),
                "scale_hint": "",
                "raw_excerpt": current.get("raw_excerpt", "")[:400],
            }
        )

    for line in lines:
        if "第一部分" in line and "共26题" in line:
            started = True
            part = line
            continue
        if not started:
            continue
        if any(stop in line for stop in ("举报", "问卷星提供技术支持", "查看结果")):
            break
        if any(flag in line for flag in ("第二部分", "第三部分", "第四部分")):
            part = line
            continue
        if line == "*":
            continue

        start = question_start(line)
        if start:
            number, rest = start
            if number > 93:
                continue
            if current:
                push_current()
            current = {
                "question_number": str(number),
                "part": part,
                "stem": rest,
                "option_a": "",
                "option_b": "",
                "raw_excerpt": line,
            }
            continue

        if not current:
            continue

        a_text = option_line(line, "A")
        if a_text:
            current["option_a"] = a_text
            current["raw_excerpt"] += " || " + line
            continue

        b_text = option_line(line, "B")
        if b_text:
            current["option_b"] = b_text
            current["raw_excerpt"] += " || " + line
            continue

        if not current["stem"] and not current["option_a"] and not current["option_b"] and line not in {"男", "女"}:
            current["stem"] = line
            current["raw_excerpt"] += " || " + line

    if current:
        push_current()

    return rows


def mymbti_question_rows(source: Source, html: str) -> list[dict[str, str]]:
    match = re.search(r"const questions = \[(.*?)\];", html, re.S)
    if not match:
        return []

    rows: list[dict[str, str]] = []
    for item in re.finditer(
        r'\{\s*id:\s*(\d+),\s*dimension:\s*"([^"]+)",\s*text:\s*"((?:[^"\\]|\\.)*)"\s*\}',
        match.group(1),
        re.S,
    ):
        text = item.group(3).replace("\\n", " ").replace('\\"', '"')
        rows.append(
            {
                "source_id": source.source_id,
                "platform": source.platform,
                "title": source.title,
                "url": source.url,
                "question_number": item.group(1),
                "part": item.group(2),
                "question_type": "likert_5",
                "stem": normalize_space(text),
                "option_a": "",
                "option_b": "",
                "scale_hint": "1-5：完全不符合 / 较不符合 / 一般 / 较符合 / 完全符合",
                "raw_excerpt": normalize_space(item.group(0))[:400],
            }
        )
    return rows


def write_csv(path: Path, rows: Iterable[dict[str, str]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8-sig", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def main() -> int:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    HTML_DIR.mkdir(parents=True, exist_ok=True)

    sources = read_sources()
    question_rows: list[dict[str, str]] = []
    report_rows: list[dict[str, str]] = []

    for source in sources:
        if source.fetch_mode != "public_html":
            report_rows.append(
                {
                    "source_id": source.source_id,
                    "platform": source.platform,
                    "url": source.url,
                    "fetch_mode": source.fetch_mode,
                    "status": "skipped",
                    "question_count": "0",
                    "fetched_at": now_iso(),
                    "detail": "manual_search seed; not fetched automatically",
                }
            )
            continue

        try:
            html = fetch_html(source.url)
            save_html_snapshot(source.source_id, html)
            extracted_title = extract_title(html, source.title)
            source = Source(
                source_id=source.source_id,
                platform=source.platform,
                source_type=source.source_type,
                title=extracted_title,
                url=source.url,
                fetch_mode=source.fetch_mode,
                access_level=source.access_level,
                question_style=source.question_style,
                topic=source.topic,
                status=source.status,
                notes=source.notes,
            )
            if source.platform == "mymbti":
                rows = mymbti_question_rows(source, html)
            elif source.platform == "wjx":
                rows = wjx_question_rows(source, html)
            elif source.platform == "xmcs":
                rows = []
            else:
                rows = generic_question_rows(source, html)
            question_rows.extend(rows)
            report_rows.append(
                {
                    "source_id": source.source_id,
                    "platform": source.platform,
                    "url": source.url,
                    "fetch_mode": source.fetch_mode,
                    "status": "ok",
                    "question_count": str(len(rows)),
                    "fetched_at": now_iso(),
                    "detail": extracted_title,
                }
            )
        except HTTPError as exc:
            report_rows.append(
                {
                    "source_id": source.source_id,
                    "platform": source.platform,
                    "url": source.url,
                    "fetch_mode": source.fetch_mode,
                    "status": "http_error",
                    "question_count": "0",
                    "fetched_at": now_iso(),
                    "detail": f"HTTP {exc.code}",
                }
            )
        except URLError as exc:
            report_rows.append(
                {
                    "source_id": source.source_id,
                    "platform": source.platform,
                    "url": source.url,
                    "fetch_mode": source.fetch_mode,
                    "status": "url_error",
                    "question_count": "0",
                    "fetched_at": now_iso(),
                    "detail": str(exc.reason),
                }
            )
        except Exception as exc:  # pragma: no cover - safety net for ad hoc scraping
            report_rows.append(
                {
                    "source_id": source.source_id,
                    "platform": source.platform,
                    "url": source.url,
                    "fetch_mode": source.fetch_mode,
                    "status": "error",
                    "question_count": "0",
                    "fetched_at": now_iso(),
                    "detail": repr(exc),
                }
            )

    write_csv(
        QUESTION_CSV,
        question_rows,
        [
            "source_id",
            "platform",
            "title",
            "url",
            "question_number",
            "part",
            "question_type",
            "stem",
            "option_a",
            "option_b",
            "scale_hint",
            "raw_excerpt",
        ],
    )
    write_csv(
        REPORT_CSV,
        report_rows,
        [
            "source_id",
            "platform",
            "url",
            "fetch_mode",
            "status",
            "question_count",
            "fetched_at",
            "detail",
        ],
    )

    total_questions = len(question_rows)
    ok_sources = sum(1 for row in report_rows if row["status"] == "ok")
    print(f"Fetched {ok_sources} public sources and extracted {total_questions} question rows.")
    print(f"- Question CSV: {QUESTION_CSV}")
    print(f"- Report CSV:   {REPORT_CSV}")
    print(f"- HTML dir:     {HTML_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

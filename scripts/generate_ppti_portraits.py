import argparse
import base64
import json
import os
from pathlib import Path
from typing import Dict, Iterable, List
from urllib import error, request


ROOT = Path(__file__).resolve().parents[1]
DATASET_PATH = ROOT / "app" / "ppti" / "assets" / "ppti-data.js"
OUTPUT_DIR = ROOT / "app" / "ppti" / "assets" / "generated"
MANIFEST_PATH = OUTPUT_DIR / "portrait-manifest.js"
API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-2"


def load_dataset() -> Dict:
    raw = DATASET_PATH.read_text(encoding="utf-8")
    prefix = "window.PPTI_DATA ="
    if prefix not in raw:
        raise RuntimeError(f"Unexpected dataset format: {DATASET_PATH}")
    payload = raw.split(prefix, 1)[1].strip()
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def build_prompt(item: Dict) -> str:
    name = item.get("name_zh") or item.get("name") or "character"
    species = item.get("species_zh") or item.get("species") or "character"
    traits = item.get("combined_traits_zh") or item.get("traits_zh") or item.get("combined_traits") or item.get("traits") or []
    summary = item.get("summary_zh") or item.get("summary") or ""
    trait_text = ", ".join(str(trait) for trait in traits[:4]) if traits else "friendly, expressive"
    return (
        f"Create a square chest-up portrait illustration of {name}, a {species} character. "
        f"Keep the expression aligned with these traits: {trait_text}. "
        f"Use a bright pastel children's-picture-book look, clean shapes, simple background, and a warm playful mood. "
        f"Make it feel like an original reinterpretation for a playful quiz website, not a direct copy of any copyrighted show frame or house style. "
        f"Helpful character note: {summary[:240]}"
    )


def choose_characters(data: Dict, include_all: bool, limit: int | None) -> List[Dict]:
    characters = data.get("characters", [])
    rows = characters if include_all else [item for item in characters if item.get("featured")]
    if limit is not None:
        rows = rows[:limit]
    return rows


def load_manifest() -> Dict[str, Dict]:
    if not MANIFEST_PATH.exists():
        return {}
    raw = MANIFEST_PATH.read_text(encoding="utf-8").strip()
    prefix = "window.PPTI_GENERATED_PORTRAITS ="
    if prefix not in raw:
        return {}
    payload = raw.split(prefix, 1)[1].strip()
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def write_manifest(manifest: Dict[str, Dict]) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=True)
    MANIFEST_PATH.write_text(
        f"window.PPTI_GENERATED_PORTRAITS = {serialized};\n",
        encoding="utf-8",
    )


def build_request(prompt: str, api_key: str) -> request.Request:
    body = json.dumps(
        {
            "model": MODEL,
            "prompt": prompt,
            "size": "1024x1024",
            "quality": "medium",
        }
    ).encode("utf-8")
    return request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )


def fetch_image_bytes(prompt: str, api_key: str) -> bytes:
    req = build_request(prompt, api_key)
    try:
        with request.urlopen(req, timeout=180) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Image generation failed: {exc.code} {detail}") from exc

    try:
        image_b64 = payload["data"][0]["b64_json"]
    except (KeyError, IndexError) as exc:
        raise RuntimeError(f"Unexpected image response: {payload}") from exc
    return base64.b64decode(image_b64)


def iter_targets(characters: Iterable[Dict], overwrite: bool, manifest: Dict[str, Dict]) -> Iterable[Dict]:
    for item in characters:
        slug = item.get("slug") or item.get("name", "").lower().replace(" ", "-")
        filename = f"{slug}.png"
        if not overwrite and (OUTPUT_DIR / filename).exists():
            continue
        if not overwrite and slug in manifest:
            continue
        yield item


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate PPTI portraits with OpenAI image generation.")
    parser.add_argument("--all", action="store_true", help="Generate portraits for all characters instead of featured only.")
    parser.add_argument("--limit", type=int, default=None, help="Only process the first N selected characters.")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate portraits even if files already exist.")
    args = parser.parse_args()

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise SystemExit("OPENAI_API_KEY is required.")

    data = load_dataset()
    manifest = load_manifest()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    selected = choose_characters(data, include_all=args.all, limit=args.limit)
    targets = list(iter_targets(selected, overwrite=args.overwrite, manifest=manifest))
    if not targets:
        print("No portraits need generation.")
        return

    for index, item in enumerate(targets, start=1):
        slug = item.get("slug") or item.get("name", "").lower().replace(" ", "-")
        filename = f"{slug}.png"
        prompt = build_prompt(item)
        print(f"[{index}/{len(targets)}] generating {slug}")
        image_bytes = fetch_image_bytes(prompt, api_key)
        (OUTPUT_DIR / filename).write_bytes(image_bytes)
        manifest[slug] = {
            "filename": filename,
            "model": MODEL,
            "prompt": prompt,
        }
        write_manifest(manifest)

    print(f"Generated {len(targets)} portraits into {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

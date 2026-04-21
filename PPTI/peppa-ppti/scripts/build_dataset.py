from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ppti import build_dataset


def main() -> None:
    result = build_dataset()
    stats = result.dataset["meta"]["stats"]
    print(json.dumps(
        {
            "characters": stats["character_count"],
            "featured_characters": stats["featured_character_count"],
            "quiz_results": stats["quiz_result_count"],
            "characters_with_traits": stats["characters_with_traits"],
            "questions": stats["question_count"],
            "json": str(result.output_json),
            "js": str(result.output_js),
            "dist": str(result.dist_dir),
        },
        ensure_ascii=False,
        indent=2,
    ))


if __name__ == "__main__":
    main()

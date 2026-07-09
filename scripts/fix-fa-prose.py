#!/usr/bin/env python3
"""Fix FA punctuation only — keep (English) parentheses; bidi.js handles RTL display."""

import json
import re
from pathlib import Path

def should_skip(path: tuple) -> bool:
    try:
        idx = path.index("items")
    except ValueError:
        return False
    return (
        len(path) >= 5
        and path[0] == "skills"
        and path[1] == "groups"
        and isinstance(path[2], int)
        and idx == 3
        and isinstance(path[4], int)
    )


def fix_fa_prose(text: str) -> str:
    if not text or not isinstance(text, str):
        return text

    out = text.replace("، منتهی به", "؛ منجر به")
    out = out.replace("، منتهی", "؛ منجر")
    out = out.replace("بک‌پند", "بک‌اند")
    out = out.replace("عارضه‌‌یابی", "عارضه‌یابی")
    return out


def walk(obj, path=()):
    if isinstance(obj, dict):
        return {k: walk(v, path + (k,)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk(v, path + (i,)) for i, v in enumerate(obj)]
    if isinstance(obj, str) and not should_skip(path):
        return fix_fa_prose(obj)
    return obj


def main():
    path = Path(__file__).resolve().parents[1] / "public/locales/fa.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    fixed = walk(data)
    path.write_text(json.dumps(fixed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {path}")


if __name__ == "__main__":
    main()

"""Generate images via OpenAI's gpt-image-1 model and save them as PNG files.

The OpenAI API key is read from the OPENAI_API_KEY environment variable.
It is never accepted as a CLI argument or printed to stdout/stderr.
"""

from __future__ import annotations

import argparse
import base64
import os
import sys
from pathlib import Path

from openai import OpenAI, OpenAIError

MODEL = "gpt-image-1"
VALID_SIZES = {"1024x1024", "1024x1536", "1536x1024"}
VALID_QUALITIES = {"low", "medium", "high"}


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate images with OpenAI gpt-image-1.")
    p.add_argument("prompt", help="Natural-language description of the image.")
    p.add_argument("--out", default="image.png", help="Output PNG path (default: image.png).")
    p.add_argument("--size", default="1024x1024", choices=sorted(VALID_SIZES))
    p.add_argument("--quality", default="high", choices=sorted(VALID_QUALITIES))
    p.add_argument("--n", type=int, default=1, help="Number of images to generate.")
    return p.parse_args()


def output_paths(base: Path, n: int) -> list[Path]:
    if n == 1:
        return [base]
    stem, suffix = base.stem, base.suffix or ".png"
    parent = base.parent
    return [parent / f"{stem}_{i + 1}{suffix}" for i in range(n)]


def main() -> int:
    args = parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        print(
            "OPENAI_API_KEY is not set. Export it in your shell before running this skill.",
            file=sys.stderr,
        )
        return 2

    if args.n < 1:
        print("--n must be >= 1", file=sys.stderr)
        return 2

    out_base = Path(args.out).expanduser().resolve()
    out_base.parent.mkdir(parents=True, exist_ok=True)
    paths = output_paths(out_base, args.n)

    client = OpenAI()
    try:
        result = client.images.generate(
            model=MODEL,
            prompt=args.prompt,
            size=args.size,
            quality=args.quality,
            n=args.n,
        )
    except OpenAIError as e:
        print(f"OpenAI API error: {e}", file=sys.stderr)
        return 1

    for path, datum in zip(paths, result.data):
        if not getattr(datum, "b64_json", None):
            print("Response did not contain image data.", file=sys.stderr)
            return 1
        path.write_bytes(base64.b64decode(datum.b64_json))
        print(str(path))

    return 0


if __name__ == "__main__":
    sys.exit(main())

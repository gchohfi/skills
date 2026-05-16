---
name: image-generation
description: Generate images from a text prompt using OpenAI's gpt-image-1 model. Use when the user asks Claude to create, generate, draw, render, or produce an image, illustration, picture, logo, icon, or artwork from a description (e.g. "gere uma imagem de X", "crie uma ilustração de Y", "make me an image of Z").
---

# Image Generation

Generates images via OpenAI's image API and saves them locally as PNG files.

## Requirements

- The `OPENAI_API_KEY` environment variable must be set in the shell. If it is missing, instruct the user to export it (`export OPENAI_API_KEY=sk-...`) and stop. **Never** ask the user to paste the key into the chat.
- Python dependencies in `requirements.txt` (`openai>=1.40.0`).

## Usage

Invoke the helper from the skill directory:

```bash
python core/generate.py "<prompt>" \
  --out <output_path.png> \
  --size 1024x1024 \
  --quality high
```

Arguments:
- `prompt` (positional, required) — natural-language description of the image.
- `--out` — output PNG path. Default: `image.png` in the current working directory.
- `--size` — `1024x1024` (default), `1024x1536` (portrait), or `1536x1024` (landscape).
- `--quality` — `low`, `medium`, or `high` (default).
- `--n` — number of images to generate (default 1). Multiple files get a numeric suffix.

The script prints the absolute path of each saved file to stdout.

## When invoked

1. If `OPENAI_API_KEY` is not set, tell the user to export it and stop — do not proceed.
2. Choose a sensible default output path under the user's current working directory.
3. Run the helper with the user's prompt. Stream stderr so the user sees errors.
4. On success, report the saved path(s). If the user is in an environment that can render the file, offer to open or display it.

## Safety notes

- Never echo, log, or commit the API key.
- Do not pass the key as a CLI argument — the helper reads it from the environment only.
- Refuse prompts that request disallowed content (CSAM, real-person sexual content, etc.); OpenAI will also reject these.

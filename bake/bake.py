#!/usr/bin/env python3
"""
Font baking script — subsets fonts to only include characters used in HTML pages.
Outputs WOFF2 files to assets/fonts/baked/.
"""

import os
import sys
import subprocess
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

README_URL = "https://raw.githubusercontent.com/soizo/Soizo/refs/heads/main/README.md"

FONTS = [
    {
        "source": "simsun.ttc",
        "source_dir": "bake",
        "output": "simsun-subset.woff2",
        "face_index": 0,
    },
    {
        "source": "PlayfairDisplaySC-Black.ttf",
        "source_dir": "bake",
        "output": "playfair-black-subset.woff2",
    },
    {
        "source": "WKTrChongBong.ttf",
        "output": "wktrcb-subset.woff2",
    },
    {
        "source": "Minh Nguyen Regular.ttf",
        "output": "minhnguyen-subset.woff2",
    },
    {
        "source": "NotoColorEmoji-Regular.ttf",
        "output": "notocoloremoji-subset.woff2",
    },
]

# ---------------------------------------------------------------------------
# Resolve paths relative to this script
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
FONTS_DIR = PROJECT_ROOT / "assets" / "fonts"
OUTPUT_DIR = FONTS_DIR / "baked"

# ---------------------------------------------------------------------------
# HTML text extraction
# ---------------------------------------------------------------------------

class TextExtractor(HTMLParser):
    """Extract visible text content from HTML, ignoring tags and attributes."""

    SKIP_TAGS = {"script", "style"}

    def __init__(self):
        super().__init__()
        self._text_parts: list[str] = []
        self._skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag.lower() in self.SKIP_TAGS:
            self._skip_depth += 1

    def handle_endtag(self, tag):
        if tag.lower() in self.SKIP_TAGS:
            self._skip_depth = max(0, self._skip_depth - 1)

    def handle_data(self, data):
        if self._skip_depth == 0:
            self._text_parts.append(data)

    def get_text(self) -> str:
        return "".join(self._text_parts)


def extract_text_from_html(path: Path) -> str:
    """Read an HTML file and return its visible text content."""
    content = path.read_text(encoding="utf-8")
    parser = TextExtractor()
    parser.feed(content)
    return parser.get_text()


# ---------------------------------------------------------------------------
# Core logic
# ---------------------------------------------------------------------------

def fetch_readme() -> str:
    """Fetch the remote README.md used by the about page."""
    try:
        with urllib.request.urlopen(README_URL, timeout=10) as resp:
            return resp.read().decode("utf-8")
    except Exception as e:
        print(f"  WARNING: could not fetch README.md ({e}), skipping")
        return ""


def collect_characters(html_files: list[Path]) -> str:
    """Collect all unique characters from HTML files and the remote README."""
    chars: set[str] = set()
    for f in html_files:
        text = extract_text_from_html(f)
        chars.update(text)
    # Include characters from the remotely-rendered README.md
    readme_text = fetch_readme()
    if readme_text:
        chars.update(readme_text)
        print(f"  (including {len(set(readme_text))} unique chars from remote README.md)")
    # Remove whitespace-only characters — they are not useful for subsetting
    chars.discard("")
    return "".join(sorted(chars))


def find_html_files() -> list[Path]:
    """Recursively find all .html files under the project root."""
    files = sorted(PROJECT_ROOT.rglob("*.html"))
    return files


def fmt_size(nbytes: int) -> str:
    """Human-readable file size."""
    if nbytes < 1024:
        return f"{nbytes} B"
    elif nbytes < 1024 * 1024:
        return f"{nbytes / 1024:.1f} KB"
    else:
        return f"{nbytes / (1024 * 1024):.1f} MB"


def bake_font(font_cfg: dict, characters: str) -> None:
    """Subset a single font using pyftsubset."""
    source_dir = SCRIPT_DIR if font_cfg.get("source_dir") == "bake" else FONTS_DIR
    source = source_dir / font_cfg["source"]
    output = OUTPUT_DIR / font_cfg["output"]

    if not source.exists():
        print(f"  ERROR: source font not found: {source}")
        sys.exit(1)

    cmd = [
        sys.executable, "-m", "fontTools.subset",
        str(source),
        f"--text={characters}",
        "--flavor=woff2",
        f"--output-file={output}",
    ]

    if "face_index" in font_cfg:
        cmd.append(f"--font-number={font_cfg['face_index']}")

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ERROR: pyftsubset failed for {source.name}")
        print(result.stderr)
        sys.exit(1)

    before = source.stat().st_size
    after = output.stat().st_size
    ratio = (1 - after / before) * 100

    print(f"  {source.name}")
    print(f"    {fmt_size(before)} -> {fmt_size(after)}  ({ratio:.1f}% reduction)")


def check_dependencies():
    """Verify fonttools and brotli are available."""
    try:
        import fontTools  # noqa: F401
    except ImportError:
        print("ERROR: fonttools is not installed.")
        print("  Install with:  pip3 install fonttools")
        sys.exit(1)
    try:
        import brotli  # noqa: F401
    except ImportError:
        print("ERROR: brotli is not installed (required for WOFF2 output).")
        print("  Install with:  pip3 install brotli")
        sys.exit(1)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    check_dependencies()

    print("Font Baker")
    print("=" * 50)

    # Find HTML files
    html_files = find_html_files()
    print(f"\nScanning {len(html_files)} HTML file(s):")
    for f in html_files:
        print(f"  {f.relative_to(PROJECT_ROOT)}")

    # Collect characters
    characters = collect_characters(html_files)
    print(f"\nUnique characters found: {len(characters)}")

    if not characters:
        print("WARNING: No characters found in HTML files. Nothing to bake.")
        return

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Bake each font
    print(f"\nBaking fonts to {OUTPUT_DIR.relative_to(PROJECT_ROOT)}/")
    for font_cfg in FONTS:
        bake_font(font_cfg, characters)

    print(f"\nDone.")


if __name__ == "__main__":
    main()

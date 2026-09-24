"""Build an entirely self-contained static site; no third-party packages."""
from pathlib import Path
import argparse
import hashlib
import json
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'src'
OUTPUT = ROOT / 'dist'

def build(pages=False):
    for name in ('index.html', 'style.css', 'app.js', 'assets/favicon.svg', 'assets/fonts/dm-sans.ttf', 'assets/fonts/instrument-serif-italic.ttf'):
        if not (SOURCE / name).is_file():
            raise SystemExit(f'Missing required asset: {name}')
    if OUTPUT.is_symlink():
        raise SystemExit('Refusing to build into a symbolic link.')
    OUTPUT.mkdir(exist_ok=True)
    shutil.copytree(SOURCE, OUTPUT, dirs_exist_ok=True)
    manifest = {str(p.relative_to(OUTPUT)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(OUTPUT.rglob('*')) if p.is_file() and p.name != 'manifest.json'}
    (OUTPUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Built {len(manifest)} local files: {OUTPUT}')
    if pages:
        destination = ROOT / 'docs'
        if destination.is_symlink():
            raise SystemExit('Refusing to build Pages into a symbolic link.')
        shutil.copytree(OUTPUT, destination, dirs_exist_ok=True)
        (destination / '.nojekyll').touch()
        print(f'GitHub Pages files ready: {destination}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--pages', action='store_true', help='Also prepare docs/ for GitHub Pages')
    build(pages=parser.parse_args().pages)

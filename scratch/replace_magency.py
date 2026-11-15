import os
from pathlib import Path

# Define the root of the project
ROOT = Path(__file__).resolve().parent.parent  # goes up to startup folder

# File extensions to process
EXTENSIONS = {'.html', '.jsx', '.js', '.py', '.css'}

old = 'MagencyStudio'
new = 'MagencyStudio'

changed_files = []

for path in ROOT.rglob('*'):
    if path.is_file() and path.suffix in EXTENSIONS:
        try:
            text = path.read_text(encoding='utf-8')
        except Exception:
            continue
        if old in text:
            new_text = text.replace(old, new)
            path.write_text(new_text, encoding='utf-8')
            changed_files.append(str(path))

print(f"Replaced '{old}' with '{new}' in {len(changed_files)} files.")
if changed_files:
    for f in changed_files:
        print(f)

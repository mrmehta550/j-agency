import pathlib
from PIL import Image

folder = pathlib.Path('frontend/public/images')
names = ['hero-hand-human-left.png', 'hero-hand-robot-right.png']

for name in names:
    src = folder / name
    dst = folder / (name.replace('.png', '.webp'))
    try:
        im = Image.open(src)
        im.save(dst, format='WEBP', quality=85, method=6)
        original_kb = src.stat().st_size / 1024
        new_kb = dst.stat().st_size / 1024
        print(f'Converted {src.name} -> {dst.name}: {original_kb:.1f}KB -> {new_kb:.1f}KB ({100 * (1 - new_kb / original_kb):.1f}% reduction)')
    except Exception as e:
        print(f'Error converting {src.name}: {e}')


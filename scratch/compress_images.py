import pathlib, os
from PIL import Image

# Directories to scan for images (add more if needed)
folders = [
    pathlib.Path('frontend/public'),
    pathlib.Path('frontend/dist'),
    pathlib.Path('backend/static'),
    pathlib.Path('backend/staticfiles'),
]

# Supported extensions
exts = {'.png', '.jpg', '.jpeg'}

for folder in folders:
    if not folder.exists():
        continue
    for img_path in folder.rglob('*'):
        if img_path.suffix.lower() not in exts:
            continue
        try:
            im = Image.open(img_path)
        except Exception as e:
            print(f"[skip] {img_path}: {e}")
            continue
        # For JPEG: quality 85, optimize
        if img_path.suffix.lower() in {'.jpg', '.jpeg'}:
            im.save(img_path, format='JPEG', quality=85, optimize=True)
        else:
            # For PNG: enable optimization
            im.save(img_path, format='PNG', optimize=True)
        print(f"[compressed] {img_path}")

print('Image compression finished')

"""Download licensed Pexels photographs and create responsive local WebP assets.
Sources/credits and license are documented in docs/v3/MIDIAS.md.
Run explicitly when refreshing assets; not part of the application or build.
"""
from pathlib import Path
from io import BytesIO
import requests
from PIL import Image, ImageOps

out = Path('public/media/v3')
out.mkdir(parents=True, exist_ok=True)
photos = {'conexoes': 466685, 'dev-work': 574071, 'saude': 30902100, 'store': 5081393}
for name, photo in photos.items():
    url = f'https://images.pexels.com/photos/{photo}/pexels-photo-{photo}.jpeg?auto=compress&cs=tinysrgb&w=2000'
    response = requests.get(url, timeout=45)
    response.raise_for_status()
    image = ImageOps.exif_transpose(Image.open(BytesIO(response.content))).convert('RGB')
    for width in (800, 1600):
        resized = image.copy()
        resized.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
        resized.save(out / f'{name}-{width}.webp', quality=83, method=6)
    print(name, image.size, (out / f'{name}-1600.webp').stat().st_size)

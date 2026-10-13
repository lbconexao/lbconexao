"""Optimize copies of the official artwork. Originals remain untouched. Requires Pillow."""
from pathlib import Path
from PIL import Image
source = Path('identidade_visual')
target = Path('public/media')
target.mkdir(parents=True, exist_ok=True)
def save(image, name, width):
    image = image.convert('RGB')
    image.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
    image.save(target / name, 'WEBP', quality=88, method=6)
main = Image.open(source / 'logo_lbconexao.png')
save(main, 'marca-lb.webp', 960)
save(main, 'marca-lb-small.webp', 360)
group = Image.open(source / 'img_llbconexao_dev_store_saude.png')
save(group, 'ecossistema.webp', 1400)
# Complete marks: symbol, wordmark and slogan preserved from the official group sheet.
for name, box in [('dev', (55, 335, 900, 1175)), ('store', (980, 335, 1830, 1175)), ('saude', (1880, 335, 2780, 1175))]:
    save(group.crop(box), f'marca-{name}.webp', 700)
main.convert('RGB').resize((1200, 655), Image.Resampling.LANCZOS).save(target / 'compartilhamento.jpg', quality=88, optimize=True)
print('Official artwork optimized; originals preserved.')

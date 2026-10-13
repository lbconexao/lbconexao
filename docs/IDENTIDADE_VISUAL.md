# Uso dos materiais oficiais

Os arquivos originais em `identidade_visual/` não foram modificados. A marca não foi redesenhada, recolorida ou substituída por um ícone genérico.

| Origem | Derivado/uso |
| --- | --- |
| `logo_lbconexao.png` | `marca-lb.webp`, `marca-lb-small.webp`, `compartilhamento.jpg`; marca institucional e compartilhamento |
| `img_llbconexao_dev_store_saude.png` | `ecossistema.webp` e recortes completos `marca-dev.webp`, `marca-saude.webp`, `marca-store.webp` |
| `logo_lbconexao_dev.png` e `logo_lbconexao_saude.png` | Inspecionados e preservados; a composição conjunta fornece recortes com apresentação consistente entre as três áreas |
| `mp4_lbconexao_explosao_1.mp4` | `institucional.mp4`, seção institucional da Home na V3, com pôster em 4 segundos |
| `mp4_lbconexao_explosao_2.mp4` | `institucional-2.mp4`, página Sobre, com pôster em 6,5 segundos |
| `gif_lbconexao.gif` | Preservado no acervo; não carregado no site por pesar aproximadamente 25 MB |

Não havia logotipo separado da Store. Foi usado o recorte completo da marca Store presente na imagem conjunta oficial, mantendo símbolo, nome e slogan. As marcas ficam sobre superfícies claras para preservar contraste e cores.

## Otimização

`python scripts/optimize-assets.py` gera imagens web com Pillow. O script apenas reduz dimensões/comprime e separa as marcas completas da prancha conjunta.

Vídeos convertidos com FFmpeg: H.264, `-an`, `-crf 27` (primeiro) / `-crf 28` (segundo), `-preset slow -movflags +faststart`. Dimensões 1280 × 720, 24 fps, 8 segundos. Nenhum texto, marca ou watermark dos vídeos foi removido.

| Vídeo | Original | Web |
| --- | ---: | ---: |
| Institucional 1 | 1.466.690 bytes | 527.212 bytes |
| Institucional 2 | 2.657.545 bytes | 1.071.692 bytes |

Redução combinada aproximada de 61%. Sem faixa de áudio e sem loop automático; reprodução respeita visibilidade, economia de dados (quando informada pelo navegador) e movimento reduzido. Controle de pausa/reprodução e fallback em WebP.

A fonte Inter é servida localmente em WOFF2 (48.256 bytes). Licença OFL em `public/fonts/LICENSE-Inter.txt`; origem: [Inter](https://github.com/rsms/inter) / Google Fonts. A interface não depende de CDN de fontes, ícones, CSS, fotos ou vídeos.

O inventário das fotografias e a distribuição atual das mídias estão no [plano da V3](v3/MIDIAS.md).

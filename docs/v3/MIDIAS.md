# Plano e inventário de mídias — V3

## Materiais oficiais preservados

Os sete originais de `identidade_visual/` permanecem intactos. A V3 reutiliza os derivados otimizados da V2 em `public/media/`.

| Original | Derivado local | Uso na V3 |
| --- | --- | --- |
| `logo_lbconexao.png` | `marca-lb.webp`, `marca-lb-small.webp`, `compartilhamento.jpg` | Cabeçalho, rodapé e metadados |
| `img_llbconexao_dev_store_saude.png` | `marca-dev.webp`, `marca-saude.webp`, `marca-store.webp`, `ecossistema.webp` | Assinaturas das divisões e fallback das fotografias |
| `logo_lbconexao_dev.png`, `logo_lbconexao_saude.png` | Originais mantidos no acervo | Os recortes completos da prancha conjunta continuam garantindo consistência entre as três divisões |
| `mp4_lbconexao_explosao_1.mp4` | `institucional.mp4`, `poster.webp` | Seção institucional da Home, depois dos projetos |
| `mp4_lbconexao_explosao_2.mp4` | `institucional-2.mp4`, `poster-2.webp` | Apresentação da página Sobre |
| `gif_lbconexao.gif` | Sem incorporação | Arquivo de aproximadamente 25 MB preservado no acervo |

A marca institucional conserva o fundo do arquivo oficial, integrado a um cabeçalho claro. Não foi removido o fundo nem redesenhada a marca. Os vídeos mantêm pôster, reprodução manual, pausa, ausência de áudio e fallback estático. Autoplay somente quando visíveis, sem preferência por redução de movimento ou economia de dados. Sem suporte a IntersectionObserver, o pôster e a reprodução manual continuam disponíveis.

## Fotografias locais

Fotografias licenciadas pelo Pexels, baixadas em 12/10/2026 e convertidas para WebP. [Licença de uso](https://www.pexels.com/license/). A licença permite uso e adaptação; o site não apresenta as pessoas ou marcas retratadas como clientes, integrantes ou apoiadores da LB Conexão. Nenhuma mídia da Starlink ou dos links de referência visual foi incorporada.

| Arquivo em `public/media/v3/` | Origem | Aplicação | Tamanho 800 / 1600 px |
| --- | --- | --- | --- |
| `conexoes-*.webp` | [Pexels 466685](https://www.pexels.com/photo/466685/) | Hero da Home e detalhe de Contato; cidade ilustrativa | 108.112 / 352.842 bytes |
| `dev-work-*.webp` | [Pexels 574071](https://www.pexels.com/photo/574071/) | Cena DEV na Home, hero DEV e Soluções | 26.496 / 71.338 bytes |
| `saude-*.webp` | [Duy Tân Đại học — atividade educacional](https://www.pexels.com/photo/medical-students-learning-with-training-mannequin-30902100/) | Cena e hero Saúde; treinamento ilustrativo | 32.262 / 79.140 bytes |
| `store-*.webp` | [cottonbro studio — mesa e acessórios](https://www.pexels.com/photo/black-and-silver-headphones-on-white-table-5081393/) | Cena e hero Store; composição ilustrativa, sem oferta | 13.944 / 33.520 bytes |

As oito versões somam aproximadamente 701 KiB. O navegador seleciona a resolução via `srcset`; não baixa necessariamente ambas. As fotografias fora da primeira tela usam carregamento adiado. Os arquivos estão no próprio site e não dependem de hotlinks. `scripts/download-v3-media.py` documenta os IDs e gera as versões locais; requer Python, Pillow e requests, somente para atualizar o acervo, nunca durante o build.

## Portfólio e pendências

Os mockups de Hotspot PIX, Questionários e Clínicas são interfaces demonstrativas construídas em HTML/CSS, sem dados reais. Não são capturas de produtos operacionais. Cada apresentação mantém os avisos de desenvolvimento e recursos planejados, conforme informado pelo proprietário.

Para evoluções futuras, substituir as fotografias ilustrativas por imagens próprias autorizadas de trabalho, treinamentos e produtos, quando disponíveis. Faltam capturas reais dos três sistemas, produtos/ofertas aprovados e materiais de cursos com inscrições abertas. Essas ausências não deixam áreas vazias: a vitrine e a agenda comunicam seu estado atual, sem inventar oferta, preço, estoque, depoimento ou parceria.

A fonte Inter WOFF2 local e sua licença OFL foram preservadas. Na V3 ela recebe preload para reduzir a troca tardia da tipografia.

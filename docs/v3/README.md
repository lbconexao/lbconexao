# Revisão visual V3

Build local capturado em Chromium, com movimento reduzido para estabilizar as imagens e mostrar os pôsteres dos vídeos. São 48 capturas: primeira tela e página completa de oito páginas em três resoluções.

Visão conjunta das primeiras telas: [desktop](overview-desktop.jpg) · [celular](overview-mobile.jpg).

| Página | Desktop 1440 × 900 | Tablet 768 × 1024 | Celular 390 × 844 |
| --- | --- | --- | --- |
| Home | [Primeira tela](after/home-desktop-viewport.png) · [Completa](after/home-desktop.png) | [Primeira tela](after/home-tablet-viewport.png) · [Completa](after/home-tablet.png) | [Primeira tela](after/home-mobile-viewport.png) · [Completa](after/home-mobile.png) |
| DEV | [Primeira tela](after/dev-desktop-viewport.png) · [Completa](after/dev-desktop.png) | [Primeira tela](after/dev-tablet-viewport.png) · [Completa](after/dev-tablet.png) | [Primeira tela](after/dev-mobile-viewport.png) · [Completa](after/dev-mobile.png) |
| Saúde | [Primeira tela](after/saude-desktop-viewport.png) · [Completa](after/saude-desktop.png) | [Primeira tela](after/saude-tablet-viewport.png) · [Completa](after/saude-tablet.png) | [Primeira tela](after/saude-mobile-viewport.png) · [Completa](after/saude-mobile.png) |
| Store | [Primeira tela](after/store-desktop-viewport.png) · [Completa](after/store-desktop.png) | [Primeira tela](after/store-tablet-viewport.png) · [Completa](after/store-tablet.png) | [Primeira tela](after/store-mobile-viewport.png) · [Completa](after/store-mobile.png) |
| Sobre | [Primeira tela](after/sobre-desktop-viewport.png) · [Completa](after/sobre-desktop.png) | [Primeira tela](after/sobre-tablet-viewport.png) · [Completa](after/sobre-tablet.png) | [Primeira tela](after/sobre-mobile-viewport.png) · [Completa](after/sobre-mobile.png) |
| Soluções | [Primeira tela](after/solucoes-desktop-viewport.png) · [Completa](after/solucoes-desktop.png) | [Primeira tela](after/solucoes-tablet-viewport.png) · [Completa](after/solucoes-tablet.png) | [Primeira tela](after/solucoes-mobile-viewport.png) · [Completa](after/solucoes-mobile.png) |
| Portfólio | [Primeira tela](after/portfolio-desktop-viewport.png) · [Completa](after/portfolio-desktop.png) | [Primeira tela](after/portfolio-tablet-viewport.png) · [Completa](after/portfolio-tablet.png) | [Primeira tela](after/portfolio-mobile-viewport.png) · [Completa](after/portfolio-mobile.png) |
| Contato | [Primeira tela](after/contato-desktop-viewport.png) · [Completa](after/contato-desktop.png) | [Primeira tela](after/contato-tablet-viewport.png) · [Completa](after/contato-tablet.png) | [Primeira tela](after/contato-mobile-viewport.png) · [Completa](after/contato-mobile.png) |

## Comparação com a etapa anterior

As capturas disponíveis da V2 foram preservadas em `before/`, antes das alterações. A altura do desktop anterior era 1000 px; portanto a comparação não é pixel a pixel com o desktop V3 de 900 px.

- Home: [V2 desktop](before/home-desktop-viewport.png) → [V3 desktop](after/home-desktop-viewport.png).
- Home: [V2 celular](before/home-mobile-viewport.png) → [V3 celular](after/home-mobile-viewport.png).
- Home completa: [V2](before/home-desktop.png) → [V3](after/home-desktop.png).
- DEV: [V2](before/dev-desktop.png) → [V3](after/dev-desktop-viewport.png).
- Saúde: [V2](before/saude-desktop.png) → [V3](after/saude-desktop-viewport.png).
- Store: [V2 celular](before/store-mobile.png) → [V3 celular](after/store-mobile-viewport.png).

Para conferir movimento e navegação, execute `npm.cmd run dev` na raiz e abra **http://localhost:3000/lbconexao/**. As capturas não demonstram animações; os testes também exercitam a página com movimento habilitado.

[Relatório da V3](RELATORIO_V3.md) · [Mídias e pendências](MIDIAS.md)

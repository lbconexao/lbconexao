# LB Conexão — entrega visual V3

Refinamento incremental do projeto React/TypeScript/Vite existente, preparado localmente para revisão em 12/10/2026. Branch `redesign/cinematic-v3`, criada a partir de `redesign/premium-v2`. O trabalho da V2 já presente foi preservado. Sem commit, push, merge ou publicação nesta etapa.

## Resultado por página

| Página | Alteração visual |
| --- | --- |
| Home | Hero panorâmico com fotografia local, título e chamadas em sequência; apresentação clara das três marcas; cenas amplas DEV, Saúde e Store; portfólio com mockups maiores; vídeo oficial em seção institucional própria; processo, FAQ e contato em superfícies claras |
| DEV | Hero fotográfico com código e trabalho real ilustrativo; marca oficial em faixa clara; serviços legíveis em grid; portfólio ampliado e alternância de luminosidade |
| Saúde | Hero de educação em saúde, verde suave e superfícies claras; imagem e texto separados no celular; metodologia, serviços e agenda preservados |
| Store | Cena comercial luminosa com acentos laranja; filtros, busca e catálogo legíveis; estado vazio verdadeiro, sem produtos ou preços inventados |
| Sobre | Texto e vídeo oficial lado a lado no desktop; removida a apresentação isolada e desproporcional da prancha de marcas; assinaturas compactas das três áreas; missão, visão e valores preservados |
| Soluções | Fotografia de desenvolvimento integrada à introdução, serviços em superfícies claras e acesso às três divisões |
| Portfólio | Interfaces conceituais distintas para Hotspot PIX, Questionários e Clínicas; primeiro projeto em destaque; retirada a introdução duplicada; avisos de desenvolvimento mantidos |
| Produtos DEV | Novos mockups compartilhados, tipografia maior e leitura clara; recursos continuam identificados como planejados |
| Contato | Fotografia de apoio, formulário claro, campos maiores e canais existentes; preparação/revisão da mensagem no navegador preservada |
| Demais rotas | Estilos claros compartilhados aplicados a Privacidade, indisponibilidade administrativa e 404 |

O cabeçalho usa uma superfície clara e levemente translúcida, ficando sólida na rolagem. Essa escolha integra o fundo da marca oficial sem adulterá-la. As áreas de conteúdo usam largura de até 1280 px; imagens selecionadas ocupam toda a janela. O celular recebe enquadramentos próprios, mantendo rostos e conteúdo separados.

## Arquivos e componentes

- `visual-v3.css`: camada incremental de tokens, tipografia, cenas, contraste, espaçamento e regras responsivas, sobre a base V2 de `index.css`.
- `App.tsx`: importação da camada visual, mantendo a arquitetura e o HashRouter.
- `components/Scene.tsx`: imagens responsivas com fallback, cenas das divisões e heroes internos.
- `components/RouteEffects.tsx`: revelação de conteúdo e parallax discreto, preservando metadados e navegação.
- `components/Projects.tsx`: mockups demonstrativos ampliados e layout dos projetos.
- `components/Cinema.tsx`: fallback sem IntersectionObserver e correção da reprodução manual com movimento reduzido.
- `pages/Hub.tsx`, `Dev.tsx`, `Saude.tsx`, `Store.tsx`, `Institutional.tsx`, `Contact.tsx`: composições visuais das páginas existentes.
- `index.html`: preload da fonte local, para evitar troca tardia da tipografia.
- `public/media/v3/`, `scripts/download-v3-media.py`: fotografias locais em duas resoluções e script de preparação.
- `tests/site.spec.ts`: validação das cenas, captura em três resoluções e diagnóstico de desempenho, além dos testes funcionais preservados.
- `README.md`, `docs/IDENTIDADE_VISUAL.md`, `docs/v3/`: instruções, inventário, evidências e relatório.

O `git status` inclui também alterações anteriores da V2. Não interpretar todos os arquivos pendentes como mudanças desta etapa. Contrato social, auditoria de CNAEs, regras comerciais, configuração de ofertas, contatos e integrações existentes não foram reestruturados.

## Movimento e acessibilidade

Entradas usam opacidade e deslocamento vertical de 22–24 px, com duração aproximada de 650–700 ms e intervalos de 75 ms entre elementos relacionados. IntersectionObserver dispara a animação uma vez, sem uma classe que esconda permanentemente o conteúdo. Sem suporte ao observer, o texto continua visível.

O parallax é limitado a 18 px, em desktop, usando `requestAnimationFrame` e listener passivo. Nenhum mecanismo sequestra a rolagem. `prefers-reduced-motion` desativa as animações e o autoplay dos vídeos; a reprodução manual permanece disponível. Cabeçalho, navegação móvel, Escape, foco e link para pular conteúdo foram preservados.

## Mídias e conteúdo

Os logotipos e dois vídeos oficiais continuam presentes. Foram incorporadas quatro fotografias licenciadas do Pexels, em WebP local de 800/1600 px. Os créditos, tamanhos, fontes e aplicações constam no [plano de mídias](MIDIAS.md). Não há hotlinks de fotos ou mídia da Starlink.

Não existem capturas reais dos sistemas disponibilizadas nesta etapa. Os mockups são demonstrativos e os três projetos continuam em desenvolvimento dentro da DEV. Saúde mantém atuação educacional; a Store mantém catálogo vazio até existirem ofertas reais aprovadas. Não há nova divisão, backend, checkout ou oferta de acesso à internet.

## Validação

- TypeScript: `tsc --noEmit` aprovado.
- Build Vite: aprovado; 57 módulos. JavaScript: aproximadamente 286,63 kB (90,04 kB gzip); CSS: 71,15 kB (15,03 kB gzip).
- `verify:build`: aprovado; base `/lbconexao/`, recursos oficiais presentes, sem arquivos de ambiente ou endpoints legados no bundle.
- Playwright/Chromium: 15 testes aprovados. Incluem 14 rotas em cinco larguras (320, 390, 768, 1440 e 1920 px), carregamento das imagens, ausência de overflow horizontal, recarga de rotas, erros do navegador, menu móvel, formulário, filtros, FAQ, links externos, movimento reduzido, vídeo manual, fallback sem observer e parallax limitado.
- 48 capturas: oito páginas, primeira dobra e página completa, em desktop 1440 × 900, tablet 768 × 1024 e celular 390 × 844.
- Inspeção visual realizada nas capturas do Chromium e comparação com os registros V2 disponíveis. A revisão levou à correção de acentos, redução da repetição no Portfólio e eliminação da emenda visual na fotografia DEV.
- `git diff --check`: sem erros de whitespace.

[Abrir capturas e comparações](README.md). As imagens estáticas usam movimento reduzido para estabilizar a captura; o funcionamento das animações também foi exercitado separadamente nos testes.

### Desempenho e limites da validação

Os resultados exatos do diagnóstico estão em [medicoes-locais.json](medicoes-locais.json). São duas navegações no Chromium local, com cache desabilitado: desktop sem limitação e celular com 1,6 Mbps, latência de 150 ms e CPU 4×. A fonte recebe preload, imagens reservam espaço e as mídias abaixo da primeira dobra carregam sob demanda.

| Última medição do build final | LCP | CLS |
| --- | ---: | ---: |
| Desktop local | 0,716 s | 0 |
| Celular com rede/CPU simuladas | 2,852 s | 0 |

O LCP móvel ficou acima da meta orientativa de 2,5 s. Houve variação entre execuções locais, portanto não se deve generalizar esta amostra. A estabilidade visual melhorou após antecipar a fonte: na última execução não houve deslocamentos registrados. O preload adicional da fotografia não trouxe ganho no experimento e não foi mantido. O diagnóstico foi reexecutado depois da consolidação do build; os 15 testes funcionais/visuais já haviam passado com esse mesmo código final.

Esses valores são uma amostra local, não uma certificação de Core Web Vitals. INP não foi medido, e ainda é necessária medição representativa após uma publicação autorizada. Não foram executados testes em aparelhos físicos, Safari ou Firefox, nem uma auditoria completa de acessibilidade com leitor de tela.

### Pendências

- Fotografias próprias autorizadas e capturas reais dos sistemas podem substituir os materiais ilustrativos no futuro.
- Ofertas, cursos e demonstrações operacionais dependem dos materiais reais, conforme o estágio informado pelo proprietário.
- Validar e, se necessário, otimizar o LCP móvel em ambiente representativo; medir INP. As metas de Core Web Vitals não são declaradas como atingidas.
- Permanecem as pendências de conteúdo/comerciais e da ferramenta legada de publicação documentadas na V2; não foram criadas novas funcionalidades comerciais nesta etapa.
- Revisão visual pelo proprietário e autorização explícita continuam necessárias antes de qualquer publicação.

## Visualização local

Na raiz `C:\Projetos\lbconexao`, execute `npm.cmd run dev` e abra **http://localhost:3000/lbconexao/**. Para servir o build, execute `npm.cmd run preview` e use o endereço exibido incluindo `/lbconexao/`.

O servidor de testes é encerrado automaticamente. Nenhum serviço fica exposto e nada foi publicado. As alterações permanecem no workspace e na branch local para revisão.

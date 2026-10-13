# Entrega local — LB Conexão Premium V2

12/10/2026 · Repositório `lbconexao/lbconexao` · Branch `redesign/premium-v2`.

O portal foi redesenhado na pasta existente, mantendo React/TypeScript/Vite, GitHub Pages e rotas com hash. Versão preparada para revisão local. Nenhum commit, push, merge ou deploy foi realizado.

## Resultado

- Home com composição azul profunda, tipografia forte, vídeo oficial, controles, três divisões, diferenciais, vitrine de projetos, processo, FAQ e chamadas de contato.
- Identidade original em cabeçalho, rodapé, Home e páginas das áreas, com contraste claro. Marca Store extraída da prancha conjunta oficial, sem redesenho.
- DEV: seis grupos de serviços, recursos típicos, orçamento com interesse pré-selecionado, tecnologias e produtos próprios.
- **Hotspot PIX, plataforma de questionários e sistema para clínicas** apresentados como **em desenvolvimento**, conforme confirmação do proprietário. Cada projeto tem página própria sob `/dev/produtos/`, mockup identificado e lista de recursos planejados. Não há afirmação de funcionalidades concluídas ou produtos disponíveis para contratação.
- Saúde: educação, treinamentos, capacitações, palestras, metodologia e agenda sem inscrições fictícias. Nenhuma oferta de atendimento clínico.
- Store: busca, categorias, filtros, contagem e estado vazio. Estrutura tipada para ofertas reais aprovadas, HTTPS e identificação de afiliados; sem preços, descontos, estoque, carrinho ou checkout inventados.
- Sobre, soluções, portfólio, contato, privacidade e página 404.
- Formulário com validação, nome, área, interesse, necessidade, funcionalidades e prazo. Prepara mensagem para revisão local; o visitante abre o WhatsApp e confirma o envio. Sem coleta em banco ou mensagem enviada automaticamente.
- Cabeçalho compartilhado, navegação móvel com estado acessível e Escape, foco por rota, link para pular conteúdo, FAQ nativo, contraste e suporte a movimento reduzido.
- Imagens, vídeos, CSS e fonte servidos localmente. Sem fontes/CDN/galerias de terceiros durante a navegação institucional.
- Metadados por rota, fallback estático institucional de Open Graph e imagem de compartilhamento.

## Materiais e desempenho

Originais preservados em `identidade_visual/`. Vídeos com 8 segundos, H.264, sem áudio, início progressivo e sem repetição obrigatória. Carregamento por visibilidade, pausa manual, pausa em aba oculta, economia de dados quando detectável, preferência por movimento reduzido e fallback de imagem.

| Item | Resultado |
| --- | --- |
| Primeiro vídeo | 1.466.690 → 527.212 bytes |
| Segundo vídeo | 2.657.545 → 1.071.692 bytes |
| Redução combinada dos vídeos | Aproximadamente 61% |
| Fonte Inter WOFF2 | 48.256 bytes, local, licença incluída |
| JavaScript de produção | 280,38 kB; 88,23 kB gzip |
| CSS de produção | 33,79 kB; 8,07 kB gzip |
| Mídia web total | Aproximadamente 2,05 MB, incluindo os dois vídeos |

O GIF original de 25 MB não é carregado pelo site. Não foram inventados indicadores de desempenho, nota Lighthouse ou métricas de campo.

## Validação concluída

| Verificação | Resultado |
| --- | --- |
| TypeScript (`npm run typecheck`) | Aprovado |
| Build Vite (`npm run build`) | Aprovado |
| Integridade do artefato (`npm run verify:build`) | Aprovado: base `/lbconexao/`, mídia presente, sem `.env`, `node_modules`, endpoints legados ou marcadores de chave no bundle |
| Playwright | **12 testes aprovados**, execução final em 59 segundos |
| Rotas e atualização da página | 14 rotas × 5 larguras = 70 combinações verificadas com recarregamento |
| Larguras | 320, 390, 768, 1440 e 1920 pixels |
| Imagens | Carregadas e validadas após entrar na área de visualização |
| Rolagem horizontal | Nenhuma nas combinações testadas |
| Navegação móvel | Abre, fecha, navega, responde a Escape e retorna foco |
| Formulário | Campos obrigatórios, mensagem codificada, revisão e invalidação após edição; nenhum envio externo automático |
| Store | Busca, filtro, limpar filtros e estado vazio sem produtos fictícios |
| Vídeo/reduced motion | Sem download automático de MP4 com movimento reduzido; reprodução e pausa manuais verificadas |
| FAQ/portfólio | FAQ abre; três projetos; Hotspot subordinado ao DEV |
| Links | 404 tratada, skip link, proteção `noopener` nos links externos |
| Auditoria npm de produção | **0 vulnerabilidades conhecidas** reportadas nesta execução |
| `git diff --check` | Sem erros de whitespace; avisos de conversão LF/CRLF do Git no Windows |
| Inspeção visual | Capturas reais de desktop e mobile da Home e três divisões |

Os testes não existiam no projeto inicial. Foram adicionados para os fluxos relevantes do redesign. A primeira execução identificou um overflow na órbita decorativa, corrigido antes da execução final. Os testes foram feitos em Chromium local; não constituem certificação de acessibilidade, auditoria de invasão, teste em aparelho físico, Safari ou Firefox.

O formulário foi testado até a preparação do link; nenhuma mensagem foi enviada ao contato. A titularidade/disponibilidade dos canais externos não foi comprovada. Busca com catálogo real dependerá do cadastro aprovado; a lógica do estado vazio e dos filtros foi validada.

## Arquivos alterados/criados

| Grupo | Arquivos |
| --- | --- |
| Entrada, rotas e ambiente | `App.tsx`, `index.html`, `vite.config.ts`, `.gitignore`, `package.json`, `package-lock.json` |
| Sistema visual e dados | `index.css`, `site.config.ts`, `constants.tsx` |
| Componentes | `components/SharedHeader.tsx`, `SharedFooter.tsx`, `Brand.tsx`, `Cinema.tsx`, `Primitives.tsx`, `Projects.tsx`, `RouteEffects.tsx` |
| Páginas | `pages/Hub.tsx`, `Dev.tsx`, `Saude.tsx`, `Store.tsx`, `Contact.tsx`, `Institutional.tsx` |
| Assets | `public/media/` com marcas, vídeos, pôsteres e compartilhamento; `public/fonts/` com Inter/licença |
| Testes e ferramentas | `playwright.config.ts`, `tests/site.spec.ts`, `scripts/verify-build.mjs`, `scripts/optimize-assets.py` |
| Documentação | `README.md`, este relatório, `docs/AUDITORIA_TECNICA.md`, `docs/AUDITORIA_SERVICOS_CNAES.md`, `docs/IDENTIDADE_VISUAL.md`, `docs/previews/` |

Os arquivos antigos `pages/Login.tsx`, `pages/Admin.tsx`, `googleSheetsApi.ts`, `supabaseClient.ts` e `components/InstagramFeed.tsx` foram preservados para revisão. Não são importados pela experiência pública. As rotas antigas de acesso exibem uma tela de indisponibilidade; o backend remoto não foi modificado.

## Pendências técnicas e comerciais

1. **Antes de publicar:** validar contrato social registrado/CNPJ e serviços com contador/jurídico. A [auditoria de CNAEs](AUDITORIA_SERVICOS_CNAES.md) é preliminar e lista cada serviço, referência, condição, texto adotado e pendência.
2. Confirmar e-mails, WhatsApp e perfis herdados do site. Aprovar a redação proposta de missão, visão, valores e política de privacidade. Não há endereço ou número cadastral inventado.
3. Incluir ofertas e turmas reais quando autorizadas. Confirmar futuros escopos implementados dos três projetos antes de mudar o status e divulgar demonstrações operacionais.
4. Corrigir autenticação, sessões e autorização do backend legado antes de reativar login/admin. A desativação na interface não corrige permissões do serviço remoto.
5. Restam **cinco alertas altos na cadeia da ferramenta de publicação `gh-pages`**, fora do bundle público. As correções compatíveis foram aplicadas; o downgrade sugerido pelo npm não foi forçado. Tratar antes de usar a ferramenta para publicação.
6. `.env.local` já era rastreado. O ignore novo não remove o histórico. A referência antiga de publicação contém esse arquivo e `node_modules`; a próxima publicação deve conferir que não permaneçam hospedados. A verificação local não expôs valores e o novo `dist/` não contém esses arquivos. Detalhes na auditoria técnica.
7. Configuração administrativa de Pages não acessível via API pública (404 sem autenticação). O HTML público responde 200 e coincide com o artefato da raiz de `origin/gh-pages`; conferir Settings → Pages antes de publicar.
8. SEO de SPA com hash: metadados mudam no navegador; prévias de robôs sem JavaScript usam o Open Graph institucional. Não há indexação individual garantida dos hashes.

## Revisar localmente

Na raiz do projeto:

```powershell
npm run dev
```

Abra `http://localhost:3000/lbconexao/`. Se a política do PowerShell bloquear `npm.ps1`, use `npm.cmd run dev`. As dependências já foram instaladas nesta máquina. Em outro clone, execute primeiro `npm ci`.

[Abrir índice das capturas](previews/README.md). As capturas são estáticas; o comando acima permite navegar, reproduzir os vídeos e revisar as interações. O servidor automático de testes foi encerrado ao final da validação.

## Publicação sugerida — somente após autorização

1. Revisar os textos, capturas e pendências; aprovar explicitamente a publicação.
2. Confirmar a configuração atual do GitHub Pages e resolver os alertas da ferramenta de deploy e a limpeza dos artefatos legados hospedados.
3. Executar `npm ci`, `npm run typecheck`, `npm run build`, `npm run verify:build` e `npm test`.
4. Revisar o diff e versionar apenas arquivos necessários. Não incluir ambiente local, caches, ferramentas temporárias, `node_modules` ou resultados transitórios.
5. Publicar exclusivamente o conteúdo gerado em `dist/` para a origem confirmada do Pages. Preservar `/lbconexao/` e as rotas hash. Não usar comandos que publiquem a raiz do repositório.
6. Conferir o site público após a publicação autorizada. Manter o commit anterior como referência de rollback; não reescrever histórico nem alterar o remoto.

Nenhum desses passos de escrita remota foi executado nesta entrega.

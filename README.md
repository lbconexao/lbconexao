# LB Conexão — ecossistema institucional
Portal local em React, TypeScript e Vite, preparado para o GitHub Pages em `/lbconexao/`.

Exatamente três áreas: **DEV**, **Saúde** e **Store**. Hotspot PIX, plataforma de questionários e sistema para clínicas são projetos em desenvolvimento da DEV.

## Executar localmente

Recomendado: Node.js 22.12+ (validação feita com Node 24).

```powershell
npm ci
npm run dev
```

Abra **http://localhost:3000/lbconexao/**. No Windows, se a execução de `npm.ps1` estiver desabilitada, use `npm.cmd` nos mesmos comandos. Nenhuma chave Gemini, conta Supabase ou serviço de backend é necessário para este portal.

## Validar

```powershell
npm run typecheck
npm run build
npm run verify:build
npm test
```

O Playwright usa Chromium. Em uma nova máquina, instale-o com `npx playwright install chromium`. Para aproveitar um Chromium já instalado, informe o caminho em `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Os testes iniciam e encerram um servidor local na porta 4173 e não enviam mensagens de WhatsApp.

Para examinar o build: `npm run preview` e abra o endereço impresso, incluindo `/lbconexao/`.

## Conteúdo e estrutura

- `site.config.ts`: contatos, três divisões, serviços, projetos e catálogo de ofertas. A lista `publicationPending` centraliza as confirmações que faltam.
- `pages/`: Home, DEV, Saúde, Store, contato e páginas institucionais.
- `components/`: marcas, cabeçalho, rodapé, vídeo, portfólio e seções compartilhadas.
- `public/media/`: cópias otimizadas da identidade oficial, pôsteres e vídeos.
- `identidade_visual/`: originais fornecidos pelo proprietário, preservados.
- `public/fonts/`: Inter WOFF2 local e licença.
- `tests/`: validação de rotas, responsividade, formulário, navegação, Store, vídeos e acessibilidade básica.
- `docs/`: auditorias, instruções, relatório e capturas.

A Store só renderiza ofertas aprovadas com URL HTTPS. Não cadastrar preços ou materiais fictícios. O formulário prepara uma mensagem no navegador; o visitante revisa e confirma o envio no WhatsApp. Não há coleta em banco de dados.

As rotas `/#/login` e `/#/admin` estão preservadas como telas de indisponibilidade. Os arquivos antigos de administração/integração continuam no repositório, mas não integram o bundle público. Reativação depende de correção da autenticação e autorização no servidor.

## Revisar antes de publicar

- [Revisão para GitHub Desktop — 13/10/2026 e texto do commit](docs/REVISAO_GITHUB_DESKTOP.md)
- [Refinamento visual V3 — relatório](docs/v3/RELATORIO_V3.md)
- [V3 — capturas desktop, tablet e celular / comparação com V2](docs/v3/README.md)
- [V3 — mídias utilizadas e pendências](docs/v3/MIDIAS.md)
- [Relatório da entrega](docs/RELATORIO_REDESIGN.md)
- [Prévias desktop e mobile](docs/previews/README.md)
- [Auditoria técnica e GitHub Pages](docs/AUDITORIA_TECNICA.md)
- [Auditoria preliminar de serviços/CNAEs](docs/AUDITORIA_SERVICOS_CNAES.md)
- [Identidade visual e otimização](docs/IDENTIDADE_VISUAL.md)

Refinamento atual na branch local `redesign/cinematic-v3`, criada a partir de `redesign/premium-v2`, preservando o trabalho existente. **Não houve push, merge ou deploy.**

O site público atual é https://lbconexao.github.io/lbconexao/. Os arquivos públicos correspondem à referência `origin/gh-pages` na raiz; a configuração administrativa do Pages ainda deve ser conferida em Settings → Pages. Preserve `HashRouter` e o caminho base do Vite.

Após autorização explícita, revisar as pendências documentadas, realizar os checks, aprovar o diff e preparar a publicação somente do conteúdo de `dist/`. O script legado `npm run deploy` realiza escrita remota e **não deve ser executado como teste**. Há alertas pendentes na dependência de publicação, documentados na auditoria técnica. O histórico da branch antiga contém arquivos de ambiente e dependências que devem ser excluídos do conteúdo publicado em uma atualização autorizada.

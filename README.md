# LB Conexão — ecossistema institucional
Portal local em React, TypeScript e Vite, preparado para o GitHub Pages em `/lbconexao/`.

Exatamente três áreas: **DEV**, **Saúde** e **Store**. Hotspot PIX, plataforma de questionários e sistema para clínicas são projetos em desenvolvimento da DEV.

## Executar localmente

Recomendado: Node.js 24, definido em `.node-version` e utilizado pelo workflow preparado.

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

- [Migração para main e GitHub Actions — consolidação local e próximos passos](docs/MIGRACAO_GITHUB_PAGES.md)
- [Revisão para GitHub Desktop — 13/10/2026 e texto do commit](docs/REVISAO_GITHUB_DESKTOP.md)
- [Refinamento visual V3 — relatório](docs/v3/RELATORIO_V3.md)
- [V3 — capturas desktop, tablet e celular / comparação com V2](docs/v3/README.md)
- [V3 — mídias utilizadas e pendências](docs/v3/MIDIAS.md)
- [Relatório da entrega](docs/RELATORIO_REDESIGN.md)
- [Prévias desktop e mobile](docs/previews/README.md)
- [Auditoria técnica e GitHub Pages](docs/AUDITORIA_TECNICA.md)
- [Auditoria preliminar de serviços/CNAEs](docs/AUDITORIA_SERVICOS_CNAES.md)
- [Identidade visual e otimização](docs/IDENTIDADE_VISUAL.md)

A `main` local já foi consolidada até o commit `54bed39`, preservando o redesign V2/V3 e todo o histórico. Ela está selecionada e acompanha `origin/main`. As configurações de migração permanecem como alterações locais para o proprietário fazer Commit e Push pelo GitHub Desktop. Não foi criado novo commit nem feito push ou deploy pelo assistente.

O site público atual é https://lbconexao.github.io/lbconexao/. A consulta à API confirmou Source ainda em `legacy`, branch `gh-pages`, raiz `/`. O ambiente `github-pages` já permite `main`. Falta o proprietário selecionar **Settings → Pages → Source → GitHub Actions**, antes do primeiro Push da migração. O acesso disponível ao assistente é somente de leitura, sem permissão para alterar essa configuração. Preserve `HashRouter` e o caminho base do Vite.

O único mecanismo de produção preparado é `.github/workflows/deploy-pages.yml`. Após a consolidação autorizada e a seleção manual de **Source: GitHub Actions**, pushes na main executarão instalação, typecheck, build, verificação do artefato, testes e publicação exclusiva de `dist/`. A execução manual também está limitada à main. O script e a dependência legados `gh-pages` foram removidos; não executar `npm run deploy` nem copiar arquivos manualmente para gh-pages.

Na rotina futura, usar main para alterações comuns pelo GitHub Desktop, sem criar uma branch a cada atualização. Validar e revisar antes do Commit + Push. A branch gh-pages antiga ficará preservada, mas não será a origem do novo fluxo. Consulte o plano de migração para a ordem correta de ativação e os limites da validação local.

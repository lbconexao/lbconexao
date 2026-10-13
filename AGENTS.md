# Fluxo de trabalho da LB Conexão

- A consolidação local da V3 na `main` foi autorizada e realizada. Usar `main` para alterações comuns. Não criar uma branch automaticamente a cada atualização. Branches temporárias somente quando solicitadas ou justificadas pelo risco, preservando o trabalho existente.
- O proprietário reservou o Commit e o Push para si, pelo GitHub Desktop. Preparar e validar as alterações, mas não executar esses comandos sem uma nova instrução explícita que altere essa preferência.
- Respeitar o escopo de autorização da sessão para commit, push, deploy e configurações remotas. Após a ativação do novo fluxo, um push na `main` poderá publicar o site.
- A publicação oficial será `.github/workflows/deploy-pages.yml`, com artefato exclusivamente de `dist/`. Não restaurar scripts que copiem arquivos para `gh-pages` nem criar outro fluxo concorrente.
- Antes do envio, executar typecheck, build, `verify:build` e testes disponíveis. Não versionar `.env.local`, `node_modules`, `dist` ou resultados de testes.
- Preservar DEV, Saúde e Store, com Hotspot PIX dentro da DEV. Projetos em desenvolvimento e materiais demonstrativos devem continuar identificados.
- Consultar `docs/MIGRACAO_GITHUB_PAGES.md` para a estratégia de integração, sequência de ativação e limites da validação local.

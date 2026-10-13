# Migração para main e GitHub Actions

## Estado atual — Fase B local

O proprietário autorizou a consolidação, reservando expressamente **Commit e Push para o GitHub Desktop**. A main local foi avançada de `497c275` para `54bed39` e está selecionada, acompanhando `origin/main`. Não foi criado nenhum commit novo, stash, merge commit ou branch. As branches anteriores e seus commits foram preservados.

O avanço foi realizado com `git fetch . refs/heads/redesign/cinematic-v3:refs/heads/main`, depois de confirmar que main não divergia do remoto e era ancestral da V3. Esse fetch local aceita o avanço direto, sem force, e evita fazer checkout da versão antiga enquanto existem alterações pendentes. Em seguida, `git switch main` selecionou a mesma árvore V3. Assim, não foi necessário o stash previsto inicialmente nem trocar o conteúdo do `.env.local`.

Antes da operação, as nove configurações/documentos da preparação foram copiados para uma pasta ignorada em `.tools/`. Seus hashes e o hash do arquivo local de ambiente foram conferidos após a troca, sem expor valores: todos preservados. A main está um commit à frente de origin/main porque inclui o commit V3 já criado pelo proprietário. O novo commit de migração ainda será feito por ele.

Foi acrescentado `.gitattributes` para manter LF nos arquivos YAML e `.node-version`, evitando conversão desnecessária entre Windows e Linux. `AGENTS.md` e README agora registram a main como branch cotidiana e a preferência por Commit/Push manuais.

### Validação após a consolidação

Na main consolidada, `npm run typecheck`, `npm run build` e `npm run verify:build` passaram. O artefato contém 24 arquivos, com base `/lbconexao/`. Os 15 testes Playwright passaram em 2,5 minutos, incluindo rotas, formulário, menu móvel, responsividade, capturas, movimento reduzido e fallback sem IntersectionObserver. As evidências desta execução estão no diretório local ignorado `test-results/phase-b/`.

A execução remota do workflow e a atualização do site público dependem da configuração do Source e do Push pelo proprietário; ainda não foram realizadas.

### Única configuração remota identificada como pendente

Consulta autenticada em modo somente leitura confirmou:

- Pages: `build_type: legacy`, Source `gh-pages`, caminho `/`.
- Branch padrão do repositório: `main`.
- Ambiente `github-pages`: regras explícitas para `gh-pages` **e `main`**, portanto não é preciso acrescentar a main.
- A credencial padrão do Git disponível ao assistente tem somente leitura, sem permissão administrativa/manutenção/escrita. A consulta administrativa de permissões de Actions respondeu HTTP 403. Nenhuma credencial foi exibida ou gravada no repositório.

O proprietário precisa abrir [Settings → Pages](https://github.com/lbconexao/lbconexao/settings/pages) e mudar **Build and deployment → Source → GitHub Actions** antes de fazer Push da migração. Não selecionar main/root em publicação por branch e não criar outro workflow nos templates sugeridos. A conta usada no GitHub Desktop pode ter permissões diferentes da credencial disponível ao assistente.

Não é possível afirmar que somente Commit/Push bastam enquanto o Source continuar em gh-pages. A configuração acima é feita uma única vez; depois, o fluxo normal será Commit + Push na main, checks e publicação pelo workflow.

### Commit a ser feito pelo proprietário

No GitHub Desktop, confirmar **Current branch: main**, manter selecionadas as alterações da migração e usar:

Summary:

```text
Configura publicação automática do site pela main
```

Description:

```text
- Adiciona workflow oficial do GitHub Pages com Node 24.
- Exige typecheck, build, verificação do artefato e testes antes do deploy.
- Publica somente dist/ e impede deployments simultâneos.
- Remove o script e a dependência legados gh-pages.
- Preserva o redesign V2/V3, as mídias e as rotas existentes.
- Documenta a rotina pela main e mantém evidências de CI fora dos arquivos versionados.
```

Fazer **Commit to main** antes de **Push origin**. O primeiro Push enviará o commit V3 já existente e o novo commit de configuração. Não usar Publish branch nem voltar para redesign/cinematic-v3. Conferir o workflow na aba Actions e o site público após a execução; essa confirmação só será possível depois do envio pelo proprietário.

## Histórico da Fase A

Preparação local em 13/10/2026. Nenhum merge, commit, push, deploy, exclusão de branch ou alteração das configurações remotas foi executado naquela fase. O `git fetch origin` atualizou apenas as referências remotas. Durante a Fase A, a branch de trabalho permaneceu `redesign/cinematic-v3`.

## Diagnóstico com evidências

O workspace estava limpo antes desta preparação. Remoto confirmado: `https://github.com/lbconexao/lbconexao.git`.

| Referência após fetch | Commit | Resultado da comparação |
| --- | --- | --- |
| `main` e `origin/main` | `497c275` | Mesmo commit; versão anterior ao redesign |
| `redesign/premium-v2` | `497c275` | Mesmo commit e mesma árvore de arquivos da main; sem commits exclusivos |
| `redesign/cinematic-v3` e `origin/redesign/cinematic-v3` | `54bed39` | Um commit à frente da main, já enviado ao remoto pelo proprietário |
| `origin/gh-pages` | `232b6ad` | Artefato antigo de publicação; preservado |

O commit exclusivo da V3 é `54bed39 — Atualiza o site LB Conexão com redesign cinematográfico V3`. Não há branch V2 remota no resultado do fetch. As comparações `main...V2`, `main...V3` e `V2...V3` retornaram, respectivamente, `0/0`, `0/1` e `0/1` commits exclusivos. `merge-base --is-ancestor` confirmou que main e V2 são ancestrais da V3.

A comparação de arquivos entre main e V2 está vazia. Entre main e V3 há 135 arquivos alterados/adicionados/removidos, incluindo código, mídias, documentação, testes e a retirada do `.env.local`.

**Limite importante da comparação:** a branch chamada V2 não contém um commit separado com o redesign V2. O trabalho das duas etapas foi reunido no commit da V3. Portanto, o Git comprova que não existe commit exclusivo da branch V2 que ficaria de fora; não oferece um snapshot independente de todo o código V2 para comparar linha a linha.

Também foram verificados os arquivos atuais: as rotas institucionais estão em `App.tsx` e `pages/`, os componentes e regras do ecossistema em `components/` e `site.config.ts`, a base visual em `index.css`, a camada V3 em `visual-v3.css`, os originais em `identidade_visual/` e as mídias publicáveis em `public/`. Home, Sobre, DEV, Saúde, Store, Soluções, Portfólio, Contato e os três produtos DEV estão presentes. Hotspot PIX continua dentro da DEV. Esta preparação não alterou esses arquivos de apresentação, conteúdo ou mídia.

## Por que o site não mudou

A configuração **Deploy from a branch → gh-pages → /(root)** foi confirmada pelo proprietário. Nesta auditoria, a página pública respondeu HTTP 200 e referenciou `/lbconexao/assets/index-vGQowBPG.js`, exatamente o mesmo arquivo presente no HTML de `origin/gh-pages`.

O build local atualizado gera `index-BTfj0PPk.js` e `index-D_fO6-jH.css`. Portanto, enviar o código para `redesign/cinematic-v3` não substituiu o artefato que o Pages está servindo.

Nenhum workflow foi encontrado nas árvores Git de main, V2, V3 ou gh-pages. O mecanismo anterior era o script npm `gh-pages -d dist`. Não havia integração automática entre a main e o site. Não foi possível ler configurações administrativas autenticadas do Pages, pois o GitHub CLI não está disponível; a origem configurada foi tomada do relato confirmado pelo proprietário, e a versão pública foi conferida por HTTP.

## Preparação local entregue

| Arquivo | Finalidade |
| --- | --- |
| `.github/workflows/deploy-pages.yml` | Único workflow oficial de produção, preparado para push em main ou execução manual em main |
| `.node-version` | Node.js 24, compatível com a stack e com a validação local |
| `package.json`, `package-lock.json` | Removidos scripts `predeploy`/`deploy` e dependência `gh-pages`; lockfile atualizado |
| `playwright.config.ts` | Proibição de `test.only` em CI e prazo maior por teste no runner |
| `tests/site.spec.ts` | Permite salvar capturas e métricas em diretório de evidências de CI, sem sobrescrever a documentação visual aprovada |
| `AGENTS.md` | Registra o uso cotidiano da main após consolidação e evita criação automática de branches ou publicação fora da autorização da sessão |
| `README.md` e este documento | Instruções de integração, ativação e trabalho futuro |

O workflow usa dois jobs. O primeiro faz checkout, instala Node e dependências com `npm ci`, executa typecheck, gera o build, verifica `dist/`, instala Chromium e executa todos os testes. **O build precede os testes de navegador porque eles servem o conteúdo de `dist/`.** Somente depois de sucesso ocorre o upload do artefato. O segundo job depende do primeiro e publica no ambiente `github-pages`.

A base continua `/lbconexao/`, com HashRouter. Apenas `dist/` vai para o Pages; código-fonte, originais pesados, arquivos de ambiente, resultados dos testes e documentação de revisão não integram a publicação.

As duas etapas rejeitam refs diferentes de `refs/heads/main`, inclusive quando alguém escolhe outra branch na execução manual. O grupo de concorrência `pages-production`, com `cancel-in-progress: false`, impede deployments simultâneos e preserva uma execução já iniciada. O checkout não persiste credenciais. Não há PAT nem segredo adicional exigido.

Permissões globais são vazias. O build recebe apenas `contents: read` e `pages: read`; o deploy recebe `pages: write` e `id-token: write`. `configure-pages` usa `enablement: false`, sem tentar habilitar ou migrar a configuração do site automaticamente. Essa estrutura segue o [mecanismo oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Actions verificadas

Versões consultadas nos releases oficiais e fixadas por SHA completo no workflow:

| Action | Release |
| --- | --- |
| `actions/checkout` | [v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) |
| `actions/setup-node` | [v7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0) |
| `actions/configure-pages` | [v6.0.0](https://github.com/actions/configure-pages/releases/tag/v6.0.0) |
| `actions/upload-pages-artifact` | [v5.0.0](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0) |
| `actions/deploy-pages` | [v5.0.1](https://github.com/actions/deploy-pages/releases/tag/v5.0.1) |

O runner preparado é `ubuntu-24.04`. Chromium será instalado com `npx playwright install --with-deps chromium`, conforme o [fluxo de CI do Playwright](https://playwright.dev/docs/ci-intro). Não há cópia de arquivos nem push automático para gh-pages.

## Segurança

O `.env.local` da main foi inspecionado em memória, sem imprimir valores. Contém `GEMINI_API_KEY` de exemplo, URL pública do Supabase e token com claim de papel `anon`. Não foi identificada credencial privada nesses valores. A classificação do token não equivale a uma auditoria das permissões do banco ou à validação criptográfica de sua assinatura.

A V3 já removeu `.env.local` do acompanhamento. O arquivo local permanece ignorado. A integração por avanço da main preservará essa retirada; o histórico antigo e a branch gh-pages ainda contêm versões históricas, que não serão reescritas ou apagadas nesta migração.

O portal atual não requer essas configurações para instalar, testar, compilar ou publicar. Nenhuma variável secreta deve ser colocada em `VITE_*`, pois valores usados no frontend tornam-se públicos. Se uma revisão de outras versões identificar uma credencial privada real, a sequência será revogar/rotacionar no provedor, atualizar apenas ambientes autorizados, conferir logs/permissões e avaliar limpeza histórica somente com autorização específica. Não há indicação de rotação de uma credencial privada baseada no arquivo inspecionado nesta fase.

Com a remoção da ferramenta legada, `npm audit` passou de cinco alertas altos a **zero alertas reportados**, incluindo desenvolvimento e produção. Isso descreve a auditoria de dependências deste momento, sem prometer ausência geral de vulnerabilidades.

## Resultados da validação local

| Verificação | Resultado |
| --- | --- |
| `npm ci` com o lockfile atualizado | Aprovado; instalação limpa, sem depender de node_modules anterior |
| `npm audit` | Zero alertas reportados em desenvolvimento e produção |
| `npm run typecheck` | Aprovado |
| `npm run build` | Aprovado; 57 módulos; arquivos CSS/JS iguais aos do build V3 revisado |
| `npm run verify:build` | Aprovado; 24 arquivos no artefato |
| `npm test` com `CI=true` | 15 testes aprovados em 2,5 minutos |
| Evidências dos testes | 48 capturas e diagnóstico salvos em `test-results/phase-a/`, ignorados pelo Git; documentação visual V3 preservada |
| Workflow | `actionlint` 1.7.12 aprovado; binário oficial com checksum SHA-256 conferido antes da execução |
| Compatibilidade de caminhos | 57 imports relativos conferidos, sem divergência de maiúsculas/minúsculas nos nomes dos arquivos |

Os testes incluem as rotas em cinco larguras, imagens, ausência de overflow, navegação por teclado/menu móvel, formulário, filtros, links, vídeos, movimento reduzido e fallback. O build mantém as marcas e fotografias locais. Nenhum teste envia a mensagem de WhatsApp ou publica o site.

O validador foi executado localmente, não como execução do workflow no GitHub. O resultado de build, testes e validação estática não confirma um deploy remoto.

## Plano original de integração — referência da Fase A

A consolidação local já foi realizada pela alternativa de avanço direto descrita no início deste documento, sem stash e sem criar commit. Os passos abaixo registram o plano originalmente apresentado; não devem ser repetidos no estado atual. Commit e Push ficaram reservados ao proprietário por sua instrução posterior.

1. Executar novo fetch e status. Confirmar que main continua ancestral da V3. Se houver novos commits divergentes, rever o plano antes de integrar.
2. Preservar as alterações locais de preparação, inclusive arquivos novos, em armazenamento temporário do Git (`stash` com arquivos não rastreados), sem incluir caches ou dependências. Guardar separadamente uma cópia temporária protegida do `.env.local` fora do versionamento: a main antiga ainda rastreia esse caminho e a integração o retira.
3. Selecionar a main e integrá-la por `git merge --ff-only redesign/cinematic-v3`. Essa estratégia avança a main sem reescrever commits e falha em vez de sobrescrever uma divergência. Não há conflito previsto com as referências auditadas.
4. Reaplicar a preparação na main, restaurar o arquivo local de ambiente como ignorado e conferir que nenhuma mídia, rota ou alteração do proprietário foi perdida. Manter o stash de recuperação até confirmar a reaplicação.
5. Reexecutar instalação/validações pertinentes e revisar o diff. Preparar o commit de migração na main. Nenhuma branch antiga será apagada e nenhuma nova branch permanente será criada.
6. Com código e commit revisados, realizar a configuração manual e o Push pelo GitHub Desktop na ordem descrita abaixo.
7. Conferir os jobs no Actions, a URL retornada pelo deploy e o site público em desktop/celular. Somente então declarar a publicação concluída.

Essa estratégia preserva `54bed39` integralmente no histórico. O commit de migração acrescentará o workflow, a retirada do mecanismo legado e as configurações/documentação preparadas.

## Momento correto de mudar o Source

**Não mudar o Source durante a Fase A.** Depois da integração e validação local autorizadas, com o commit de migração pronto na main, e **antes do primeiro Push origin da main**, o proprietário deverá selecionar:

`Repository → Settings → Pages → Build and deployment → Source → GitHub Actions`

Não selecionar `main / (root)` em Deploy from a branch: a raiz contém código React/TypeScript, não o artefato compilado. Não criar um segundo workflow a partir dos templates sugeridos pelo GitHub; o arquivo preparado já cumpre essa função. A seleção de Source segue as [instruções oficiais](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Conferir também se Actions está permitido no repositório e se o ambiente `github-pages` permite deployments da main; uma restrição antiga exclusiva para gh-pages precisará ser ajustada pelo proprietário. Depois, fazer Push origin na main e acompanhar `Deploy LB Conexao to GitHub Pages` na aba Actions.

Caso o push seja feito antes de alterar o Source, mudar a configuração após autorização e executar novamente o workflow em main. Execução manual só estará disponível quando o workflow estiver na branch padrão. Não usar `npm run deploy`; esse comando foi retirado para evitar processos concorrentes.

## Rotina após ativação

GitHub Desktop → selecionar main → abrir VS Code → alterar → revisar localmente → validar → Commit na main → Push origin → acompanhar Actions → conferir o site.

Atualizações comuns não exigirão criar branches. Cada push na main poderá publicar uma nova versão após os checks. Falhas de build/testes impedem o job de deploy. As branches V2, V3 e gh-pages ficam preservadas como referências; não participam da rotina de publicação.

Se for necessária recuperação após a ativação, preferir reverter um commit de código na main e publicar novamente, preservando o histórico. Voltar temporariamente para a fonte gh-pages exige decisão explícita e revisão do conteúdo antigo, inclusive arquivos de ambiente e dependências históricas; não é um rollback automático preparado nesta fase.

## Limites da preparação

Validar localmente não testa a autorização OIDC, as políticas do ambiente, as permissões de Actions do repositório ou o deploy remoto. Esses pontos só poderão ser confirmados na Fase B. Não se afirma que o novo site já foi publicado.

A validação local foi feita no Windows com Node 24 e Chromium; o job remoto rodará em Ubuntu. As verificações estáticas, instalação pelo lockfile e testes locais reduzem riscos, mas a primeira execução remota ainda precisa ser acompanhada. As pendências de conteúdo e métricas de desempenho da V3 permanecem documentadas e não foram alteradas por esta configuração de publicação.

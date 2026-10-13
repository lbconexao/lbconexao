# Auditoria do clone e da publicação

Data: 12/10/2026. Diretório: `C:\Projetos\lbconexao`.

Atualização de 13/10/2026: na [revisão para GitHub Desktop](REVISAO_GITHUB_DESKTOP.md), o `.env.local` foi retirado do índice Git, preservando o arquivo local. A descrição abaixo registra o estado encontrado em 12/10; o histórico não foi reescrito. Os cinco alertas da ferramenta de publicação foram reconfirmados.

## Origem e integridade

- `git remote -v`: fetch/push em `https://github.com/lbconexao/lbconexao.git`, conforme briefing.
- Branch inicial: `main`. Arquivos rastreados sem alterações antes do trabalho. A pasta `identidade_visual/` já estava adicionada pelo usuário, ainda sem rastreamento.
- Branch local criada: `redesign/premium-v2`. Nenhum commit, push, merge ou deploy executado.
- Os sete arquivos originais de identidade visual foram preservados. Os assets web são derivados em `public/media`.
- Stack mantida: React, TypeScript, Vite e React Router com `HashRouter`.

## Evidências do GitHub Pages

- URL pública consultada: `https://lbconexao.github.io/lbconexao/`, resposta HTTP 200.
- O HTML público carrega `/lbconexao/assets/index-vGQowBPG.js`.
- A referência local `origin/gh-pages`, commit `232b6ad`, tem `index.html` na raiz e referencia exatamente esse mesmo asset.
- O script existente de publicação usa `gh-pages -d dist`. O caminho base do Vite era e continua sendo `/lbconexao/`.
- Essas evidências vinculam o site atual ao artefato da branch `gh-pages`, na raiz. A API pública `/repos/lbconexao/lbconexao/pages` respondeu 404 sem autenticação: a seleção administrativa em Settings → Pages não foi lida. Confirmar visualmente `gh-pages` / `(root)` antes da publicação, sem alterar a origem por suposição.
- As rotas `/`, `/dev`, `/saude`, `/store`, `/login` e `/admin` continuam existindo com hash. As duas últimas exibem uma página de indisponibilidade durante a revisão do backend.

## Problemas encontrados e tratamento

| Encontrado | Tratamento nesta versão |
| --- | --- |
| Produtos gerados artificialmente com preço, desconto e descrição | Removidos do catálogo; `offers` vazio, com contrato tipado para conteúdo aprovado |
| Cursos e preços demonstrativos no arquivo de constantes | Dados fictícios retirados; agenda sem turmas inventadas |
| Fotografias aleatórias simulando Instagram | Componente legado fora do grafo público; apenas links de perfis herdados |
| Marca substituída por ícones genéricos | Identidade original em header, footer e áreas |
| Tailwind em CDN e link para CSS inexistente | CSS local responsivo, sem dependência de CDN |
| Injeção genérica de GEMINI_API_KEY pelo Vite | Removida da configuração; nenhuma API de IA exigida pelo portal |
| `.gitignore` em codificação inadequada | Normalizado em UTF-8 e ampliado para build, caches e arquivos de ambiente |
| Autorização administrativa baseada em `localStorage` e login com senha em URL | Rotas públicas não carregam mais `Login.tsx`, `Admin.tsx` ou `googleSheetsApi.ts`; código preservado para migração |
| Integrações Supabase/Sheets e respostas comerciais não confirmadas | Não requisitadas pelo portal; vitrines aguardam catálogo aprovado |
| Vídeos originais com áudio | Cópias H.264 sem áudio, faststart, carregamento sob demanda e sem repetição obrigatória |
| Ausência de fallback/reduced motion | Pôster local, fallback de erro e ausência de autoplay/download com preferência por movimento reduzido |

## Segurança do legado: limite da intervenção

Desativar o painel na nova interface não corrige o serviço Google Apps Script remoto. É necessário revisar autenticação, sessões, autorização por operação e tratamento de senhas no backend antes de reativar o acesso. Não foram feitas gravações no serviço, testes de credenciais nem mudanças no banco de dados.

O arquivo `.env.local` já está rastreado na origem; adicioná-lo ao `.gitignore` não retira o arquivo do histórico. A inspeção sem exposição de valores identificou uma chave Gemini de exemplo e configurações públicas de Supabase (URL/anon). O build novo não importa esse cliente e não inclui o arquivo. A referência histórica `origin/gh-pages` também contém `.env.local` e `node_modules`; no próximo processo de publicação, conferir a remoção desses artefatos do conteúdo hospedado. Se o proprietário identificar algum segredo real em versões anteriores, sua rotação deve ser tratada separadamente. Esta sessão não reescreveu histórico nem alterou credenciais.

Atualizações compatíveis de dependências corrigiram 12 dos 17 alertas inicialmente reportados. Permanecem cinco alertas de severidade alta na cadeia de desenvolvimento/publicação `gh-pages → globby → fast-glob → micromatch → braces`. A correção automática restante propõe downgrade fora da faixa declarada; não foi aplicada à força. O comando de deploy não foi executado. Ver o relatório final para resultado da auditoria das dependências de produção.

## Conteúdo e SEO

- Contatos e perfis existentes foram centralizados, sem inventar dados cadastrais. Titularidade deve ser confirmada antes da publicação.
- Sem números de clientes, satisfação, vendas, alunos, endereços ou certificações não comprovados.
- Metadados por rota no navegador, Open Graph estático e imagem local de compartilhamento.
- Limite do SPA com hash: crawlers que não executam JavaScript utilizam o título/OG institucional de `index.html`. Não há promessa de indexação ou prévia social exclusiva por hash. A evolução para páginas HTML pré-renderizadas pode ser discutida sem alterar agora as rotas existentes.
- Sem coleta automática do formulário, analytics ou cookies próprios. A mensagem é preparada localmente e o visitante confirma o envio no WhatsApp.

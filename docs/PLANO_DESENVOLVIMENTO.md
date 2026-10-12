# Planejamento de desenvolvimento do Portal MESC

Avaliação em 12 de outubro de 2026, baseada em `Requisitos_Portal_MESC_Desenvolvimento (1).docx`, versão 1.0 de setembro de 2026, e no código e ambiente local disponíveis nesta data.

O projeto tem uma base de desenvolvimento funcional, autenticação e páginas públicas iniciais. A próxima entrega deve transformar essa base em um portal administrável: autorização, fluxo editorial, conteúdo estruturado, português/inglês, navegação acessível e integração por links com os sistemas existentes. O painel atual ainda não é um CMS operacional.

## Como interpretar o andamento

- **Feito:** entrega delimitada implementada e com evidência no código ou validação local. Não significa homologação em produção.
- **Em andamento:** implementação parcial encontrada. Não implica que alguém esteja trabalhando ativamente no item.
- **Falta fazer:** não foi encontrada implementação suficiente para o requisito. Infraestrutura externa e validações institucionais não inspecionadas ficam explicitamente pendentes.
- **P0:** obrigatório antes da publicação, conforme a especificação.
- **P1:** primeira evolução, após a base P0, salvo dependências necessárias à publicação.
- **P2:** evolução opcional, com justificativa de benefício.

Não foi atribuído percentual global: uma tela estática, um módulo editorial e uma auditoria têm esforços e critérios de conclusão diferentes. As referências CAPES, eMAG e WCAG são as do documento fornecido; este planejamento não constitui certificação ou revalidação normativa.

## Quadro executivo

| Frente | Andamento | O que já existe | O que falta entregar | Prioridade e etapa |
|---|---|---|---|---|
| Ambiente local | Feito no DEV | Docker/DevContainer funcionando; PostgreSQL `mesc_dev`; migrations e seeders executados | Homologação, produção, revisão das instruções antigas sobre SQLite e bootstrap reproduzível | P0, E0/E6 |
| Stack e componentes | Feito como base | Laravel, React/Inertia, Vite, componentes de cabeçalho, rodapé e formulários | Consolidar padrões acessíveis e confirmar compatibilidade da hospedagem UFF | P0, E0/E2 |
| Cadastro, login e logout | Feito como base | Cadastro/login confirmados pelo usuário; atribuição de `colaborador`; limitação de tentativas de login | Política de provisionamento do CMS, autorização por ação e testes de regressão | P0, E1 |
| Perfis e permissões | Em andamento | Spatie Permission; `admin` e `colaborador` no seeder | Administrador/editor/revisor/tradutor; matriz de ações; proteção no backend e interface | P0, E1 |
| Painel e publicação | Em andamento | `/dashboard` autenticado com cartões visuais | CRUD, revisão, publicação/arquivamento, prévia e trilha de auditoria | P0, E1 |
| Home e identidade | Em andamento | Layout, marca MESC, destaques, notícias e eventos de exemplo | Marca UFF validada, conteúdo real, destinos funcionais e retirada da rotação automática do carrossel | P0, E2/E3 |
| Menus e rodapé | Em andamento | Componentes e árvore de navegação fixa | Menu por teclado/toque, reduzir profundidade, gestão no CMS, links válidos, acessibilidade e privacidade | P0, E2 |
| O Programa | Em andamento | `/sobre`, histórico, missão e objetivos no código | Conteúdo aprovado editável, versão EN, estrutura organizacional e atualização editorial | P0, E3 |
| Curso e linhas de pesquisa | Falta fazer | Menções e âncoras no menu | Currículo, disciplinas completas, GESTÃO/ESI/PO e relações com docentes/projetos | P0, E3 |
| Docentes e discentes | Em andamento | Tabelas, seeder, controller e componentes de listagem | Registrar rotas; enriquecer perfis; gestão; validação dos dados publicáveis | P0 docentes, E3; discentes conforme decisão editorial |
| Notícias e documentos | Em andamento nas notícias; falta documentos | Cartões estáticos de notícias | Modelos, administração, páginas públicas, filtros, uploads e metadados | P0, E1/E3 |
| Ingresso e MESC Sistemas | Falta fazer | Itens provisórios no menu | Editais e instruções; landing page com URLs configuráveis de SIA/Seleções | P0, E3 |
| Produtos e impacto | Falta fazer | Referências textuais a projetos | Catálogos estruturados, relações, evidências e publicação aprovada | P0 mínimo, E4 |
| Português e inglês | Em andamento | Seletor PT/EN/ES, middleware e arquivos de tradução | Conteúdo EN completo/revisado, URLs por idioma, equivalência e estado de tradução | P0, E1–E5 |
| Busca global | Falta fazer | Nenhuma rota/mecanismo de busca identificado | Busca de conteúdo público publicado, documentos e tags | P0, E5 |
| Contato | Em andamento | Página, dados de contato, mapa e formulário visual | Validar contatos; decidir envio real ou remover formulário inativo; traduzir | P0 página, E3; envio é decisão de escopo |
| Acessibilidade | Em andamento | Elementos semânticos, alguns labels/alt e estilos responsivos | Teclado, foco, saltos, contraste, erros, zoom/reflow e auditoria por release | P0 transversal, E2–E6 |
| Segurança e operação | Em andamento | Proteções do framework, hashing, rate limit e configuração por ambiente local | Auditoria, uploads, privacidade, HTTPS, menor privilégio, backups e restauração | P0, E1/E6 |
| SEO e desempenho | Em andamento | Build Vite, título base, descrição genérica e `robots.txt` | Metadados por página, canonical/hreflang, sitemap, indexação e medições móveis | P0, E5/E6 |
| Testes e CI | Em andamento | Workflow de build/lint/testes; dois testes locais passando | Cobertura de autenticação, autorização, publicação, idioma, busca e links; testes PostgreSQL | P1 no documento; testes das entregas P0 acompanham cada etapa |
| Evoluções editoriais e integração | Falta fazer | Bases isoladas do Portal | Agenda, mídia, dissertações, destaques de egressos, prêmios, APIs e eventual SSO | P1/P2, E7 |

## Evidências e lacunas verificadas

1. `php artisan route:list --except-vendor` retornou 19 rotas. As páginas públicas de conteúdo registradas são `/`, `/sobre` e `/contato`; existem rotas de autenticação, idioma e `/dashboard`. Não há rotas de docentes, discentes, busca, notícias, documentos ou MESC Sistemas.
2. `PessoasController`, `Docentes.tsx`, `Discentes.tsx` e a migration de pessoas existem. As páginas recebem props Inertia; `resources/js/services/pessoas.ts` também declara chamadas a `/api/docentes` e `/api/discentes/turmas`, mas esses endpoints não estão registrados. Recomenda-se consolidar Inertia para essas páginas; API só se houver consumidor que a justifique.
3. `RegisteredUserController` atribui `colaborador` a todo cadastro. `RoleSeeder` cria apenas `admin` e `colaborador`. `/dashboard` exige `auth`, sem verificação de papel ou permissão.
4. Os cartões de `Dashboard.tsx` são elementos visuais sem ações de gestão. Não foram encontrados modelos/migrations de páginas editoriais, notícias, documentos, disciplinas, produtos ou casos de impacto.
5. `Header.tsx` abre submenus por `onMouseEnter` e tem quatro níveis. `menuData.ts` contém diversos destinos `#...` e rótulos provisórios. A árvore precisa ser revista segundo os menus do documento, com no máximo dois ou três níveis.
6. `Home.tsx` usa notícias/eventos fixos e um carrossel com avanço automático a cada cinco segundos, divergindo da orientação do documento.
7. `Contato.tsx` impede o submit com `preventDefault()` sem envio. Não deve ser apresentado como canal operacional antes de uma decisão de implementação.
8. Há seleção de idioma por sessão/query e traduções em `lang/`. Sobre, Contato, menu e rodapé contêm textos fixos em português. O atributo HTML `lang` é dinâmico, mas ainda não há arquitetura de URLs públicas equivalentes nem fluxo editorial de tradução.
9. `public/robots.txt` permite rastreamento geral; não foi identificado sitemap. A existência do arquivo `ssr.jsx` não comprova SSR implantado ou indexação adequada; isso precisa ser verificado no ambiente de homologação.
10. O teste de Home e um teste unitário de exemplo passaram nesta análise: **2 testes, 2 assertions**. Isso não cobre cadastro, permissões ou os critérios do documento. O CI usa PHP 8.2/Node 22/SQLite, enquanto o container usa PHP 8.3/Node 20 e o DEV agora usa PostgreSQL; alinhar a matriz e incluir PostgreSQL nas verificações pertinentes.
11. A abertura do DevContainer, build do frontend e conexão PostgreSQL foram validados nesta conversa. O cadastro/login foi confirmado pelo usuário. Não foram auditados produção, hospedagem UFF, acessibilidade visual, leitor de tela ou restauração de backups.

## Escopos de desenvolvimento e ordem de execução

| Etapa | Escopo de entrega | Dependências | Critério de conclusão |
|---|---|---|---|
| **E0 — Base reproduzível** | Documentar setup PostgreSQL, `.env`, migrations, seeders, assets e versões; confirmar hospedagem; registrar arquitetura Portal/Sistemas | Acesso às decisões de infraestrutura | Novo clone abre no DEV e conecta no banco correto; sequência de instalação testada e ambientes definidos |
| **E1 — CMS e autorização** | Matriz de papéis; provisionamento controlado; páginas/documentos; rascunho → revisão → publicado → arquivado; prévia; traduções e logs | E0; definição de quem edita, revisa e publica | Backend rejeita ações não permitidas; rascunhos não são públicos; publicação registra responsável/data; alteração PT sinaliza EN desatualizado |
| **E2 — Navegação acessível** | Cabeçalho UFF/MESC, menu por teclado/toque, menus editáveis, rodapé configurável, saltos, foco e templates | E1 para configuração; validação visual da UFF | Navegação sem mouse, sem destinos provisórios, utilizável a 320 px e zoom 200%; remover avanço automático da Home |
| **E3 — Conteúdo público essencial** | O Programa, Curso/disciplinas, linhas, docentes, notícias, biblioteca de documentos, ingresso, contato e MESC Sistemas | E1/E2; conteúdo e URLs oficiais | Conteúdo mantido pelo CMS; perfis e relações navegáveis; documentos com metadados; links de seleção funcionais; páginas essenciais PT/EN revisadas |
| **E4 — Produtos e impacto mínimos** | Product/Technology, ImpactCase e Evidence; relações com linhas, projetos e responsáveis; validação de publicação | E1 e entidades de E3; evidências aprovadas | Catálogos públicos operacionais; evidências privadas protegidas; ao menos conteúdo validado para homologar o fluxo, sem inventar resultados |
| **E5 — Busca, idioma e descoberta** | Busca global; URLs por idioma; canonical/hreflang; metadados; sitemap e exclusão de conteúdo privado da indexação | Esquemas E1/E3/E4; desenvolver idioma desde E1 | Busca encontra apenas conteúdo publicável, incluindo documentos; troca PT/EN preserva equivalente; metadados e sitemap validados |
| **E6 — Homologação e publicação** | Revisão editorial; auditoria de acessibilidade; segurança; desempenho móvel; HTTPS; backups/restauração; deploy e manual do CMS | Todos os P0 implementados e conteúdo aprovado | Checklist da seção 16 do documento preenchido; restauração comprovada; responsáveis aprovam conteúdo e operação |
| **E7 — Primeira evolução** | P1: agenda, mídia, infraestrutura, dissertações, egressos, prêmios, inserção/internacionalização, ODS, versões/agendamento; depois P2 úteis | Base publicada; responsáveis e demanda definidos | Aceite por módulo; APIs/SSO somente com necessidade e infraestrutura confirmadas |

Acessibilidade, tradução, autorização e testes fazem parte de cada entrega; E5/E6 consolidam a verificação, não iniciam esses trabalhos. O documento coloca produtos/impacto na fase 2, mas os define como P0 (IMP-002/003). Portanto, este plano inclui o mínimo de ambos antes do lançamento. Antecipar publicação sem eles exigiria uma revisão explícita do escopo e não atenderia integralmente à especificação.

### Recorte recomendado para começar

Primeiro incremento: base E0 e um fluxo completo de página institucional em E1. Implementar perfis, autorização, criação de rascunho PT/EN, revisão, publicação, arquivamento e auditoria. Usar “O Programa” como primeiro conteúdo real e validar o ciclo com a Secretaria/Coordenação. Em seguida, reutilizar esse fluxo em notícias e documentos. Critério de aceite: editor cria, revisor autorizado publica, tradutor trabalha no EN e visitante só recebe a versão publicada; tentativas indevidas retornam 403 e ficam cobertas por testes.

Os papéis exigidos são administrador, editor, revisor e tradutor. A distribuição exata de poderes de publicação deve ser aprovada pela coordenação. O atual `colaborador` precisa de mapeamento deliberado; não promover automaticamente todos os usuários existentes. Para um CMS institucional, recomenda-se provisionamento por administrador/convite e desativação do cadastro público antes de produção, salvo necessidade aprovada de contas públicas.

### Limites de escopo

- Preservar Laravel + React/Inertia + PostgreSQL como base proposta; não há requisito que justifique reescrita da stack.
- Portal administra conteúdo público e seu próprio banco. SIA e Seleções continuam responsáveis por matrícula, notas, inscrições e dados acadêmicos individualizados.
- Primeira versão integra os sistemas por links HTTPS configuráveis. Não acessar seus arquivos SQLite nem recriar formulários de candidatura no Portal.
- API de integração, reverse proxy e SSO são evoluções condicionais. Não são dependências para disponibilizar a landing page de sistemas.
- PT/EN é obrigatório; ES já tem base técnica, mas completar espanhol é expansão de escopo após o bilíngue exigido.
- Formulário de contato com entrega de e-mail é uma opção de produto, não requisito funcional explícito do documento. Entregar o envio validado ou publicar contatos diretos e retirar o formulário inativo.
- Não criar medição automática de indicadores CAPES, nem conteúdo/evidências fictícios. Implementar relações e campos para os responsáveis registrarem evidências reais.
- Datas e estimativas de esforço dependem da capacidade da equipe, conteúdo disponível e decisões institucionais. As etapas representam dependências e ordem de entrega, não compromissos de calendário.

## Matriz de rastreabilidade dos requisitos

Nesta matriz, “Em andamento” corresponde a atendimento parcial; “Feito” só vale no limite indicado. Prioridades são preservadas do documento.

### Identidade e navegação

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| VIS-001 | P0 | Em andamento | Cabeçalho MESC existe; validar/incluir marca oficial UFF, link da marca para Home e 320 px |
| VIS-002 | P0 | Em andamento | Seletor existe; completar equivalência PT/EN e conteúdo revisado em todas as páginas essenciais |
| VIS-003 | P0 | Falta fazer | Busca global de títulos, resumos, corpo, documentos e tags publicados |
| NAV-001 | P0 | Em andamento | Substituir dependência de hover por interação acessível de teclado/toque e validar mobile |
| NAV-002 | P1 | Em andamento | Há breadcrumb visual em páginas; criar componente semântico consistente |
| NAV-003 | P0 | Falta fazer | Acesso persistente à landing page MESC Sistemas, separado do login editorial |
| NAV-004 | P0 | Em andamento | Completar links legais/acessibilidade/mapa e assinaturas configuráveis; validar contatos |

### Conteúdo institucional e acadêmico

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| CON-001 | P0 | Em andamento | Migrar O Programa do código para CMS; aprovar PT/EN e registrar atualização |
| CON-002 | P0 | Falta fazer | Estrutura/matriz curricular vigente em HTML, documentos e histórico quando aplicável |
| CON-003 | P0 | Falta fazer | Entidade Disciplina com todos os campos acadêmicos e bibliografia estruturada |
| CON-004 | P0 | Falta fazer | Entidade ResearchLine para GESTÃO/ESI/PO e relações navegáveis |
| CON-005 | P0 | Em andamento | Completar perfil docente, vínculos e identificadores; registrar rotas e administração |
| CON-006 | P1 | Em andamento | Cards de laboratórios existem; desenvolver página e conteúdo institucional aprovado |
| CON-007 | P0 | Falta fazer | Repositório de normas/formulários/calendários com categoria, ano, versão e metadados |

### Produção e impacto

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| IMP-001 | P1 | Falta fazer | Dissertações com filtros, vínculo à produção e link ao RIUFF |
| IMP-002 | P0 | Falta fazer | Produtos/tecnologias com responsáveis, maturidade, alcance, resultados e evidências |
| IMP-003 | P0 | Falta fazer | Casos de impacto com resultados e evidências validadas; visibilidade controlada |
| IMP-004 | P1 | Falta fazer | Egressos de destaque com justificativas e fontes aprovadas |
| IMP-005 | P1 | Falta fazer | Prêmios com entidade concedente, ano, âmbito, participantes e comprovação |
| IMP-006 | P1 | Falta fazer | Inserção nacional/regional com período, participantes e evidências |
| IMP-007 | P1 | Falta fazer | Internacionalização baseada em ações reais de mobilidade, eventos e parcerias |
| IMP-008 | P1 | Falta fazer | Relação com ODS/temas de sustentabilidade, justificada e validada |

### Notícias e CMS

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| NEWS-001 | P0 | Em andamento | Substituir cartões estáticos por módulo editorial com URLs, metadados e imagens acessíveis |
| NEWS-002 | P1 | Em andamento | Substituir exemplos da Home por agenda administrável; .ics desejável |
| NEWS-003 | P1 | Falta fazer | Área de mídia com legendas/transcrições e sem autoplay |
| NEWS-004 | P2 | Em andamento | Rodapé tem links sociais provisórios; configurar destinos reais e compartilhamento |
| CMS-001 | P0 | Em andamento | Implementar os quatro perfis exigidos e autorização por ação |
| CMS-002 | P0 | Falta fazer | Fluxo editorial com autoria de publicação, prévia e isolamento de rascunhos |
| CMS-003 | P1 | Falta fazer | Histórico e recuperação de versões de páginas prioritárias |
| CMS-004 | P1 | Falta fazer | Agendar publicação/expiração com timezone definido |
| CMS-005 | P0 | Falta fazer | Menus editáveis com ordenação, ativação e profundidade limitada |
| CMS-006 | P0 | Falta fazer | Biblioteca de documentos, uploads validados e metadados completos |
| CMS-007 | P0 | Falta fazer | Estado editorial de tradução e sinalização de EN desatualizado após alteração PT |

### Acessibilidade

Não houve auditoria visual ou com leitor de tela nesta análise; recursos presentes não equivalem a conformidade.

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| A11Y-001 | P0 | Em andamento | Landmarks existem; revisar hierarquia de títulos e templates de autenticação |
| A11Y-002 | P0 | Falta fazer | Links de salto para conteúdo, menu e busca com destinos focáveis |
| A11Y-003 | P0 | Em andamento | Corrigir menus dependentes de mouse e validar toda a jornada por teclado |
| A11Y-004 | P0 | Em andamento | Padronizar foco visível, sem encobrimento, em todos os controles |
| A11Y-005 | P0 | Falta fazer | Medir contraste e corrigir falhas; não há auditoria comprovada |
| A11Y-006 | P0 | Em andamento | Revisar tamanhos e unidades; texto principal confortável e redimensionável |
| A11Y-007 | P0 | Falta fazer | Validar 200% de zoom e reflow a 320 CSS px |
| A11Y-008 | P0 | Em andamento | Breakpoints existem; homologar navegação e uso completo em celular |
| A11Y-009 | P0 | Em andamento | Aumentar alvos pequenos, especialmente idioma e ícones; meta 44×44 quando possível |
| A11Y-010 | P0 | Em andamento | Alguns alt existem; validar qualidade e exigir no CMS para imagens informativas |
| A11Y-011 | P0 | Em andamento | Há erros textuais de autenticação; revisar estados e indicadores de todos os componentes |
| A11Y-012 | P0 | Em andamento | Labels existem; associar erros, resumo e foco no primeiro erro |
| A11Y-013 | P0 | Falta fazer | Padrão de tabelas acessíveis e verificação nos módulos que as exibirem |
| A11Y-014 | P0 | Falta fazer | Critério editorial/técnico para mídia: legenda/transcrição e sem autoplay sonoro |
| A11Y-015 | P0 | Em andamento | `lang` dinâmico existe; testar PT/EN e marcar trechos em outro idioma |
| A11Y-016 | P0 | Falta fazer | Página Acessibilidade, testes documentados e canal de relato de barreiras |
| A11Y-017 | P1 | Falta fazer | Mapa hierárquico automático a partir da navegação publicada |
| A11Y-018 | P1 | Falta fazer | Avaliar opção de alto contraste após adequar o tema normal |
| A11Y-019 | P0 | Falta fazer | Registrar teste de zoom/preferências nativas; não depender de controles A+/A− |
| A11Y-020 | P1 | Falta fazer | Processo de revisão de PDFs essenciais e alternativas HTML |

### Integração e base técnica

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| INT-001 | P0 | Falta fazer | Landing page e configuração de SIA, Seleção Regular e Seleção Especial |
| INT-002 | P0 | Em andamento | Portal isolado localmente; comprovar isolamento de deploy/falhas na infraestrutura real |
| INT-003 | P0 | Feito no código inspecionado | Nenhum acesso aos SQLite das aplicações Ruby identificado; preservar essa restrição |
| INT-004 | P1 | Falta fazer, condicional | API/exportação de campos públicos apenas se houver necessidade confirmada |
| INT-005 | P0 | Em andamento | Sem integração SIA encontrada; validar campos publicáveis e ausência de exposição em todas as futuras interfaces |
| INT-006 | P0 | Falta fazer | Conteúdo público de ingresso com encaminhamento de candidatura ao sistema existente |
| INT-007 | P1 | Falta fazer, condicional | Subdomínios/reverse proxy com HTTPS, conforme infraestrutura |
| INT-008 | P2 | Falta fazer, futuro | Investigar identidade institucional e SSO sem torná-lo dependência inicial |
| INT-009 | P1 | Falta validar fora do repositório | Operação, backups e capacidade das aplicações Rails; não migrar seus bancos neste escopo |
| TEC-001 | P0 | Em andamento | PHP 8.3 no container; confirmar versão mantida e compatível com hospedagem no momento do deploy |
| TEC-002 | P0 | Feito como base | Laravel implementado; manutenção de dependências continua necessária |
| TEC-003 | P0 | Feito no DEV | PostgreSQL próprio configurado e migrations executadas; provisionar demais ambientes |
| TEC-004 | P0 | Em andamento | `.env`/exemplo existentes; definir homologação/produção e gestão de segredos |
| TEC-005 | P0 | Em andamento | URLs simples existentes; implementar slugs e redirecionamentos para conteúdo editorial |
| TEC-006 | P0 | Em andamento | Componentes reutilizáveis existentes; consolidar consistência e acessibilidade |
| TEC-007 | P0 | Em andamento | Dados de pessoas no banco; conteúdo e menus ainda majoritariamente no código |
| TEC-008 | P1 | Em andamento | Cliente de API de pessoas sem endpoints; consolidar Inertia ou justificar/documentar API |
| TEC-009 | P2 | Em andamento | Estruturas de cache/jobs existem; uso e operação de workers ainda não comprovados |
| TEC-010 | P0 | Em andamento | Git, migrations e workflow CI existentes; formalizar revisão e releases |

### Segurança, desempenho, SEO e qualidade

| ID | Prioridade | Andamento | Pendência e aceite esperado |
|---|---|---|---|
| SEC-001 | P0 | Falta validar na implantação | HTTPS, redirecionamentos e HSTS compatível em Portal/Sistemas |
| SEC-002 | P0 | Em andamento | Validação, hashing, CSRF e consultas do framework; faltam uploads, editor HTML seguro e testes de abuso |
| SEC-003 | P0/P1 | Em andamento | Rate limit de login existe; definir senha forte, alertas e MFA se viável |
| SEC-004 | P0 | Em andamento | Permissões cadastradas, mas não aplicadas ao CMS; implementar menor privilégio |
| SEC-005 | P0 | Falta fazer | Auditoria de login, publicação e alterações de acesso, com minimização de dados |
| SEC-006 | P0 | Falta fazer | Política e inventário de cookies/serviços externos; decidir tratamento conforme uso real |
| SEC-007 | P0 | Em andamento | Dados de pessoas já modelados; validar finalidade e campos autorizados antes de publicar |
| SEC-008 | P0 | Falta fazer | Backup do banco e uploads, retenção e teste documentado de restauração |
| SEC-009 | P0 | Em andamento | Lockfiles existentes; rotina de atualização e revisão de dependências |
| PERF-001 | P0 | Em andamento | Assets compilados; medir rede móvel, otimizar imagens e carregamento de mapa/scripts |
| PERF-002 | P0 | Em andamento | Remover rotação automática da Home e avaliar custo de dependências de terceiros |
| PERF-003 | P1 | Falta fazer | Cache público com invalidação após publicação e separação por idioma/autenticação |
| SEO-001 | P0 | Em andamento | Título/descrição base; completar metadados específicos, canonical e Open Graph editáveis |
| SEO-002 | P0 | Em andamento | `robots.txt` existe; sitemap e política de não indexação do admin/conteúdo privado pendentes |
| SEO-003 | P1 | Falta fazer | Dados estruturados Article/Event/BreadcrumbList quando aplicáveis |
| QA-001 | P1 | Em andamento | Dois testes básicos e CI; ampliar regressão funcional e autorização |
| QA-002 | P0 | Falta fazer | Auditoria automatizada e roteiro manual por release, com evidências |
| QA-003 | P1 | Em andamento | Health route `/up` e logs de base; configurar monitoramento e alertas operacionais |

## Modelo de dados proposto

Reutilizar `users`, roles/permissions e ampliar as tabelas de pessoas existentes. Não concentrar todo o conteúdo acadêmico em uma tabela genérica.

| Bloco | Entidades | Entrega |
|---|---|---|
| Editorial | Page, traduções, Menu/MenuItem, Document, mídia, AuditLog | E1/E2; status, autoria, revisão, idioma, SEO, visibilidade e metadados |
| Acadêmico | ResearchLine, Faculty (evolução de docentes), Curriculum, Discipline, Project, vínculos | E3; campos e relações exigidos pelo documento |
| Divulgação | News; Event e mídia na evolução | E3/E7; autoria, datas, tags, arquivos acessíveis e tradução opcional |
| Impacto | Product/Technology, ImpactCase, Evidence | E4; relações, validação e distinção entre evidência pública/privada |
| Evolução CAPES | Thesis/Dissertation, Award, AlumniHighlight, parcerias/ações e temas ODS | E7; relações com RIUFF, produtos, pessoas e fontes |

Títulos/corpos traduzíveis devem ter registro por idioma; relações acadêmicas compartilhadas evitam duplicação. O esquema precisa permitir marcar tradução desatualizada, versionar URLs e filtrar conteúdo publicado. Escolhas finais de normalização e armazenamento dos anexos devem ser detalhadas antes das migrations de cada módulo.

## Decisões e insumos necessários

| Decisão/insumo | Responsável proposto | Momento |
|---|---|---|
| Hospedagem, PHP/Node, PostgreSQL, domínio, TLS, armazenamento e backups | TI/UFF + desenvolvimento | E0, antes de definir deploy |
| Marca oficial UFF e uso de assinatura do Governo Federal | Comunicação/SCS-UFF | E2, antes de homologar layout |
| Matriz de acesso, provisionamento e poderes de publicação | Coordenação + desenvolvimento | E1 |
| Currículo vigente, disciplinas, linhas, docentes e contatos oficiais | Coordenação/Secretaria | E3 |
| URLs corretas e responsáveis por SIA/Seleções | Responsáveis pelos sistemas | E3 |
| Revisores PT/EN e rotina de atualização | Coordenação + responsável editorial | Desde E1 |
| Dados de pessoas e evidências autorizados para divulgação | Coordenação + responsáveis pelos dados | Antes de publicar E3/E4 |
| Conteúdo aprovado de produtos/impacto, privacidade e acessibilidade | Responsáveis editoriais e institucionais | E4/E6 |

## Condição para publicar a primeira versão

Todos os P0 devem cumprir o aceite correspondente, incluindo produtos/impacto mínimos, páginas essenciais PT/EN revisadas, busca, CMS operacional, documentos, integração por links e navegação acessível. Executar o roteiro de homologação do documento em desktop, celular, teclado, zoom, leitor de tela, CMS, segurança, integração e desempenho. Registrar evidências e responsáveis pela aprovação.

Antes do deploy, entregar manual do CMS, diagrama da arquitetura implantada, dicionário de entidades, instruções de instalação/deploy, lista de URLs dos sistemas, checklist de acessibilidade, plano de backup/restauração e atualização de dependências. Atualizar esta matriz a cada entrega; só marcar como feito após o aceite.

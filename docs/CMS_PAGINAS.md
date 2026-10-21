# CMS básico de páginas do MESC

Incremento local de 21/10/2026, baseado no README, no planejamento e nos requisitos do DOCX. A stack Laravel + React/Inertia foi preservada. O painel anterior tinha apenas cartões; agora há um módulo editorial em `/cms/pages`, também acessível pelo painel.

## Preparação

No terminal do DevContainer, execute:

```bash
php artisan migrate
php artisan db:seed --class=RoleSeeder
npm run build
```

O seeder mantém `admin` com acesso completo, cria `editor` (listar, criar, editar e enviar à revisão) e `revisor` (listar, revisar, publicar e arquivar). `colaborador` não recebe acesso às páginas. Nenhum usuário existente é promovido automaticamente.

Para atribuir um perfil a uma conta existente, um responsável pelo ambiente pode usar `php artisan tinker`, conferindo o e-mail antes de executar:

```php
$user = App\Models\User::where('email', 'EMAIL_DA_CONTA_EXISTENTE')->firstOrFail();
$user->assignRole('editor'); // ou revisor; admin apenas para administradores
```

Administradores também podem criar contas e atribuir perfis em Dashboard → Gerenciar usuários (/cms/users). A matriz é uma proposta técnica que precisa de validação institucional antes de produção.

## Uso

1. Entre com uma conta autorizada e abra **Painel → Páginas institucionais**.
2. Crie título, slug, idioma PT/EN e conteúdo no editor visual em blocos. Exemplo de slug: `o-programa`.
3. Salve o rascunho e confira a prévia na própria tela.
4. Envie para revisão. O revisor abre a página e publica a versão salva.
5. O endereço público é `/o-programa`.
6. Para editar uma página publicada, salve um novo rascunho. A versão aprovada anterior continua pública até nova publicação.
7. Arquivar retira a página do portal; o registro e o histórico permanecem. Para republicar, salve, envie para revisão e publique novamente.

O slug fica fixo após a criação, evitando quebrar links antes da implementação de redirecionamentos. O editor oferece parágrafo, subtítulo, citação, lista simples/numerada, link, imagem por endereço HTTPS e tabela com cabeçalhos. É possível duplicar, reordenar e remover blocos. HTML digitado é exibido como texto pelo React; os blocos são renderizados como componentes, sem execução de HTML. Ainda não há upload de arquivos. A prévia é privada e não possui URL pública compartilhável. Os eventos registram ação, usuário e data, sem armazenar o corpo no histórico. Isso é uma trilha básica de ações, não um sistema de recuperação de versões.

## Validação

- Testes funcionais de bloqueio de visitantes/colaboradores, validação, publicação indevida, revisão obrigatória, publicação, autoria, preservação da versão pública, arquivamento e auditoria.
- Suíte completa: 55 testes e 448 assertions aprovados no container, usando SQLite em memória.
- Build Vite aprovado no container Linux. Não foi realizada homologação visual, auditoria de acessibilidade nem teste automatizado com PostgreSQL.

## Continuação recomendada

Este incremento atende parte da E1; não conclui os P0 nem torna o portal pronto para produção.

1. Vincular PT/EN, criar o perfil tradutor com escopo próprio, sinalizar traduções desatualizadas e preservar a página equivalente na troca de idioma. Hoje PT/EN são registros independentes com slugs distintos.
2. Migrar conteúdo aprovado de `/sobre` para o CMS e definir URLs/menus; `/sobre`, Home e Contato continuam com seu conteúdo existente. O CMS não adiciona páginas automaticamente ao menu.
3. Homologar a gestão de usuários exclusiva de administradores; o cadastro público foi desativado.
4. Acrescentar documentos, metadados SEO, menus e conteúdo acadêmico estruturado, conforme as etapas E2/E3.
5. Homologar a matriz de acesso, acessibilidade, PostgreSQL e o ciclo editorial com Secretaria/Coordenação.

As permissões usam Spatie no backend em todas as operações. A transição usa bloqueio de linha e transação para manter conteúdo e auditoria consistentes. Não existe exclusão definitiva pela interface.

## Evolução da experiência administrativa

O painel, a lista e a edição compartilham um layout com navegação lateral, acesso ao portal e logout. Os links editoriais seguem as permissões do backend; colaboradores continuam sem acesso ao módulo.

A lista oferece busca por título, filtros por idioma/estado editorial, paginação que mantém os filtros e contadores gerais por estado. Mostra última edição, responsável pela edição (quando registrado) e indicação de versão anterior ainda publicada.

A tela de edição separa conteúdo e prévia em abas. A lateral reúne estado editorial, datas, revisão, publicação, arquivamento com confirmação, endereço, idioma e histórico com nomes dos responsáveis. O título sugere o slug na criação, que pode ser ajustado antes de salvar. Há aviso ao sair com alterações não salvas; não existe salvamento automático.

Os blocos permitem imagens já hospedadas em HTTPS (com texto alternativo obrigatório), links HTTPS ou caminhos internos e tabelas de até 30 linhas e 8 colunas com título e primeira linha de cabeçalhos. Conteúdo vazio, tipos desconhecidos, URLs inseguras e tabelas irregulares são rejeitados pelo backend. A prévia não executa HTML digitado.

A migration de body_format adiciona o campo sem reescrever o texto existente. Ao abrir uma página antiga, o texto aparece em um bloco de parágrafo; ao salvar passa para o formato de blocos. A versão pública anterior só muda após revisão e publicação, inclusive durante essa conversão.

A biblioteca de uploads, a gestão de menus e as traduções vinculadas continuam pendentes. A conferência no navegador chegou à tela de login; as telas autenticadas ainda precisam de homologação visual com uma conta autorizada.
## Endereços públicos na raiz

Páginas publicadas usam /{slug}, por exemplo /teste. A lista, a edição e o botão de visita ao portal mostram esse endereço. O caminho antigo /paginas/teste redireciona permanentemente (301) para /teste somente quando há conteúdo publicado e o slug está disponível.

A criação, a edição e a publicação verificam as rotas registradas pelo Laravel, incluindo rotas de autenticação, saúde e métodos diferentes de GET. Endereços como contato, sobre, login e dashboard são reservados; os prefixos de rotas existentes, como cms, pessoas e lang, também são protegidos. Slugs de outras páginas permanecem únicos. As rotas institucionais têm precedência sobre a rota pública do CMS.

Se uma futura rota do portal ocupar o slug de uma página antiga, o CMS bloqueia sua publicação e o redirecionamento antigo. O responsável deve resolver esse conflito antes de republicar o conteúdo; a página institucional continua tendo precedência.
## Gestão de usuários exclusiva de administradores

A tela pública de cadastro e seu controller foram removidos. GET e POST em /register retornam 404; esse endereço permanece reservado.

Dashboard → Gerenciar usuários e a opção Usuários no menu lateral aparecem apenas para o perfil admin. Todas as rotas /cms/users exigem autenticação e o middleware EnsureAdmin, que verifica hasRole('admin') no backend. Permissões usuarios.* isoladas não concedem acesso a quem não possui esse perfil.

Administradores podem listar e buscar por nome/e-mail, criar contas, editar nome/e-mail, atribuir um ou mais perfis existentes e definir uma nova senha opcional. Senhas precisam de confirmação e pelo menos 12 caracteres com letras e números; o model aplica hash e as respostas não incluem senhas nem hashes. Ao mudar o e-mail, a verificação anterior é invalidada. Não há envio automático de convite ou senha por e-mail.

A exclusão de outra conta exige confirmação na interface. A própria conta não pode ser excluída e seu próprio perfil admin não pode ser removido, com verificação também no backend. A exclusão é definitiva; os registros editoriais existentes preservam seu conteúdo e as referências de autoria seguem as regras nullOnDelete das migrations.
## Blocos de layout

O seletor Adicionar conteúdo oferece Card, Grade de cards, Carrossel, Indicadores e Banner. Eles usam componentes React predefinidos, os estilos do portal e o mesmo fluxo editorial das páginas.

- Card: título, texto, ícone institucional opcional, imagem com descrição e link.
- Grade de cards: até 12 cards, título de seção opcional e 2, 3 ou 4 colunas em telas grandes; uma coluna em telas pequenas.
- Carrossel: até 10 slides com título, imagem e descrição obrigatórios, texto e link opcionais; links exigem texto do botão. Navegação manual com botões acessíveis, sem avanço automático. Apenas o slide ativo é montado, evitando links ocultos focáveis.
- Indicadores: até 12 pares rótulo/valor, informados pelo responsável com base em dados reais.
- Banner: uma imagem com descrição, título, texto e botão opcionais.

Os itens podem ser reordenados e removidos. Os blocos continuam podendo ser duplicados e reordenados pelo editor principal. A prévia e a página pública usam o mesmo renderizador.

Imagens dos novos blocos podem usar HTTPS ou o caminho de um arquivo existente em /images/. Isso não adiciona um serviço de upload. Links continuam limitados a HTTPS ou caminhos internos. Tipos e ícones desconhecidos, configurações incompletas, URLs inseguras e quantidades acima dos limites são rejeitados pelo backend.

A Home compartilha PortalCard e PortalStats com o CMS. O novo carrossel manual é disponibilizado aos blocos; o carrossel legado da Home ainda tem implementação própria. Cabeçalho, rodapé, autenticação e formulários administrativos não são blocos de conteúdo.

Sugestões para próximas entregas: perguntas frequentes, downloads com metadados e descrição acessível, imagem ao lado de texto, aviso/chamada para ação, cronograma de seleção e listagens dinâmicas de docentes, notícias e documentos. Listagens dinâmicas devem consultar somente dados autorizados para divulgação.
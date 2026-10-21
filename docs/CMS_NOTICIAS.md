# Gestão de notícias do MESC

## Acesso e permissões

Abra Dashboard → Gerenciar notícias ou Notícias no menu lateral (/cms/news). O backend verifica cada ação:

- admin: todas as ações.
- editor: listar, criar, editar e enviar para revisão.
- revisor: listar, revisar, publicar e arquivar.
- colaborador: mantém as permissões de redação que já existiam no seeder; pode listar, criar, editar e enviar para revisão, sem publicar.

As permissões são noticias.ver, noticias.criar, noticias.editar e noticias.publicar. Não foi adicionada exclusão definitiva: para retirar uma publicação do portal, use Arquivar.

## Publicar na Home

1. Cadastre título, slug, resumo, categoria e conteúdo em blocos.
2. Se desejar uma capa, informe uma imagem HTTPS ou um arquivo já disponível em /images/, com descrição alternativa.
3. Marque Exibir na Home após a publicação.
4. Salve o rascunho, confira a prévia e envie para revisão.
5. Um revisor ou administrador publica a versão salva.

A Home mostra as duas notícias publicadas mais recentes com destaque habilitado, ordenadas pela data da última publicação. Notícias publicadas sem destaque continuam acessíveis em /noticias e /noticias/{slug}. O link Todas as notícias e o menu público apontam para /noticias.

Não há notícias fictícias criadas pelo seeder. A Home apresenta um estado vazio até existir uma publicação marcada para destaque. Os eventos e os outros conteúdos da Home continuam seguindo suas implementações anteriores.

## Alterar ou retirar uma publicação

Salvar alterações cria um novo rascunho e preserva a cópia pública anterior, inclusive título, resumo, imagem, categoria e opção de destaque. Para mudar o que aparece na Home, revise e publique novamente. Desmarcar o destaque e republicar remove a notícia somente da Home; arquivar a retira também da listagem pública e do endereço individual.

O slug é fixo após a criação. A autoria e a data de publicação são registradas pelo servidor, e as ações ficam em news_events. O conteúdo público é obtido exclusivamente de published_content, sem expor campos do rascunho.

## Ambiente

No terminal do container:

    php artisan migrate
    php artisan db:seed --class=RoleSeeder
    npm run build

A migration cria news e news_events no banco próprio do portal. O upload continua pendente: este módulo não recebe arquivos nem altera o Compose da VPS.

## Validação

Os testes cobrem autenticação, permissões, campos e imagens, slug único, revisão obrigatória, publicação, arquivamento, histórico, limite/ordem dos destaques e preservação da versão pública durante edições. A suíte usa SQLite em memória; a migration também foi aplicada ao PostgreSQL de desenvolvimento. As telas autenticadas ainda precisam de homologação visual.

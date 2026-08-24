# Página de Contato (MESC) — Design

## Contexto

O site do MESC (Inertia.js + React/TSX sobre Laravel) já tem Home, Header e Footer
prontos, com um design system definido em `resources/css/app.css`:

- Cores: `--uff-dark-blue: #162b4d`, `--uff-highlight: #2a9d8f`, `--uff-light-gray: #f8f9fa`.
- Tipografia: `--font-serif: 'Lora', serif` para títulos (`h1`–`h6`, `.serif-title`, `.section-title`).
- Componentes reutilizáveis: `.custom-card` + `.card-icon` (cards com ícone circular),
  `.gateway-card`, `.news-card`, `.lab-card`, `.carousel-overlay` (gradiente escuro sobre imagem),
  grid do Bootstrap (`container`/`row`/`col-*`).
- Componente `GoogleMap` (`resources/js/components/GoogleMap.tsx`) já usado no Footer,
  com marcador customizado nas cores do MESC.

O menu (`resources/js/data/menuData.ts`) já tem um item `CONTATO` de nível 1, hoje
apontando para uma âncora (`#contato`) inexistente na Home.

Referências de conteúdo/estrutura usadas (não de estilo — o estilo segue o do site MESC):

- IC UFF (`https://www.ic.uff.br/contact-2/`): contatos setoriais (secretaria, coordenações,
  suporte técnico), endereço, mapa.
- PESC/COPPE UFRJ (`https://pesc.coppe.ufrj.br/pt/contato`): formulário de contato,
  endereço + horário de atendimento, redes sociais.

## Objetivo

Criar uma página de Contato dedicada, com o mesmo design das telas já existentes,
combinando: formulário (não funcional por ora), informações institucionais de contato,
contatos setoriais com placeholders, e mapa de localização.

## Fora de escopo

- Envio funcional do formulário (sem backend/Mailable neste momento — fica pronto
  para receber isso depois).
- E-mails/ramais reais dos setores (usar placeholders claramente identificáveis,
  a serem substituídos pelo usuário).
- Qualquer alteração no Header, Footer ou Home além do link do menu.

## Estrutura e rota

- Nova página `resources/js/pages/Contato.tsx`.
- Nova rota em `routes/web.php`: `GET /contato` → `Inertia::render('Contato')`.
- `menuData.ts`: item `contato` passa de `link: '#contato'` para `link: '/contato'`.
- Página monta `Header` + `main` + `Footer`, replicando a composição de `Home.tsx`.

## Seções da página (topo → base)

### 1. Banner de página interna

Faixa curta (~260px, bem menor que o carrossel de 45vh da Home), pensada como padrão
reutilizável para futuras páginas internas (não exclusivo do Contato):

- Imagem de fundo `/images/ict.jpg` + overlay em gradiente azul-escuro (mesmo padrão
  visual de `.carousel-overlay`, nova classe `.page-header-banner` + `.page-header-overlay`).
- Título "Contato" em `var(--font-serif)`, cor branca.
- Breadcrumb simples "Home / Contato" (links de texto, sem componente novo de roteamento).

### 2. Formulário + informações de contato (lado a lado)

Grid Bootstrap `row` com duas colunas:

- **Esquerda (`col-lg-7`)**: card branco (mesma elevação/sombra de `.custom-card`) com
  formulário: Nome, E-mail, Assunto, Mensagem (`textarea`), botão "Enviar Mensagem"
  (`btn btn-primary` com `backgroundColor: var(--uff-highlight)`, igual aos botões do
  carrossel da Home). Sem `onSubmit` real — apenas `e.preventDefault()` ou nada;
  é a interface pronta para receber lógica de envio depois.
- **Direita (`col-lg-5`)**: card com fundo `var(--uff-dark-blue)` (mesmo tom do Footer),
  texto branco, ícones Bootstrap Icons (`bi-geo-alt`, `bi-telephone`, `bi-clock`) com:
  - Endereço: reaproveita o texto já usado no Footer
    ("Rua Recife, s/n, Jardim Bela Vista, Rio das Ostras – RJ | CEP: 28895-532").
  - Telefone: `(22) 2764-9081` (mesmo do Footer).
  - Horário de atendimento: texto genérico, ex. "Segunda a sexta, das 8h às 17h".

### 3. Contatos setoriais (com placeholders)

Seção com fundo `bg-light` (mesmo padrão da seção "Portais de Acesso" da Home),
grid de 3 `custom-card` (ícone circular + título + texto, reaproveitando exatamente
as classes já existentes `.custom-card`/`.card-icon`):

| Card | Ícone | Conteúdo (placeholder) |
|---|---|---|
| Coordenação do Programa | `bi-person-workspace` | `coordenacao@mesc.uff.br`, `(22) 2764-9081` |
| Secretaria Acadêmica | `bi-folder2-open` | `secretaria@mesc.uff.br`, horário de atendimento |
| Suporte Técnico / Laboratórios | `bi-tools` | `suporte@mesc.uff.br` |

Os e-mails são placeholders — devem ficar visualmente claros como dados de exemplo
(texto normal, sem necessidade de marcação especial no código) para o usuário
substituir pelos reais depois.

### 4. Mapa e localização ("Como Chegar")

- Reaproveita o componente `GoogleMap` existente (mesmas coordenadas do Footer:
  `lat: -22.503, lng: -41.923611`), em um card maior (~350px de altura) que os
  160px usados no Footer.
- Endereço completo exibido acima ou ao lado do mapa (texto, sem novo componente).

### 5. Footer

Reutilizado sem alterações. Não duplicamos bloco de redes sociais na página de
Contato — o Footer já cobre isso em todas as páginas do site.

## Estilos novos (resources/css/app.css)

Seguindo a convenção já usada no arquivo (comentários de seção em maiúsculas,
classes kebab-case, reuso de variáveis CSS existentes):

- `.page-header-banner`, `.page-header-overlay`, `.page-header-banner h1` — banner de página interna.
- `.contact-form-card` — card branco do formulário (padding, borda e sombra consistentes com `.custom-card`).
- `.contact-info-card` — card escuro de informações (endereço/telefone/horário).
- `.map-section` — wrapper da seção de mapa (padding consistente com as outras seções da Home).

Nenhuma classe existente é alterada; apenas adições.

## Testes/verificação

Projeto não tem testes de frontend automatizados hoje. Verificação será manual:
rodar o servidor de dev (Vite + Laravel), abrir `/contato` no navegador, conferir
consistência visual com a Home (cores, tipografia, espaçamento) e responsividade
(mobile/desktop) do formulário, cards e mapa.

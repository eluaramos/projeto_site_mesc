# Página de Contato (MESC) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a página `/contato` do site do MESC, com o mesmo design system das telas existentes, baseada em `docs/superpowers/specs/2026-07-06-pagina-contato-design.md`.

**Architecture:** Uma nova página Inertia (`resources/js/pages/Contato.tsx`) montada com os componentes `Header`/`Footer` já existentes, servida por uma nova rota Laravel (`GET /contato`). A página é construída incrementalmente em 5 seções (banner, formulário+info, contatos setoriais, mapa), cada uma adicionando CSS a `resources/css/app.css` seguindo as classes/convenções já usadas em `Home.tsx`.

**Tech Stack:** Laravel 12 + Inertia.js + React 19 (TSX) + Bootstrap 5 (CSS via CDN) + Bootstrap Icons + `@googlemaps/js-api-loader` (via componente `GoogleMap` já existente).

## Global Constraints

- Cores: `--uff-dark-blue: #162b4d`, `--uff-highlight: #2a9d8f` (de `resources/css/app.css`).
- Tipografia de títulos: `--font-serif: 'Lora', serif`.
- Projeto não tem framework de testes de frontend configurado (sem Jest/Vitest/Playwright) — verificação de cada tarefa é por type-check (`tsc --noEmit`), build (`vite build`) e checagem manual no navegador.
- Formulário de contato NÃO deve ter envio funcional (sem `onSubmit` que chame backend, sem `action`) — fora de escopo desta feature.
- E-mails setoriais são placeholders a serem substituídos depois pelo usuário: `coordenacao@mesc.uff.br`, `secretaria@mesc.uff.br`, `suporte@mesc.uff.br`.
- Endereço e telefone reaproveitados de `resources/js/components/Footer.tsx`: "Rua Recife, s/n, Jardim Bela Vista, Rio das Ostras – RJ | CEP: 28895-532" e "(22) 2764-9081".
- Coordenadas do mapa (mesmas do Footer): `lat: -22.503, lng: -41.923611`.
- Nenhuma alteração em `Home.tsx`, `Header.tsx` ou `Footer.tsx` além da linha do menu descrita na Tarefa 1.

---

### Task 1: Rota, página mínima, correção do ícone Bootstrap e link do menu

**Files:**
- Modify: `routes/web.php`
- Create: `resources/js/pages/Contato.tsx`
- Modify: `resources/js/data/menuData.ts:150`
- Modify: `resources/views/app.blade.php:11`

**Interfaces:**
- Produces: componente de página `Contato` (default export) em `resources/js/pages/Contato.tsx`, resolvido pela rota `/contato` via `Inertia::render('Contato')`. Estrutura do `<main>` fica vazia — Tarefas 2–5 inserem seções dentro dela.

- [ ] **Step 1: Adicionar a rota `/contato`**

Edite `routes/web.php` para o conteúdo completo:

```php
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // <-- Não esqueça de importar o Inertia no topo

Route::get('/', function () {
    // O nome aqui deve ser o nome exato do seu arquivo .tsx dentro de resources/js/Pages
    return Inertia::render('Home'); 
});

Route::get('/contato', function () {
    return Inertia::render('Contato');
});
```

- [ ] **Step 2: Verificar a rota registrada**

Run: `php artisan route:list --path=contato`
Expected: uma linha listando `GET|HEAD` para `contato`.

- [ ] **Step 3: Corrigir o CSS do Bootstrap Icons ausente**

Em `resources/views/app.blade.php`, os ícones `bi bi-*` (já usados em `Footer.tsx`, ex. `bi-telephone`) não têm estilo carregado porque falta o link do Bootstrap Icons. Substitua:

```html
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
```

por:

```html
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
```

(Mesma versão já usada em `html/index.html`.)

- [ ] **Step 4: Criar a página mínima `Contato.tsx`**

Crie `resources/js/pages/Contato.tsx`:

```tsx
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
```

- [ ] **Step 5: Atualizar o link do menu**

Em `resources/js/data/menuData.ts:150`, substitua:

```ts
  { id: 'contato', label: 'CONTATO', link: '#contato' }
```

por:

```ts
  { id: 'contato', label: 'CONTATO', link: '/contato' }
```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: sem erros (sem output).

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: build finaliza com sucesso (sem erros no output do Vite).

- [ ] **Step 8: Verificação manual**

Rode `composer run dev` (sobe `php artisan serve` + `npm run dev` juntos). Abra `http://127.0.0.1:8000/` no navegador:
- Clique em "CONTATO" no menu e confirme que navega para `/contato`, com Header e Footer renderizados e sem erros no console.
- No Footer (visível em `/` e em `/contato`), confirme que o ícone de telefone (`bi-telephone`) agora aparece como um ícone (não mais invisível) — confirma a correção do Step 3.

- [ ] **Step 9: Commit**

```bash
git add routes/web.php resources/js/pages/Contato.tsx resources/js/data/menuData.ts resources/views/app.blade.php
git commit -m "feat: cria rota e página inicial de Contato, corrige ícones Bootstrap"
```

---

### Task 2: Banner de página interna

**Files:**
- Modify: `resources/css/app.css`
- Modify: `resources/js/pages/Contato.tsx`

**Interfaces:**
- Consumes: `Contato.tsx` da Tarefa 1 (`<main>` vazio).
- Produces: classes CSS `.page-header-banner`, `.page-header-overlay`, `.page-header-breadcrumb` reutilizáveis por futuras páginas internas.

- [ ] **Step 1: Adicionar CSS do banner**

Ao final de `resources/css/app.css`, adicione:

```css

/* =========================
   PAGE HEADER BANNER (páginas internas)
   ==========================*/

.page-header-banner {
  position: relative;
  height: 260px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.page-header-banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.page-header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(13, 31, 61, 0.55), rgba(13, 31, 61, 0.8));
}

.page-header-banner .container {
  position: relative;
  z-index: 1;
}

.page-header-banner h1 {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-header-breadcrumb {
  font-size: 0.9rem;
}

.page-header-breadcrumb a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
}

.page-header-breadcrumb a:hover {
  color: #fff;
}

.page-header-breadcrumb span {
  color: #fff;
}
```

- [ ] **Step 2: Adicionar o banner em `Contato.tsx`**

Substitua o conteúdo de `resources/js/pages/Contato.tsx` por:

```tsx
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
        {/* PAGE HEADER BANNER */}
        <section className="page-header-banner">
          <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
          <div className="page-header-overlay"></div>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-serif)' }}>Contato</h1>
            <div className="page-header-breadcrumb">
              <a href="/">Home</a> <span className="mx-1">/</span> <span>Contato</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: sem erros.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build finaliza com sucesso.

- [ ] **Step 5: Verificação manual**

Com `composer run dev` rodando, abra `http://127.0.0.1:8000/contato`. Confirme: imagem de fundo do ICT visível, overlay azul escurecendo a imagem, título "Contato" em serif branco, breadcrumb "Home / Contato" no rodapé do banner, e que clicar em "Home" no breadcrumb volta para `/`.

- [ ] **Step 6: Commit**

```bash
git add resources/css/app.css resources/js/pages/Contato.tsx
git commit -m "feat: adiciona banner de página interna à página de Contato"
```

---

### Task 3: Formulário e card de informações de contato

**Files:**
- Modify: `resources/css/app.css`
- Modify: `resources/js/pages/Contato.tsx`

**Interfaces:**
- Consumes: `Contato.tsx` da Tarefa 2 (banner já presente dentro de `<main>`).
- Produces: classes `.contact-section`, `.contact-form-card`, `.contact-info-card`, `.contact-info-item`.

- [ ] **Step 1: Adicionar CSS do formulário e do card de informações**

Ao final de `resources/css/app.css`, adicione:

```css

/* =========================
   CONTACT FORM + INFO CARD
   ==========================*/

.contact-section {
  padding: 80px 0;
  background-color: #fff;
}

.contact-form-card {
  background: #fff;
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 100%;
}

.contact-form-card label {
  font-weight: 600;
  color: var(--uff-dark-blue);
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.contact-form-card .form-control {
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px 14px;
  margin-bottom: 20px;
}

.contact-form-card .form-control:focus {
  border-color: var(--uff-highlight);
  box-shadow: 0 0 0 0.2rem rgba(42, 157, 143, 0.15);
}

.contact-info-card {
  background: var(--uff-dark-blue);
  border-radius: 4px;
  padding: 40px;
  color: #fff;
  height: 100%;
}

.contact-info-card h5 {
  color: var(--uff-highlight);
  font-family: var(--font-serif);
  margin-bottom: 25px;
}

.contact-info-item {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: flex-start;
}

.contact-info-item i {
  font-size: 1.3rem;
  color: var(--uff-highlight);
  margin-top: 3px;
}

.contact-info-item p {
  margin-bottom: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.9;
}
```

- [ ] **Step 2: Adicionar a seção de formulário + informações em `Contato.tsx`**

Substitua o conteúdo de `resources/js/pages/Contato.tsx` por:

```tsx
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
        {/* PAGE HEADER BANNER */}
        <section className="page-header-banner">
          <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
          <div className="page-header-overlay"></div>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-serif)' }}>Contato</h1>
            <div className="page-header-breadcrumb">
              <a href="/">Home</a> <span className="mx-1">/</span> <span>Contato</span>
            </div>
          </div>
        </section>

        {/* FORM + CONTACT INFO SECTION */}
        <section className="contact-section">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="contact-form-card">
                  <h2 className="section-title">Envie uma Mensagem</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="nome" className="form-label d-block">Nome</label>
                        <input type="text" id="nome" name="nome" className="form-control" placeholder="Seu nome completo" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label d-block">E-mail</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <label htmlFor="assunto" className="form-label d-block">Assunto</label>
                    <input type="text" id="assunto" name="assunto" className="form-control" placeholder="Sobre o que deseja falar?" />
                    <label htmlFor="mensagem" className="form-label d-block">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" className="form-control" rows={5} placeholder="Escreva sua mensagem..."></textarea>
                    <button type="submit" className="btn btn-primary btn-lg px-4 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="contact-info-card">
                  <h5 className="fw-bold">Informações de Contato</h5>

                  <div className="contact-info-item">
                    <i className="bi bi-geo-alt"></i>
                    <p>Rua Recife, s/n, Jardim Bela Vista<br />Rio das Ostras – RJ | CEP: 28895-532</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-telephone"></i>
                    <p>(22) 2764-9081</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-clock"></i>
                    <p>Segunda a sexta, das 8h às 17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: sem erros.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build finaliza com sucesso.

- [ ] **Step 5: Verificação manual**

Em `http://127.0.0.1:8000/contato`, confirme: formulário à esquerda (Nome, E-mail lado a lado, Assunto, Mensagem, botão verde "Enviar Mensagem"), card azul-escuro à direita com ícones de localização/telefone/relógio visíveis e texto legível. Clique em "Enviar Mensagem" com o formulário vazio ou preenchido e confirme que a página **não** recarrega nem navega (o `preventDefault` está funcionando).

- [ ] **Step 6: Commit**

```bash
git add resources/css/app.css resources/js/pages/Contato.tsx
git commit -m "feat: adiciona formulário e card de informações à página de Contato"
```

---

### Task 4: Contatos setoriais

**Files:**
- Modify: `resources/js/pages/Contato.tsx`

**Interfaces:**
- Consumes: `Contato.tsx` da Tarefa 3, classes `.custom-card`/`.card-icon` já existentes em `resources/css/app.css` (usadas em `Home.tsx`).
- Produces: nenhuma classe nova (reaproveita `.custom-card`/`.card-icon`).

- [ ] **Step 1: Adicionar a seção de contatos setoriais em `Contato.tsx`**

Substitua o conteúdo de `resources/js/pages/Contato.tsx` por:

```tsx
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
        {/* PAGE HEADER BANNER */}
        <section className="page-header-banner">
          <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
          <div className="page-header-overlay"></div>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-serif)' }}>Contato</h1>
            <div className="page-header-breadcrumb">
              <a href="/">Home</a> <span className="mx-1">/</span> <span>Contato</span>
            </div>
          </div>
        </section>

        {/* FORM + CONTACT INFO SECTION */}
        <section className="contact-section">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="contact-form-card">
                  <h2 className="section-title">Envie uma Mensagem</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="nome" className="form-label d-block">Nome</label>
                        <input type="text" id="nome" name="nome" className="form-control" placeholder="Seu nome completo" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label d-block">E-mail</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <label htmlFor="assunto" className="form-label d-block">Assunto</label>
                    <input type="text" id="assunto" name="assunto" className="form-control" placeholder="Sobre o que deseja falar?" />
                    <label htmlFor="mensagem" className="form-label d-block">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" className="form-control" rows={5} placeholder="Escreva sua mensagem..."></textarea>
                    <button type="submit" className="btn btn-primary btn-lg px-4 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="contact-info-card">
                  <h5 className="fw-bold">Informações de Contato</h5>

                  <div className="contact-info-item">
                    <i className="bi bi-geo-alt"></i>
                    <p>Rua Recife, s/n, Jardim Bela Vista<br />Rio das Ostras – RJ | CEP: 28895-532</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-telephone"></i>
                    <p>(22) 2764-9081</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-clock"></i>
                    <p>Segunda a sexta, das 8h às 17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTORAL CONTACTS SECTION */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="serif-title">Contatos Setoriais</h2>
              <p className="text-muted">Fale diretamente com o setor responsável pelo seu assunto.</p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="custom-card">
                  <div className="card-icon"><i className="bi bi-person-workspace"></i></div>
                  <h5>Coordenação do Programa</h5>
                  <p>coordenacao@mesc.uff.br<br />(22) 2764-9081</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="custom-card">
                  <div className="card-icon"><i className="bi bi-folder2-open"></i></div>
                  <h5>Secretaria Acadêmica</h5>
                  <p>secretaria@mesc.uff.br<br />Segunda a sexta, das 8h às 17h</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="custom-card">
                  <div className="card-icon"><i className="bi bi-tools"></i></div>
                  <h5>Suporte Técnico e Laboratórios</h5>
                  <p>suporte@mesc.uff.br</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: sem erros.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build finaliza com sucesso.

- [ ] **Step 4: Verificação manual**

Em `http://127.0.0.1:8000/contato`, confirme os 3 cards (Coordenação, Secretaria, Suporte) com o mesmo visual dos cards "Nossa Missão/Visão/Valores" da Home (ícone circular escuro, título serif, texto cinza), incluindo o efeito de hover (levantar + borda verde).

- [ ] **Step 5: Commit**

```bash
git add resources/js/pages/Contato.tsx
git commit -m "feat: adiciona contatos setoriais à página de Contato"
```

---

### Task 5: Mapa e localização

**Files:**
- Modify: `resources/js/pages/Contato.tsx`

**Interfaces:**
- Consumes: `Contato.tsx` da Tarefa 4; componente `GoogleMap` de `resources/js/components/GoogleMap.tsx` (props `apiKey: string`, `lat: number`, `lng: number`), já validado em uso no `Footer.tsx`.
- Produces: página `Contato.tsx` completa (todas as 4 seções da spec).

- [ ] **Step 1: Adicionar a seção de mapa em `Contato.tsx`**

Substitua o conteúdo de `resources/js/pages/Contato.tsx` por:

```tsx
import React from 'react';
import GoogleMap from '../components/GoogleMap';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const coordinates = { lat: -22.503, lng: -41.923611 };

  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
        {/* PAGE HEADER BANNER */}
        <section className="page-header-banner">
          <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
          <div className="page-header-overlay"></div>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-serif)' }}>Contato</h1>
            <div className="page-header-breadcrumb">
              <a href="/">Home</a> <span className="mx-1">/</span> <span>Contato</span>
            </div>
          </div>
        </section>

        {/* FORM + CONTACT INFO SECTION */}
        <section className="contact-section">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="contact-form-card">
                  <h2 className="section-title">Envie uma Mensagem</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="nome" className="form-label d-block">Nome</label>
                        <input type="text" id="nome" name="nome" className="form-control" placeholder="Seu nome completo" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label d-block">E-mail</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <label htmlFor="assunto" className="form-label d-block">Assunto</label>
                    <input type="text" id="assunto" name="assunto" className="form-control" placeholder="Sobre o que deseja falar?" />
                    <label htmlFor="mensagem" className="form-label d-block">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" className="form-control" rows={5} placeholder="Escreva sua mensagem..."></textarea>
                    <button type="submit" className="btn btn-primary btn-lg px-4 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="contact-info-card">
                  <h5 className="fw-bold">Informações de Contato</h5>

                  <div className="contact-info-item">
                    <i className="bi bi-geo-alt"></i>
                    <p>Rua Recife, s/n, Jardim Bela Vista<br />Rio das Ostras – RJ | CEP: 28895-532</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-telephone"></i>
                    <p>(22) 2764-9081</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-clock"></i>
                    <p>Segunda a sexta, das 8h às 17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTORAL CONTACTS SECTION */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="serif-title">Contatos Setoriais</h2>
              <p className="text-muted">Fale diretamente com o setor responsável pelo seu assunto.</p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="custom-card">
                  <div className="card-icon"><i className="bi bi-person-workspace"></i></div>
                  <h5>Coordenação do Programa</h5>
                  <p>coordenacao@mesc.uff.br<br />(22) 2764-9081</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="custom-card">
                  <div className="card-icon"><i className="bi bi-folder2-open"></i></div>
                  <h5>Secretaria Acadêmica</h5>
                  <p>secretaria@mesc.uff.br<br />Segunda a sexta, das 8h às 17h</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="custom-card">
                  <div className="card-icon"><i className="bi bi-tools"></i></div>
                  <h5>Suporte Técnico e Laboratórios</h5>
                  <p>suporte@mesc.uff.br</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="py-5 bg-white border-top">
          <div className="container">
            <div className="row align-items-center mb-4">
              <div className="col-lg-4">
                <h2 className="section-title">Como Chegar</h2>
              </div>
              <div className="col-lg-8">
                <p className="presentation-text mb-0">
                  Instituto de Ciência e Tecnologia – UFF<br />
                  Rua Recife, s/n, Jardim Bela Vista, Rio das Ostras – RJ | CEP: 28895-532
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded shadow-sm" style={{ height: '350px' }}>
              <GoogleMap
                apiKey={GOOGLE_MAPS_API_KEY}
                lat={coordinates.lat}
                lng={coordinates.lng}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: sem erros.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build finaliza com sucesso.

- [ ] **Step 4: Verificação manual**

Em `http://127.0.0.1:8000/contato`, confirme que a seção "Como Chegar" mostra o endereço e, abaixo, o mapa renderizado com o mesmo pino verde/azul usado no Footer (mesmas coordenadas). Confirme que a página inteira (banner → formulário → contatos setoriais → mapa → footer) segue a paleta e tipografia da Home, e teste o layout em uma largura de tela estreita (mobile) redimensionando a janela do navegador.

- [ ] **Step 5: Commit**

```bash
git add resources/js/pages/Contato.tsx
git commit -m "feat: adiciona mapa e localização à página de Contato"
```

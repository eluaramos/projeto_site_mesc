# Portal Institucional - MESC

## 🎯 Objetivo
Este projeto é o portal web oficial do **Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais (MESC)**. O objetivo do site é centralizar e organizar todas as informações essenciais do programa — como estrutura curricular, corpo docente, comissões, editais de seleção, normativas e notícias — oferecendo uma navegação rápida, acessível e intuitiva para alunos, professores e a comunidade acadêmica.

## 🛠️ Tecnologias Utilizadas (Stack)
O portal foi construído utilizando uma stack moderna focada em performance e manutenibilidade:

* **Back-end:** Laravel (PHP)
* **Front-end:** React com TypeScript (.tsx) via Inertia.js
* **Estilização:** Bootstrap 5 integrado com variáveis CSS nativas (Custom Properties) para fácil adaptação da identidade visual.
* **Bundler:** Vite

## 🚀 Como Rodar o Projeto Localmente

**Pré-requisitos:** Certifique-se de ter o PHP, Composer e o Node.js/npm instalados na sua máquina.

**Passo a passo:**

1. Clone o repositório:
   git clone URL_DO_SEU_REPOSITORIO
   cd NOME_DA_PASTA

2. Instale as dependências do Back-end (PHP):
   composer install

3. Instale as dependências do Front-end (Node):
   npm install

4. Configure o ambiente:
   Duplique o arquivo de configuração e gere a chave da aplicação Laravel:
   cp .env.example .env
   php artisan key:generate

5. Inicie o servidor de desenvolvimento:
   Para subir a aplicação e compilar os assets do React em tempo real, utilize o comando:
   composer run dev

   (Nota: Dependendo da configuração do seu composer.json, este comando orquestra o ambiente. Caso precise rodar os serviços manualmente de forma isolada, você pode abrir dois terminais: um rodando "php artisan serve" e outro rodando "npm run dev").

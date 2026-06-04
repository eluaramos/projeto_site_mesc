# Portal Institucional - MESC

## 🎯 Objetivo
Este projeto é o portal web oficial do **Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais (MESC)**. O objetivo do site é centralizar e organizar todas as informações essenciais do programa — como estrutura curricular, corpo docente, comissões, editais de seleção, normativas e notícias — oferecendo uma navegação rápida, acessível e intuitiva para alunos, professores e a comunidade acadêmica.

## 🛠️ Tecnologias Utilizadas (Stack)
O portal foi construído utilizando uma stack moderna focada em performance e manutenibilidade:

* **Back-end:** Laravel (PHP)
* **Front-end:** React com TypeScript (.tsx) via Inertia.js
* **Estilização:** Bootstrap 5 integrado com variáveis CSS nativas (Custom Properties) para fácil adaptação da identidade visual.
* **Bundler:** Vite

## 🐳 Como Rodar via DevContainer (Recomendado)

Este projeto está configurado para ser executado em um ambiente isolado utilizando **Docker** e **VS Code DevContainers**. Esta é a forma mais fácil de começar sem precisar instalar PHP ou Node.js localmente.

**Pré-requisitos:**
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
*   [Visual Studio Code](https://code.visualstudio.com/)
*   Extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) instalada no VS Code.

**Passo a passo:**

1.  Abra a pasta do projeto no VS Code.
2.  O VS Code exibirá uma notificação perguntando se deseja abrir a pasta no container. Clique em **"Reopen in Container"**.
    *   *Caso não apareça, clique no ícone azul no canto inferior esquerdo e selecione "Reopen in Container".*
3.  O Docker irá baixar as imagens e configurar o ambiente automaticamente (isso pode demorar alguns minutos na primeira vez).
4.  Após a inicialização, o container já terá o banco de dados SQLite configurado e as dependências instaladas.
5.  Inicie o servidor de desenvolvimento:
    ```bash
    composer run dev
    ```

---

## 🚀 Como Rodar o Projeto Localmente (Manual)

**Pré-requisitos:** PHP 8.2+, Composer e Node.js/npm.

**Passo a passo:**

1.  Clone o repositório e acesse a pasta.
2.  Instale as dependências:
    ```bash
    composer install && npm install
    ```
3.  Configure o ambiente:
    ```bash
    cp .env.example .env
    php artisan key:generate
    touch database/database.sqlite
    php artisan migrate
    ```
4.  Inicie o servidor:
    ```bash
    composer run dev
    ```

*(Nota: O projeto está configurado para usar **SQLite** e drivers de arquivo para Sessão/Cache em desenvolvimento para facilitar a execução rápida.)*

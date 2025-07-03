# Testes Cypress no Projeto TodoMVC (Angular)

Este repositório contém testes automatizados utilizando [Cypress.io](https://www.cypress.io/) para a implementação do [TodoMVC com Angular](https://todomvc.com/examples/angularjs/).

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

* **Git**: Para clonar o repositório. ([Download Git](https://git-scm.com/downloads))
* **Node.js** e **npm** (ou Yarn): Para gerenciar as dependências do projeto e do Cypress. Recomenda-se a versão LTS mais recente do Node.js. ([Download Node.js](https://nodejs.org/en/download/))
* **Angular CLI**: Ferramenta de linha de comando para projetos Angular.
    ```bash
    npm install -g @angular/cli
    # ou
    yarn global add @angular/cli
    ```

## Configuração do Ambiente

Siga os passos abaixo para configurar o projeto e os testes em sua máquina local.

### 1. Clonar o Repositório do TodoMVC (Angular)

O projeto TodoMVC original não mantém todas as implementações no repositório principal de forma simples para clonagem e execução individual. Para este guia, vamos clonar o repositório principal e navegar para a pasta da implementação Angular.

```bash
# Clone o repositório principal do TodoMVC
git clone [https://github.com/tastejs/todomvc.git](https://github.com/tastejs/todomvc.git)

# Navegue para a pasta da implementação Angular
cd todomvc/examples/angular
````

### 2\. Instalar Dependências do Projeto TodoMVC (Angular)

Dentro da pasta `todomvc/examples/angularjs`, instale as dependências específicas deste projeto:

```bash
npm install
# ou
yarn install
```

### 3\. Subir o Projeto de Exemplo (Angular)

Para rodar os testes Cypress, a aplicação Angular precisa estar em execução. Vamos iniciá-la na porta 8080.

```bash
# Na pasta todomvc/examples/angular
ng serve --port 8080
```

Isso iniciará o servidor de desenvolvimento do Angular. A aplicação estará acessível em `http://localhost:8080/`. **Mantenha este terminal aberto enquanto estiver executando os testes Cypress.**

### 4\. Configurar e Instalar Cypress no Seu Repositório de Testes

Agora, você deve configurar o seu **próprio repositório Git** onde seus testes Cypress serão armazenados. Assumindo que você está no diretório onde deseja criar a pasta para seus testes (ex: `~/meus_projetos/`):

```bash
# Crie uma nova pasta para o seu projeto de testes Cypress
mkdir todomvc-cypress-tests
cd todomvc-cypress-tests

# Inicialize um novo projeto Node.js
npm init -y

# Instale o Cypress como uma dependência de desenvolvimento
npm install cypress --save-dev
# ou
yarn add cypress --dev

# Abra o Cypress para inicializar a estrutura do projeto
yarn cypress open
```

Ao executar `npx cypress open` pela primeira vez, o Cypress fará a configuração inicial, criará a pasta `cypress/`, `cypress.config.js` e exemplos de testes. Escolha a opção "E2E Testing" quando solicitado.

### 5\. Configurar `cypress.config.js`

Edite o arquivo `cypress.config.js` na raiz do seu projeto de testes Cypress (`todomvc-cypress-tests`) para apontar para a URL base da aplicação TodoMVC Angular rodando localmente.

```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/', // A URL onde o TodoMVC Angular está rodando
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Padrão para encontrar seus arquivos de teste
  },
});
```

### 6\. Configurar Autocompletar (IntelliSense) no VS Code

Para ter o autocompletar e os snippets do Cypress funcionando no VS Code, crie um arquivo `jsconfig.json` (se usar JavaScript) ou `tsconfig.json` (se usar TypeScript) na **raiz do seu projeto de testes Cypress** (`todomvc-cypress-tests`).

**`jsconfig.json` (para JavaScript):**

```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["es6", "dom"],
    "types": ["cypress", "node"]
  },
  "include": [
    "cypress/**/*.js"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

**`tsconfig.json` (para TypeScript):**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"],
    "esModuleInterop": true
  },
  "include": [
    "cypress/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

**Instale uma extensão de snippets (Opcional, mas Recomendado):**
No VS Code, vá para a aba "Extensions" (Ctrl+Shift+X) e pesquise por "Cypress Snippets" (de Andrew Smith) ou "Cypress Helper" (de Oleksandr Shevtsov) e instale uma delas para ter snippets e autocompletar aprimorado para comandos do Cypress.

## Escrevendo e Executando Testes

Agora você está pronto para criar e executar seus testes Cypress.

### 1\. Criar um Arquivo de Teste

Crie seus arquivos de teste na pasta `cypress/e2e/`. Por exemplo: `cypress/e2e/todo.cy.js`.

**Exemplo de teste simples (`cypress/e2e/todo.cy.js`):**

```javascript
describe('TodoMVC - Angular App', () => {
  beforeEach(() => {
    cy.visit('/'); // Visita a baseUrl configurada (http://localhost:8080/)
  });

  it('should display the TodoMVC title', () => {
    cy.get('h1').should('contain', 'todos');
  });

  it('should allow adding new todo items', () => {
    const newItem = 'Learn Cypress';
    cy.get('.new-todo').type(newItem + '{enter}');
    cy.get('.todo-list li').should('have.length', 1);
    cy.get('.todo-list li').first().should('contain', newItem);
  });

  it('should mark a todo as completed', () => {
    const newItem = 'Finish Cypress Docs';
    cy.get('.new-todo').type(newItem + '{enter}');
    cy.get('.toggle').click(); // Clica na checkbox
    cy.get('.todo-list li').first().should('have.class', 'completed');
  });

  // Adicione mais testes aqui...
});
```

### 2\. Executar os Testes

Certifique-se de que o servidor do TodoMVC Angular (`ng serve --port 8080`) está rodando em um terminal separado.

Para executar os testes:

    ```bash
    yarn cypress open
    ```

    Isso abrirá a interface gráfica do Cypress, onde você pode selecionar e rodar seus testes

    Isso executará todos os seus testes no terminal sem abrir a interface gráfica, útil para ambientes de Integração Contínua (CI/CD).


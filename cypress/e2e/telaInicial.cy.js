// cypress/e2e/telainicial.cy.js

// Importa a CLASSE TelaInicial do seu Page Object
import TelaInicial from '../support/pageObjects/telaInicial.page'; // Verifique o caminho correto

describe('Testes do TodoMVC Angular', () => {
    // Cria uma instância do Page Object para ser usada em cada teste
    let telaInicial;
    beforeEach(() => {
        cy.visit('/');
        // // Instancia o Page Object antes de cada teste
        telaInicial = new TelaInicial();
    });

    it('valida texto central da tela', () => {
        telaInicial.textCenter();
    });

});
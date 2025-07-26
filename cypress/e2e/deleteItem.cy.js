// Importa a CLASSE TelaInicial do seu Page Object
import TelaInicial from '../support/pageObjects/telaInicial.page'; // Verifique o caminho correto

describe('Deletando Itens no TodoMVC', () => {
    // Cria uma instância do Page Object para ser usada em cada teste
    let telaInicial;
    beforeEach(() => {
        cy.visit('/');
        // // Instancia o Page Object antes de cada teste
        telaInicial = new TelaInicial();
        it('valida texto central da tela', () => {
            telaInicial.textCenter();
        });
        // Criando array para armazenar os itens que serão inputados
        const itensInputados = [];
        for (let i = 0; i <= 6; i++) {
            // gerando nome do item e adicionando no array
            const item = `item${i}`;
            itensInputados.push(item);
            // inputando o item
            telaInicial.inputItem(item);
            // Captura o texto do primeiro item para verificar depois
        }
    });


    it('deletar primeiro item', () => {
        telaInicial.deletarPrimeiroItem();
    });


});
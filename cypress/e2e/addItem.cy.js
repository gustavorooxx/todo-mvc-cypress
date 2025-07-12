// Importa a CLASSE TelaInicial do seu Page Object
import TelaInicial from '../support/pageObjects/telaInicial.page'; // Verifique o caminho correto

describe('Adicionando Itens no TodoMVC', () => {
    // Cria uma instância do Page Object para ser usada em cada teste
    let telaInicial;
    beforeEach(() => {
        cy.visit('/');
        // // Instancia o Page Object antes de cada teste
        telaInicial = new TelaInicial();

        it('valida texto central da tela', () => {
            telaInicial.textCenter();
        });
    });

    it('adicionando apenas um item', () => {
        telaInicial.inputItem("dado1");

    });

    it('adicionando mais de um item e valida nome do item', () => {
        // Criando array para armazenar os itens que serão inputados
        const itensInputados = [];
        for (let i = 0; i <= 6; i++) {
            // gerando nome do item e adicionando no array
            const item = `item${i}`;
            itensInputados.push(item);
            // inputando o item
            telaInicial.inputItem(item);
        }
        // 1. Seleciona todos os elementos <app-todo-item>
        cy.get('app-todo-item').each(($appTodoItem, index) => {
            // 2. Dentro de cada 'app-todo-item', encontre o elemento <label>
            cy.wrap($appTodoItem).find('label').then(($label) => {
                // 3. Obtenha o texto do label e faça a asserção
                const textoDoItem = $label.text().trim(); // Use .trim() para remover espaços em branco extras, se houver
                // Verifique se o texto do item corresponde ao dado esperado no índice atual
                expect(textoDoItem).to.equal(itensInputados[index]);
            });
        });
    });

});
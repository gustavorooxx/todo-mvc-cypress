const elements = require('../elements/telaInicial.elements').elements

class TelaInicial {
    // Métodos
    textCenter() {
        cy.get(elements.textCenter).should('contain', 'Todos');
    }
    inputItem(item) {
        cy.get(elements.inputDados).type(item + '{enter}')
    }
    concluirItem(){
         cy.get('app-todo-item').each(($appTodoItem, index) => {
            cy.wrap($appTodoItem)
            .find('.toggle')
            .check();
            });
    }
    validaItemMarcado(){
        cy.get('app-todo-item').each(($appTodoItem, index) => {
        cy.wrap($appTodoItem).find('.toggle').should('be.checked');
         });
    }


}

// Exporta a CLASSE TelaInicial como default
export default TelaInicial;
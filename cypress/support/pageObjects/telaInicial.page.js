const elements = require('../elements/telaInicial.elements').elements

class TelaInicial {
    // Métodos
    textCenter() {
        cy.get(elements.textCenter).should('contain', 'Todos');
    }
    inputItem(item) {
        cy.get(elements.inputDados).type(item + '{enter}')
    }
    concluirItens() {
        cy.get(elements.todoListItem).each(($appTodoItem, index) => {
            cy.wrap($appTodoItem)
                .find('.toggle')
                .check();
        });
    }
    validaItemMarcadoeCompleto() {
        cy.get(elements.completed).click();
        cy.get(elements.todoListItem).each(($appTodoItem, index) => {
            cy.wrap($appTodoItem).find('.toggle').should('be.checked');
        });
    }

    conlcuirPrimeiroItem() {
        cy.get(elements.todoListItem)
            .find('.toggle')
            .first()
            .click()
        cy.get(elements.completed)
            .click()
            .get(elements.todoListItem)
            .find('.toggle')
            .should('be.checked')
            .get(elements.todoListItem)
            .should('contain', 'item0');;
    }

    conlcuirUltimoItem() {
        cy.get(elements.todoListItem)
            .find('.toggle')
            .last()
            .click()
        cy.get(elements.completed)
            .click()
            .get(elements.todoListItem)
            .find('.toggle')
            .should('be.checked')
            .get(elements.todoListItem)
            .should('contain', 'item6');
    }




}

// Exporta a CLASSE TelaInicial como default
export default TelaInicial;
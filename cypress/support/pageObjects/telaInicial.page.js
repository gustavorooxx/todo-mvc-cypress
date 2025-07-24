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
            .should('be.checked');;
    }

    conlcuirUltimoItem() {
        cy.get(elements.todoListItem)
            .find('.toggle')
            .last()
            .click()
            .should('be.checked');;
    }

    filtraItemCompleto() {
        cy.get(elements.completed).click()
            .get(elements.todoListItem)
            .find('.toggle')
            .first()
            .should('be.checked')
            .get(elements.todoListItem)
            .should('contain', 'item0')
            .find('.toggle')
            .last()
            .should('be.checked')
            .get(elements.todoListItem)
            .should('contain', 'item6');
    }

    filtraItemAtivo() {
        const expectedTexts = [
            "item1",
            "item2",
            "item3",
            "item4",
            "item5"
        ];
        cy.get(elements.active).click();
        cy.get(elements.todoListItem).each(($appTodoItem, index) => {
            cy.wrap($appTodoItem)
                .should('include.text', expectedTexts[index]);
        });
    }

    filtraTodosOsItens() {
        const expectedTexts = [
            "item0",
            "item1",
            "item2",
            "item3",
            "item4",
            "item5", 
            "item6",
        ];
        cy.get(elements.todoListItem).each(($appTodoItem, index) => {
            // 2. Dentro de cada 'app-todo-item', encontre o elemento <label>
            cy.wrap($appTodoItem).find('label').then(($label) => {
                // 3. Obtenha o texto do label e faça a asserção
                const textoDoItem = $label.text().trim(); // Use .trim() para remover espaços em branco extras, se houver
                // Verifique se o texto do item corresponde ao dado esperado no índice atual
                expect(textoDoItem).to.equal(expectedTexts[index]);
            });
        });
    }

}

// Exporta a CLASSE TelaInicial como default
export default TelaInicial;
const elements = require('../elements/telaInicial.elements').elements

class TelaInicial {
    // Métodos
    textCenter() {
        cy.get(elements.textCenter).should('contain', 'Todos');
    }
    inputItem(item) {
        cy.get(elements.inputDados).type(item + '{enter}')
    }
    validaItem(){
        
    }


}

// Exporta a CLASSE TelaInicial como default
export default TelaInicial;
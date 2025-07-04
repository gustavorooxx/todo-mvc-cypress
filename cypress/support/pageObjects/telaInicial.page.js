const elements = require('../elements/telaInicial.elements').elements

class TelaInicial {
    // Métodos
    textCenter() {
        cy.get(elements.textCenter).should('contain', 'Todos');
    }

}

// Exporta a CLASSE TelaInicial como default
export default TelaInicial;
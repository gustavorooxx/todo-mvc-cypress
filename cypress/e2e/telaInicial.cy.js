import telaInicialPage from "../support/pageObjects/telaInicial.page"


describe('acessar tela inicial', () => {
    it('abrir site', () => {
        cy.visit('https://google.com')
    })
})
context('Saleor main page', () => {
  it('loads the main page', () => {
    cy.visit('')
      .get('.home-page__hero').should('be.visible')
  })
})

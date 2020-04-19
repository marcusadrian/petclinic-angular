/// <reference types="Cypress" />
describe('The Owner Search Page', () => {
  it('find by first name', () => {
    cy.visit('/owners/search')
    cy.get('[data-cy=firstName]').type('je{enter}')
    cy.get('[data-cy=search-result]').eq(0).should('contain', ' Jeff Black ')
    cy.get('[data-cy=search-result]').eq(1).should('contain', ' Jean Coleman ')
  })
})

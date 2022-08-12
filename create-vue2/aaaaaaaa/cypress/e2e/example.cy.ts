// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/index')
    cy.contains('h1', 'You did it!')
  })
})

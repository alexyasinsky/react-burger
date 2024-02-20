describe('testing constructor page', () => {

  it('open ingredient details', () => {
    cy.prepare('1@1.com', '123');
    const ingredientId = '643d69a5c3f7b9001cfa0941';
    cy.get(`[data-test-ingredient=${ingredientId}]`).click();
    cy.get('[data-test-comp=modal]').should('exist');
    cy.get(`[data-test-modal-ingredient=${ingredientId}]`).should('exist')
  })

  // Cypress.on('uncaught:exception', (err, runnable) => {
  //   // returning false here prevents Cypress from
  //   // failing the test
  //   return false
  // })
  //
  // it('drag and drop ingredients from list to constructor', () => {
  //   cy.prepare('1@1.com', '123');
  //   const dataTransfer = new DataTransfer();
  //   const fillingId = '643d69a5c3f7b9001cfa0941';
  //   cy.get(`[data-test-ingredient=${fillingId}]`).drag('[data-test-drop=filling]');
  //
  // })
})
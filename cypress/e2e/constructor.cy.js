describe('testing constructor page', () => {

  it('open ingredient details', () => {
    cy.prepare('1@1.com', '123');
    const ingredientId = '643d69a5c3f7b9001cfa0941';
    cy.get(`[data-test-ingredient=${ingredientId}]`).click();
    cy.get('[data-test-modal=comp]').should('exist');
    cy.get(`[data-test-modal-ingredient=${ingredientId}]`).should('exist')
    cy.get('[data-test-modal=close]').click()
  })

  const DROP_BUN_SELECTOR = '[data-test-drop=bun]';
  const DROP_FILLING_SELECTOR = '[data-test-drop=filling]';

  it('drag and drop ingredients from list to constructor', () => {
    cy.prepare('1@1.com', '123');
    const bunId = "643d69a5c3f7b9001cfa093c";
    const mainId = '643d69a5c3f7b9001cfa0941';
    const sauceId = "643d69a5c3f7b9001cfa0943";
    cy.get("[data-test-ingredients-menu-tab='buns']").click();
    cy.get(`[data-test-ingredient=${bunId}]`).drag(DROP_BUN_SELECTOR);
    cy.get(`[data-test-bun-id=${bunId}]`).should('exist');
    cy.get("[data-test-ingredients-menu-tab='main']").click();
    cy.get(`[data-test-ingredient=${mainId}]`).drag(DROP_FILLING_SELECTOR);
    cy.get(`[data-test-filling-id=${mainId}]`).should('exist');
    cy.get("[data-test-ingredients-menu-tab='sauces']").click();
    cy.get(`[data-test-ingredient=${sauceId}]`).drag(DROP_FILLING_SELECTOR).first();
    cy.get(`[data-test-filling-id=${sauceId}]`).should('exist');
  })


  it('test order making', () => {
    cy.intercept('POST', 'api/orders', {fixture: 'makeOrder.json'}).as("makeOrder")
    cy.prepare('1@1.com', '123');
    const bunId = "643d69a5c3f7b9001cfa093d";
    const mainId = '643d69a5c3f7b9001cfa0941';
    const sauceId = "643d69a5c3f7b9001cfa0943";
    cy.get("[data-test-ingredients-menu-tab='buns']").click();
    cy.get(`[data-test-ingredient=${bunId}]`).drag(DROP_BUN_SELECTOR);
    cy.get(`[data-test-bun-id=${bunId}]`).should('exist');
    cy.get("[data-test-ingredients-menu-tab='main']").click();
    cy.get(`[data-test-ingredient=${mainId}]`).drag(DROP_FILLING_SELECTOR);
    cy.get(`[data-test-filling-id=${mainId}]`).should('exist');
    cy.get("[data-test-ingredients-menu-tab='sauces']").click();
    cy.get(`[data-test-ingredient=${sauceId}]`).drag(DROP_FILLING_SELECTOR).first();
    cy.get(`[data-test-filling-id=${sauceId}]`).should('exist');
    cy.get('[data-test-button=makeOrder]').click();
    cy.get('[data-test-order-number=34571]').should('exist');
    cy.get('[data-test-modal=close]').click()
  })


})
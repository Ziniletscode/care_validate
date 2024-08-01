import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
    // Landed on login form screen
    cy.get('label:nth-of-type(1) > .col.q-field__inner.relative-position.self-stretch > .no-wrap.q-field__control.relative-position.row > .col.no-wrap.q-anchor--skip.q-field__control-container.relative-position.row')
      .should('be.visible');
    cy.get('label:nth-of-type(2) > .col.q-field__inner.relative-position.self-stretch > .no-wrap.q-field__control.relative-position.row > .col.no-wrap.q-anchor--skip.q-field__control-container.relative-position.row')
      .should('be.visible');

    // Enter login credentials
    cy.get('input[name="email"]').should('be.visible').type(email);
    cy.get('input[name="password"]').should('be.visible').type(password);
    cy.get('.q-form > [tabindex]').should('be.visible').click();
});
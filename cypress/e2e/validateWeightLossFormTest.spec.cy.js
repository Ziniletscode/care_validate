// cypress/e2e/test2.spec.cy.js
describe('Weight Loss Eligibility Intake Form Test', () => {
  // Load fixture data before each test
  beforeEach(() => {
    cy.fixture('test_data').as('testdata'); // Load fixture data and alias it as 'testData'
  });

  it('submits the form and verifies the submission', function() {
    // Access the fixture data using 'this'
    const newTestdata = this.testdata;

    // Visit the login page
    cy.visit('https://careglp-staging.carevalidate.com/login');

    // Login
    cy.get('.q-form > .flex.items-center.justify-center.q-mt-md').should('be.visible').click();
    cy.get('input[name="email"]').should('be.visible').type('qa+employee@carevalidate.com');
    cy.get('input[name="password"]').should('be.visible').type('bLPgk5tr7D3ZqpXvV@aNKz');
    cy.get('.q-form > [tabindex]').should('be.visible').click();

    // Select the form
    cy.get(`[data-testid] [role="listitem"]:nth-of-type(10) .q-item__section--main .q-item__label:nth-of-type(1)`, { timeout: 10000 })
      .should('be.visible')
      .contains(newTestdata.form).click();

    // Fill out the form
    let qIndex = 4;
    newTestdata.formSteps.forEach((x) => {
      cy.get(`.q-stepper__content [role="tabpanel"]:nth-child(${qIndex}) .q-stepper__title`, { timeout: 10000 })
        .should('be.visible').contains(x.label);

      switch (x.inputType) {
        case 'select':
          cy.get('[filteredform]', { timeout: 10000 }).should('be.visible').click();
          cy.get('[aria-multiselectable] [tabindex] [role="option"]:nth-of-type(1)').click();
          break;
        case 'multiselect':
          cy.get('.q-option-group .q-checkbox').each(($checkbox) => {
            cy.wrap($checkbox).find('.q-checkbox__label').then(($label) => {
              if (x.value.includes($label.text())) {
                cy.wrap($checkbox).click();
              }
            });
          });
          break;
        case 'date':
          cy.get('.q-stepper__step-content .q-date__calendar-item--in button').contains(x.value).click();
          break;
        case 'radio':
          cy.get('div.q-radio').contains(x.value).click();
          break;
        case 'upload':
          cy.get('input[type="file"]')
          .attachFile(x.value);
          cy.get('div:nth-of-type(19) .q-stepper__caption').should('have.text', x.value);
          break;
        default:
          cy.get('[filteredform]', { timeout: 10000 }).should('be.visible').type(x.value);
          break;
      }

      if (qIndex === 4) {
        cy.get('.q-stepper__nav [tabindex]').should('be.visible').click();
      } else {
        cy.get('.q-stepper__nav [tabindex="0"]:nth-of-type(2)').should('be.visible').click();
      }
      qIndex++;
    });

    // Submit the form
    cy.get('[data-testid="submit-button"]').should('be.visible').click();

    // Verify submission confirmation
    cy.get('.no-shadow.q-card.q-card--bordered.q-card--flat').should('be.visible');
    cy.get('div[role="dialog"] .bg-primary.no-outline.non-selectable.q-btn.q-btn--actionable.q-btn--no-uppercase.q-btn--rectangle.q-btn--unelevated.q-btn-item.text-white > .col.items-center.justify-center.q-anchor--skip.q-btn__content.row.text-center')
      .click();

    cy.get('div[role="dialog"] .q-card__section.q-card__section--vert', { timeout: 10000 })
      .should('contain.text', newTestdata.thankyouMessage);

    cy.get('[data-testid="close-dialog-button"]', { timeout: 10000 }).should('be.visible').click();

    // Navigate to My Requests
    cy.get('.col.q-list.q-list--padding > a:nth-of-type(1)  .q-item__label').should('have.text', newTestdata.myRequest)
      .click({ force: true });

    // Verify request status
    cy.get('[class] .sortable:nth-of-type(1) .text-weight-bold', { timeout: 10000 }).should('have.text', newTestdata.created).dblclick();
    cy.get('tbody .cursor-pointer:nth-of-type(1) [data-testid]', { timeout: 10000 }).should('have.text', newTestdata.submitted);
  });
});

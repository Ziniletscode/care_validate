describe('template spec', () => {
  it('passes', () => {


    const formSteps = [
      {
          label: 'What was your gender at birth? *',
          inputType: 'select',
          value: 'Male'
      },
      {
        label: 'What is your age? Are you older than 18? *',
        inputType: 'input',
        value: 'Over 18'
    },
    {
      label: 'What is your height (ft, in)? *',
      inputType: 'input',
      value: '5ft'
  },
  {
    label: 'How much do you weigh (lbs)? *',
    inputType: 'input',
    value: '80'
},
{
  label: 'Do you have any of the following conditions? (select all that apply) *',
  inputType: 'multiselect',
  value: 'High Cholesterol , Fatty Liver Disease, other'
},
{
  label: 'Do you have any of the following conditions? (select all that apply) *',
  inputType: 'multiselect',
  value: 'Serious Allergic reaction to Semaglutide or Tirzepitide or compounded components , Active Cancer'
},
{
  label: 'What are your weight loss goals? *',
  inputType: 'select',
  value: 'Maintain my healthy weight'
},
{
  label: 'What weight loss initiatives have you tried in the past? (select all that apply) *',
  inputType: 'multiselect',
  value: 'Exercise, Dieting'
},
{
  label: 'Date of Birth *',
  inputType: 'date',
  value: '22'
},
{
  label: 'Email Address *',
  inputType: 'input',
  value: 'email@email.com'
},
{
  label: 'Phone number *',
  inputType: 'input',
  value: '9876543210'
},
{
  label: 'Shipping address *',
  inputType: 'input',
  value: 'abc'
},
{
  label: 'City *',
  inputType: 'input',
  value: 'bangalore'
},
{
  label: 'State *',
  inputType: 'input',
  value: 'Karnataka'
},
{
  label: 'Zip Code *',
  inputType: 'input',
  value: '560076'
},
{
  label: 'Do you require translation services? *',
  inputType: 'radio',
  value: 'No'
},
{
  label: "Please upload a government issued form of ID (Driver's License, Passport, etc). Please be sure that your full name and photo are easily visible. *",
  inputType: 'upload',
  value: 'id.jpg'
}
];
  
    cy.visit('https://careglp-staging.carevalidate.com/login');
    cy.get('.q-form > .flex.items-center.justify-center.q-mt-md').should('be.visible').click();


    //landed on login form screen

    cy.get('label:nth-of-type(1) > .col.q-field__inner.relative-position.self-stretch > .no-wrap.q-field__control.relative-position.row > .col.no-wrap.q-anchor--skip.q-field__control-container.relative-position.row')
    .should('be.visible');

    cy.get('label:nth-of-type(2) > .col.q-field__inner.relative-position.self-stretch > .no-wrap.q-field__control.relative-position.row > .col.no-wrap.q-anchor--skip.q-field__control-container.relative-position.row')
    .should('be.visible');

    cy.get('input[name="email"]').should('be.visible').type('qa+employee@carevalidate.com');
    cy.get('input[name="password"] ').should('be.visible').type('bLPgk5tr7D3ZqpXvV@aNKz');

    cy.get('.q-form > [tabindex]').should('be.visible').click();

   
    cy.get('[data-testid] [role="listitem"]:nth-of-type(10) .q-item__section--main .q-item__label:nth-of-type(1)',{ timeout: 10000 })
    .should('be.visible')
    .contains('Weight Loss Eligibility Intake Form test').click();


    let qIndex = 4;
    formSteps.forEach(x=>{
      cy.get('.q-stepper__content [role="tabpanel"]:nth-child('+qIndex+') .q-stepper__title',{ timeout: 10000 })
      .should('be.visible').contains(x.label);

      if(x.inputType == 'select'){
      cy.get('[filteredform]',{ timeout: 10000 }).should('be.visible').click()
      cy.get('[aria-multiselectable] [tabindex] [role="option"]:nth-of-type(1)').click();
      }
      else if(x.inputType.includes('multiselect')){
        cy.get('.q-option-group .q-checkbox').each(($checkbox) => {
          let labelText = '';
          cy.wrap($checkbox).find('.q-checkbox__label').then(($label) => {
            if(x.value.includes($label.text())){
              cy.wrap($checkbox).click();
            }
          });
        });
      }
      else if(x.inputType.includes('date')){
        cy.get('.q-stepper__step-content .q-date__calendar-item--in button')
        .contains(x.value) // Assuming we want to click on the 1st of the month
        .click();
      }
      else if(x.inputType === 'radio'){
        cy.get('div.q-radio')
      .contains(x.value) // Find the div containing the text "Yes"
      .click(); // Click on it
      }
      else if(x.inputType === 'upload'){
        cy.get('input[type="file"]')
      .attachFile(x.value); 

      cy.get('div:nth-of-type(19) .q-stepper__caption').should('have.text', x.value); 
      }
      else{
        cy.get('[filteredform]',{ timeout: 10000 }).should('be.visible').type(x.value);
      }

      if(qIndex == 4){
      cy.get('.q-stepper__nav [tabindex]').should('be.visible').click();
      }
      else{
        cy.get('.q-stepper__nav [tabindex="0"]:nth-of-type(2)').should('be.visible').click();
      }
      qIndex++;
    });

    cy.get('[data-testid="submit-button"]')
    .should('be.visible').click();

    cy.get('.no-shadow.q-card.q-card--bordered.q-card--flat').should('be.visible')
    cy.get('div[role="dialog"] .bg-primary.no-outline.non-selectable.q-btn.q-btn--actionable.q-btn--no-uppercase.q-btn--rectangle.q-btn--unelevated.q-btn-item.text-white > .col.items-center.justify-center.q-anchor--skip.q-btn__content.row.text-center')
    .click()


    cy.get('div[role="dialog"] .q-card__section.q-card__section--vert',{ timeout: 10000 })
  .should('contain.text', 'Thank you for your submission. We have sent you a confirmation email for your records.');

  cy.get('[data-testid="close-dialog-button"]',{ timeout: 10000 })
  .should('be.visible').click();

 cy.get ('.col.q-list.q-list--padding > a:nth-of-type(1)  .q-item__label').should('have.text','My Requests')
 .click({force: true})

 cy.get('[class] .sortable:nth-of-type(1) .text-weight-bold').should('have.text','Created').dblclick()
 cy.get('tbody .cursor-pointer:nth-of-type(1) [data-testid]').should('have.text','Submitted')

  })





})
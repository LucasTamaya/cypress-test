/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

// create a function to keep code DRY
// imagine we have multiple integrations test, we nom just need to call cy.login() in the beforeEach()
Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.findByRole("button", {
    name: /click here to login/i,
  }).click();
});

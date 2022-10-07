/// <reference types="cypress" />

describe("Todos", () => {
  beforeEach(() => {
    cy.visit("/");

    // login
    cy.findByRole("button", {
      name: /click here to login/i,
    }).click();
  });

  it("should be able to add, check and remove some todos", () => {
    cy.findByRole("textbox", {
      name: /title/i,
    })
      .type("Todo 1")
      .type("{enter}");

    cy.findByRole("textbox", {
      name: /title/i,
    }).type("Todo 2");

    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    // tests if todos has been added
    cy.findByText(/todo 1/i).should("exist");
    cy.findByText(/todo 2/i).should("exist");

    // test if Total Todos has been updated
    cy.findByText(/total todos: 2/i).should("exist");

    cy.findByRole("checkbox", {
      name: /todo 2/i,
    }).click();

    // test if we can check a todo
    cy.findByRole("checkbox", {
      name: /todo 2/i,
    }).should("be.checked");

    // test if selected todos has been updated when whe check a todo
    cy.findByText(/selected todos: 1/i).should("exist");

    // test if the checked todo is cross out
    cy.findByText(/todo 2/i).should("have.class", "line-through");

    cy.findByRole("checkbox", {
      name: /todo 2/i,
    }).click();

    // test if we can uncheck a todo
    cy.findByRole("checkbox", {
      name: /todo 2/i,
    }).should("not.be.checked");

    cy.findByText(/selected todos: 0/i).should("exist");

    // test if we can remove a todo
    cy.get('[data-cy="todo-Todo 1"] > button').click();
    cy.findByText(/todo 1/i).should("not.exist");
    cy.findByText(/total todos: 1/i).should("exist");
  });
});

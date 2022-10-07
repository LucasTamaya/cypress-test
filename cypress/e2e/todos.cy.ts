describe("Todos", () => {
  beforeEach(() => {
    cy.visit("/");

    // login
    cy.findByRole("button", {
      name: /click here to login/i,
    }).click();
  });

  it("should add a todo", () => {
    // get the input element and type some value
    cy.findByRole("textbox", {
      name: /title/i,
    }).type("First todo");

    // click on submit button
    cy.findByRole("button", {
      name: /submit/i,
    }).click();

    // test that the todo is added to the document
    cy.findByText(/first todo/i).should("exist");

    // test that a single remove button is added to the document
    cy.findByRole("button", {
      name: /remove/i,
    })
      .should("exist")
      .and("have.length", 1);

    // test that the Total Todos has been updated to 1
    cy.findByText(/total todos: 1/i).should("exist");
  });

  it("should remove a todo", () => {
    cy.findByRole("textbox", {
      name: /title/i,
    })
      .type("First todo")
      .type("{enter}");

    cy.findByRole("button", {
      name: /remove/i,
    }).click();

    // test that the todo has been removed from the document
    cy.findByText(/first todo/i).should("not.exist");
  });

  it("should remove the second todo", () => {
    cy.findByRole("textbox", {
      name: /title/i,
    })
      .type("First todo")
      .type("{enter}");

    // add the second todo
    cy.findByRole("textbox", {
      name: /title/i,
    })
      .type("Second todo")
      .type("{enter}");

    // when we add a todo, we wait 500ms, so we must make sur cypress is also waiting
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    // click on the remove button of the second todo
    cy.get('[data-cy="todo-Second todo"] > button').click();
    // cy.findByTest()

    // test that the todo has been removed from the document
    cy.findByText(/second todo/i).should("not.exist");
  });
});

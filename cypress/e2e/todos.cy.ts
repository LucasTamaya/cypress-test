describe("Todos", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a todo", () => {
    // login
    cy.findByRole("button", {
      name: /click here to login/i,
    }).click();

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
});

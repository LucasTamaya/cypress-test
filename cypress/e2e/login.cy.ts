describe("Login", () => {
  // go on the page where that we want to test
  beforeEach(() => {
    cy.visit("/");
  });

  it("should not show the todo page if we are not login", () => {
    cy.findByRole("heading", {
      name: /add todo/i,
    }).should("not.exist");
  });

  it("should login and show the todo page", () => {
    cy.findByRole("button", {
      name: /click here to login/i,
    }).click();

    cy.findByRole("heading", {
      name: /add todo/i,
    }).should("exist");
  });
});

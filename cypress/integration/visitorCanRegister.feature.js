describe("Visitor can register", () => {
  it("successfully with valid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:signup.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth",
      response: "fixture:signup.json"
    });

    cy.signup();
    cy.get("span").should("contain", "Welcome! user@mail.com");
  });

  it("unsuccessfully with already taken credentials", () => {
    cy.route({
      method: "POST",
      url: "/api/v1/**",
      response: "fixture:user_already_exists.json",
      status: 422
    });

    cy.signup();
    cy.get("#signup").should("contain", "Email has already been taken");
  });
});

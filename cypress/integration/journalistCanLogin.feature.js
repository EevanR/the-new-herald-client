/// <reference types="Cypress" />

describe("Journalist can log in", () => {
  it("unsuccessfully with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.login();
    cy.get("span").should(
      "contain",
      "Invalid login credentials. Please try again."
    );
  });

  it("successfully with valid credentials", () => {
    cy.journalistLogin();
    cy.get("span").should("contain", "Logged in as: user@mail.com");
  });
});

describe("Journalist can log out", () => {
  it("successfully", () => {
    cy.server();
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/auth/sign_out",
      response: "fixture:login_journalist.json"
    });
    cy.get("#logout-link").click();
    cy.get("#login").contains("Login");
  });
});

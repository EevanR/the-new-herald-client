/// <reference types="Cypress" />

describe("Headlines are displayed", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("successfully", () => {
  cy.route({
    method: "GET",
    url: "https://newsapi.org/v2/**",
    response: "fixture:headlines.json",
    status: 200
  });

    cy.get(".headlines-main")
      .should("contain", 1.9)
  });
});
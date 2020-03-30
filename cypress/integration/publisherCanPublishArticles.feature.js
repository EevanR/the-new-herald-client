import "../support/commands.js";

describe("Editor can", () => {
  beforeEach(() => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login_publisher.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login_publisher.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/articles?**",
      response: "fixture:publish_article_flow/articleslist_before_publish.json"
    });
    cy.route({
      method: "PUT",
      url:
        "http://localhost:3000/api/v1/admin/articles/1?[article][published]=true",
      response: "fixture:publish_article_flow/articleslist_before_publish.json"
    });
    cy.adminLogin();
  });

  it("see a list of unpublished articles", () => {
    cy.get("#review-article-1").should("contain", "Test1");
  });

  it("can publish article", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/admin/articles?**",
      response: "fixture:publish_article_flow/articleslist_after_publish.json"
    });
    cy.get("#publish-article-toggle-1").within(() => {
      cy.get(".ui.fitted.toggle.checkbox")
        .click();
    });
    cy.get("#message").should("contain", "You published article 1");
    cy.get("#unpublished-articles").not("contain", "Article 1");
  });

  it("can undo publishing article", () => {
    cy.route({
      method: "PUT",
      url:
        "http://localhost:3000/api/v1/admin/articles/1?[article][published]=false",
      response: "OK"
    });
    cy.get("#publish-article-toggle-1").within(() => {
      cy.get(".ui.fitted.toggle.checkbox")
        .click();
    });
    cy.get("#message").within(() => {
      cy.get("button")
        .contains("Undo")
        .click();
    });
    cy.get("#message").should(
      "contain",
      "Undid the publishing of article 1"
    );
  });

  it("can set 1 published article to free", () => {
    cy.route({
      method: "PUT",
      url:
        "http://localhost:3000/api/v1/admin/articles/1?[article][free]=true",
      response: "OK"
    });
    
  });
});

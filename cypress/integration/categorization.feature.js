describe("Visitor succesfully", () => {
  beforeEach(() => {
    cy.route({
      method: "GET",
      url: "https://api.openweathermap.org/data/**",
      response: "fixture:weather.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles?**category=culture**",
      response: "fixture:categorized_response.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles**",
      response: "fixture:side_articles_shown.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles?free=true",
      response: "fixture:free_article",
      status: 200
    });
  });

  it("shown big canvas categorized", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/**",
      response: "fixture:categorized_article_1.json",
      status: 200
    });

    cy.visit("/");
    cy.get("#culture.item")
      .contains("Culture")
      .click();

    cy.get("#article-title").should("contain", "Title cat 4:1");
  });

  it("shown side articles categorized", () => {
    // cy.route({
    //   method: "GET",
    //   url: "http://localhost:3000/api/v1/articles?**category=culture**",
    //   response: "fixture:categorized_response.json",
    //   status: 200
    // });

    cy.visit("/");
    cy.get("#culture.item")
      .contains("Culture")
      .click();

    cy.get("#side-articles").should("contain", "Title cat 4:2");
  });

  it("can click and get new categorized show page", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/**",
      response: "fixture:categorized_article_3.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles?**category=culture",
      response: "fixture:categorized_response.json",
      status: 200
    });
    cy.visit("/");
    cy.get("#culture.item")
      .contains("Culture")
      .click();

    cy.get("#side-article-3").should("contain", "Title cat 4:3");
    cy.get("#side-article-3").within(() => {
      cy.get("a").click();
    });
    cy.get("#article-title").should("contain", "Title cat 4:3");
  });

  it("can click and get new categorized show page", () => {
    // cy.route({
    //   method: "GET",
    //   url: "http://localhost:3000/api/v1/articles**",
    //   response: "fixture:side_articles_shown.json",
    //   status: 200
    // });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/1**",
      response: "fixture:article_show.json",
      status: 200
    });
    cy.visit("/");
    cy.get("#return")
      .contains("The Herald")
      .click();

    cy.get("#article-title").should("contain", "Article 1");
    cy.get("#side-article-4").should("contain", "Test4");
  });
  it("gets error message is no articles in that cat exist", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles?**",
      response: "fixture:side_articles_empty.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/1**",
      response: "fixture:article_empty.json",
      status: 200
    });
    cy.visit("/");
    cy.get("#culture")
      .click();

    cy.get("#error-message").should("contain", "No articles in that category yet");
  });
});

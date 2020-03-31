describe("Headlines are displayed", () => {
  beforeEach(() => {
    cy.viewport(1450, 750)
    cy.route({
      method: "GET",
      url: "https://api.openweathermap.org/data/**",
      response: "fixture:weather.json"
    })
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
    cy.route({
      method: "GET",
      url: "https://newsapi.org/v2/top-headlines?**",
      response: "fixture:headlines.json",
      status: 200
    });
  });

  it("successfully", () => {
    cy.visit("/")

    cy.get(".headlines-main")
  });
});
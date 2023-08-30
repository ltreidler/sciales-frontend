describe("Loading work pages", () => {
  beforeEach(() => {
    cy.visit("/comics/little-eden");
  });

  it("shows arrow buttons", () => {
    cy.get("#next").should("be.visible");
    cy.get("#prev").should("be.visible");
  });

  it("navigates when clicking arrow buttons", () => {
    cy.get("#next")
      .click()
      .then(() => {
        cy.url().should("not.include", "/comics/little-eden");
        cy.get("#prev")
          .click()
          .then(() => {
            cy.url().should("include", "/comics/little-eden");
          });
      });
  });

  it("navigates back and forth", () => {
    cy.get("#next")
      .click()
      .then(() => {
        cy.url().should("not.include", "/comics/little-eden");

        cy.go("back").then(() => {
          cy.url().should("include", "/comics/little-eden");
        });
      });
  });
});

describe("Work page navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#nav-illustrations").click();

    cy.get("#nav-comics").click();

    cy.get("#tabList-illustrations").as("illustrationList");
    cy.get("#tabList-comics").as("comicList");
  });

  it("shows tab lists", () => {
    cy.get("@comicList").should("be.visible");
    cy.get("@illustrationList").should("be.visible");
  });

  it("hides prev arrow on first comic", () => {
    cy.get(".navlink-comics").first().click();

    cy.get("#prev").should("not.exist");
  });

  it("hides next arrow on final illustration", () => {
    cy.get(".navlink-illustrations").last().click();

    cy.get("#next").should("not.exist");
  });

  it("keeps active category list open when header is clicked", () => {
    // Click first comic link
    cy.get(".navlink-comics").first().click();
    //click the comics header
    cy.get("#nav-comics").click();

    //comic link should remain visible
    cy.get(".navlink-comics").should("be.visible");

    //click an illustration link
    cy.get(".navlink-illustrations").first().click();

    //click the comic header again
    cy.get("#nav-comics").click();
    cy.get(".navlink-comics").should("not.be.visible");
  });
});

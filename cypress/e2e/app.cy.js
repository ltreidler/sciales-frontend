describe("Loading the site", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.get("body").should("be.visible");
  });

  it("shows the navbar", () => {
    cy.get("nav").should("be.visible");
  });

  it("correctly display navbar links", () => {
    cy.get("nav").contains("Home");
    cy.get("nav").contains("Bio");
    cy.get("nav").contains("Contact");
    cy.get("nav").contains("Illustrations");
    cy.get("nav").contains("Comics");
  });
});

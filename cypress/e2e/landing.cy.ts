describe("verify if landing loads correct", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080);
    cy.get("h1").should("contain", "Where your worlds come to reality.");
    cy.get("h1").should("contain", "reality.");
    cy.get("img").should("be.visible");
    //when you click on the button, it should take you to the login page
    cy.get("button").should("be.visible").click();
    cy.url().should("include", "/signin");
  });
});

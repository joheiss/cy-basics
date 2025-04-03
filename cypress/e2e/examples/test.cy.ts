describe("Some examples", () => {

    it(`I navigate to page "https://www.cypress.io/`, () => {
        cy.once("uncaught:exception", () => false);
        cy.visit("https://www.cypress.io/");
        cy.title().should("contain", "Testing Frameworks");
    });
});
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(`I navigate to page {string}`, (url: string) => {
  cy.once("uncaught:exception", () => false);
  cy.visit("https://www.cypress.io/");
});

Then(`I should see the title containing {string}`, (title:string) => {
    cy.title().should("contain", "Testing Frameworks");
});

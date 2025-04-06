export abstract class BasePage {

    navigateTo(url: string): void {
        cy.once("uncaught:exception", () => false);
        cy.visit(url);
    }
}
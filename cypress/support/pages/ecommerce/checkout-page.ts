import { BasePage } from "../base-page";

export class CheckoutPage extends BasePage {
    public purchase(country: string) {
        this.enterCountry(country);
        this.checkTerms();
        this.clickPurchaseButton();
    }

    private enterCountry(country: string) {
        cy.get("#country").type(country);
        cy.get("div.suggestions > ul > li", { timeout: 5100 })
            .contains(country)
            .click();
        cy.get("#country").should("contain.value", country);
    }

    private checkTerms() {
        cy.get("#checkbox2").check({ force: true }).should("be.checked");
    }

    private clickPurchaseButton() {
        cy.get("input[type=submit][value=Purchase]").click();
        cy.contains("Success!").should("be.visible");
    }
}

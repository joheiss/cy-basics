import { BasePage } from "../base-page";
import { ShoppingCartPage } from "./shopping-cart-page";

export class ProductsPage extends BasePage {
    public addProductToCart(productName: string) {
        this.clickAddToCartButton(productName);
        // -- check the content of the checkout button
        cy.contains(/Checkout \( [\d*] \)/).should("exist");
        cy.contains(/Checkout ( 0 )/).should("not.exist");
    }

    public checkout(): ShoppingCartPage {
        this.clickCheckoutButton();
        return new ShoppingCartPage();
    }

    private clickAddToCartButton(productName) {
        cy.get("app-card")
            .filter(":contains('" + productName + "')")
            .find("button")
            .contains(/add/i)
            .click();
    }

    private clickCheckoutButton() {
        cy.contains("a", "Checkout").click();
        cy.get("table").should("be.visible");
        return new ShoppingCartPage();
    }
}

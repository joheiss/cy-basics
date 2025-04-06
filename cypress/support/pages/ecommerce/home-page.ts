import { BasePage } from "../base-page";
import { ProductsPage } from "./products-page";

export class HomePage extends BasePage {
    public navigateToProductsPage(): ProductsPage {
        super.navigateTo("/angularpractice/shop");
        cy.get("h1")
            .contains(/shop name/i)
            .should("be.visible");
        return new ProductsPage();
    }
}

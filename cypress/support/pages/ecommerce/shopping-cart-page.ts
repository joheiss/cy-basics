import { BasePage } from "../base-page";
import { CheckoutPage } from "./checkout-page";

export class ShoppingCartPage extends BasePage {
    public checkout(limit: number): CheckoutPage {
        this.validatePurchaseLimit(limit);
        this.clickCheckoutButton();
        return new CheckoutPage();
    }

    private clickCheckoutButton() {
        cy.contains(/Checkout/).click();
    }

    private validatePurchaseLimit(limit: number) {
        let total = 0;
        cy.get("table")
            .find("tr")
            .each(($row) => {
                if ($row.find("td").length === 5) {
                    const value = parseInt(
                        $row.find("td:eq(3)").text().split(" ")[1]
                    );
                    if (Number.isInteger(value)) total += value;
                }
            })
            .then(() => {
                expect(total).not.to.be.greaterThan(limit);
            });
        let total2 = 0;
        cy.get("table tr td:nth-child(4) strong")
            .each(($col) => {
                const content = $col.text().split(" ")[1];
                const value = parseInt(content);
                if (Number.isInteger(value)) total2 += value;
            })
            .then(() => {
                expect(total2).not.to.be.above(limit);
            });
    }
}

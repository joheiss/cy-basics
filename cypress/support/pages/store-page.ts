import { BasePage } from "./base-page";

export class StorePage extends BasePage {
    public navigateToStorePage() {
        super.navigateTo("/seleniumPractise/#/");
        cy.get("header").should("contain", "GREENKART");
    }

    public filterProductList(partialProductName: string) {
        this.enterProductName("ca");
    }

    public searchForProduct(productName: string) {
        this.enterProductName(productName);
        this.clickSearchButton();
    }

    public enterProductName(productName: string) {
        cy.get("input[placeholder='Search for Vegetables and Fruits']")
            .clear()
            .type(productName);
    }

    public clickSearchButton() {
        cy.get("button[type=submit]").click();
    }

    public checkNumberOfProductsFound(count: number) {
        cy.get("div.products-wrapper div.products")
            .find("div.product")
            .should("have.length", count);
    }

    public clickAddToCartButtonByProductName(productName: string) {
        this.searchForProduct(productName);
        // -- get first product in list and add to cart
        cy.get("div.products-wrapper div.products")
            .find("div.product:visible")
            .first()
            .within(($product) => {
                cy.get("button")
                    .contains(/add to cart/i)
                    .click();
            });
    }

    public clickShoppingCartLink() {
        cy.get("a.cart-icon").click();
        cy.get("div.cart-preview").should("be.visible");
    }

    public clickProceedToCheckoutButton() {
        cy.get("div.cart-preview.active")
            .find("button")
            .contains(/proceed to checkout/i)
            .click();
        cy.url().should("include", "/cart");
    }

    public clickPlaceOrderButton() {
        cy.contains(/place order/i)
            .first()
            .click();
    }

    public selectDeliveryDateFromCalendar() {
        // -- navigate to top deal page
        cy.get("[href='#/offers")
            .invoke("removeAttr", "target")
            .click()
            .as("top-deals");
        // cy.wait("@top-deals");
        cy.get("button.react-date-picker__calendar-button").click();
        cy.get("div.react-calendar")
            .find("button.react-calendar__navigation__next2-button")
            .as("scroll-year-btn", { type: "static" });
        cy.get("div.react-calendar")
            .find("button.react-calendar__navigation__next-button")
            .as("scroll-month-btn", { type: "static" });
        // scroll 2 years forward
        cy.get("@scroll-year-btn").click();
        cy.get("@scroll-year-btn").click();
        // scroll 3 months forward
        for (let i = 0; i < 3; i++) {
            cy.get("@scroll-month-btn").click();
        }
        // set day to last day of month
        cy.get("div.react-calendar__month-view__days")
            .find(
                "button.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth):not(.react-calendar__month-view__days__day--weekend)"
            )
            .last()
            .click();
        cy.get("div.react-date-picker__inputGroup input:hidden")
            .invoke("prop", "value")
            .then(($value) => {
                const currentDate = new Date();
                const futureDate = new Date(currentDate);
                futureDate.setFullYear(currentDate.getFullYear() + 2);
                futureDate.setMonth(currentDate.getMonth() + 4);
                const comparisonDate = new Date(
                    futureDate.getFullYear(),
                    futureDate.getMonth(),
                    0
                );
                cy.log(comparisonDate.toISOString());
                const expectedDate = comparisonDate
                    .toISOString()
                    .substring(0, 10);
                cy.log(expectedDate);
                cy.log($value);
                expect($value).to.equal(expectedDate);
            });
    }
}

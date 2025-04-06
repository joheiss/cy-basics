import { StorePage } from "../../support/pages/store-page";

describe("Some examples", () => {
    beforeEach(() => {
        cy.once("uncaught:exception", () => false);
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get("header").should("contain", "GREENKART");
    });

    it(`I navigate to page "https://rahulshettyacademy.com/seleniumPractise/#/`, () => {
        // cy.once("uncaught:exception", () => false);
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get("header").should("contain", "GREENKART");
    });

    it(`I enter "cucumber" in the search field and click the search button`, () => {
        cy.get("input[placeholder='Search for Vegetables and Fruits']").type(
            "cucumber"
        );
        cy.get("button[type=submit]").click();
        cy.get("div.products-wrapper div.products")
            .find("div.product")
            .should("have.length", 1);
    });

    describe("Select from list of products", () => {
        beforeEach(() => {
            cy.get(
                "input[placeholder='Search for Vegetables and Fruits']"
            ).type("ca");
            cy.get("div.products-wrapper div.products")
                .find("div.product:visible")
                .should("have.length", 4)
                .as("products", { type: "static" });
        });

        it(`Should add cucumber to the shopping cart`, () => {
            // click on "Add to Cart" for 3rd product
            cy.get("@products")
                .its(2)
                .within(($products) => {
                    cy.get("button")
                        .contains(/add to cart/i)
                        .click();
                    cy.get("button").contains(/added/i).should("exist");
                });
        });

        it(`Should add carrot to the shopping cart`, () => {
            // click on "Add to Cart" for "Carrot""
            cy.get("@products")
                .contains(".product", /carrot/i)
                .first()
                .within(($product) => {
                    cy.get("button")
                        .contains(/add to cart/i)
                        .click();
                    cy.get("button").contains(/added/i).should("exist");
                });
        });
    });

    describe("Shopping cart checkout", () => {
        it("Add item to shopping cart and checkout", () => {
            const storePage = new StorePage();
            storePage.filterProductList("ca");
            storePage.checkNumberOfProductsFound(4);
            storePage.clickAddToCartButtonByProductName("Cucumber");
            storePage.clickShoppingCartLink();
            storePage.clickProceedToCheckoutButton();
            storePage.clickPlaceOrderButton();
        });
    });

    describe("Top Deals", () => {
        it.only("Select date from date picker", () => {
            const storePage = new StorePage();
            storePage.selectDeliveryDateFromCalendar();
        });
    });
});

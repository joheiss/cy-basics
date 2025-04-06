import { HomePage } from "../../support/pages/ecommerce/home-page";
import { LoginPage } from "../../support/pages/ecommerce/login-page";

describe("End-to-end E-commerce test", () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    let data: any;

    before(() => {
        cy.fixture("example.json").then((testdata) => (data = testdata));
    });

    beforeEach("login", () => {
        loginPage.login();
    });

    it("Submit order", () => {
        const productsPage = homePage.navigateToProductsPage();
        for (const product of data.products) {
            productsPage.addProductToCart(product.productName);
        }
        const shoppingCartPage = productsPage.checkout();
        const checkoutPage = shoppingCartPage.checkout(200_000);
        checkoutPage.purchase(data.country);
    });
});

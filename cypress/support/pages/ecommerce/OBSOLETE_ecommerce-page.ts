import { BasePage } from "../base-page";

export class EcommercePage extends BasePage {
    public navigateToLoginPage() {
        super.navigateTo("https://rahulshettyacademy.com/loginpagePractise/");
    }

    public navigateToShopPage() {
        super.navigateTo("https://rahulshettyacademy.com/angularpractice/shop");
        cy.get("h1")
            .contains(/shop name/i)
            .should("be.visible");
    }

    public login() {
        cy.session("login", () => {
            this.navigateToLoginPage();
            this.enterUsername(Cypress.env("username"));
            this.enterPassword(Cypress.env("password"));
            this.clickUserType("User");
            this.selectRole("Consultant");
            this.checkTerms();
            this.clickSignInButton();
            cy.url().should("match", /shop$/);
        });
    }

    public enterUsername(username: string) {
        cy.get("#username").type(username).should("have.value", username);
    }

    public enterPassword(password: string) {
        cy.get("#password").type(password).should("have.value", password);
    }

    public clickUserType(userType: string) {
        cy.get("div.form-check-inline")
            .find("input#usertype[value='" + userType.toLowerCase() + "']")
            .click()
            .should("be.checked");
        if (userType.match(/user/i)) {
            cy.log("close popup");
            cy.get("#myModal")
                .should("be.visible")
                .find("#okayBtn")
                .click({ force: true });
            cy.log("wait for fade out");
            cy.get("#myModal")
                .invoke("hide")
                // .invoke("removeClass", "fade show")
                .should("not.be.visible");
            cy.get("div.modal-backdrop")
                .invoke("hide")
                .should("not.be.visible");
        }

        /*
            .then(($userType) => {
                if (userType.match(/user/i)) {
                    // -- confirm modal popup
                    cy.log("close popup");
                    cy.get("#myModal")
                        .should("be.visible")
                        .find("button")
                        .contains("Okay")
                        .click();
                    cy.get("#myModal").should("not.be.visible");
                }
            });
            */
    }

    public selectRole(role: string) {
        cy.get("select").select(role).should("contain.text", role);
    }

    public checkTerms() {
        cy.get("#terms").check();
    }

    public clickSignInButton() {
        cy.get("#signInBtn").click();
    }

    public addProductToCart(productName: string) {
        cy.get("app-card")
            .filter(":contains('" + productName + "')")
            .find("button")
            .contains(/add/i)
            .click();
        // -- check the content of the checkout button
        cy.contains(/Checkout \( [\d*] \)/).should("exist");
        cy.contains(/Checkout ( 0 )/).should("not.exist");
    }

    public clickCheckout() {
        cy.contains(/Checkout/).click();
        // cy.contains("a", "Checkout").click();
        // cy.get("table").should("be.visible");
    }

    public checkTotalExceedsLimit(limit: number) {
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

    public fillInPurchaseForm(country: string) {
        this.clickCheckout();
        this.enterCountry(country);
        this.checkAgreeWithTerms();
        this.clickPurchaseButton();
    }

    public enterCountry(country: string) {
        cy.get("#country").type(country);
        cy.get("div.suggestions > ul > li", { timeout: 5100 })
            .contains(country)
            .click();
        cy.get("#country").should("contain.value", country);
    }

    public checkAgreeWithTerms() {
        cy.get("#checkbox2").check({ force: true }).should("be.checked");
    }

    public clickPurchaseButton() {
        cy.get("input[type=submit][value=Purchase]").click();
        cy.contains("Success!").should("be.visible");
    }
}

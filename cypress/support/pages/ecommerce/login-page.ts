import { BasePage } from "../base-page";

export class LoginPage extends BasePage {
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

    private navigateToLoginPage() {
        super.navigateTo("/loginpagePractise/");
    }

    private enterUsername(username: string) {
        cy.get("#username").type(username).should("have.value", username);
    }

    private enterPassword(password: string) {
        cy.get("#password").type(password).should("have.value", password);
    }

    private clickUserType(userType: string) {
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
    }

    private selectRole(role: string) {
        cy.get("select").select(role).should("contain.text", role);
    }

    private checkTerms() {
        cy.get("#terms").check();
    }

    private clickSignInButton() {
        cy.get("#signInBtn").click();
    }
}

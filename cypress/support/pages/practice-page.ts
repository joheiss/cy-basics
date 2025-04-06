import { BasePage } from "./base-page";
import "cypress-iframe";

export class PracticePage extends BasePage {
    public navigateToPracticePage() {
        super.navigateTo("/AutomationPractice/");
    }

    public checkCheckbox(option: string) {
        cy.get("#checkBox" + option)
            .check()
            .should("be.checked");
    }

    public uncheckCheckbox(option: string) {
        cy.get("#checkBox" + option)
            .uncheck()
            .should("not.be.checked");
    }

    public checkCheckboxByIndex(index: number) {
        cy.get("#checkbox-example")
            .find("input[type=checkbox]")
            .should("have.length.greaterThan", index)
            .eq(index)
            .check()
            .should("be.checked");
    }

    public uncheckCheckboxByIndex(index: number) {
        cy.get("#checkbox-example")
            .find("input[type=checkbox]")
            .should("have.length.greaterThan", index)
            .eq(index)
            .uncheck()
            .should("not.be.checked");
    }

    public selectOptionByName(option: string) {
        cy.get("#dropdown-class-example").select(option);
        // -- verify the selected option's text
        cy.get("#dropdown-class-example")
            .find(":selected")
            .should("contain.text", option);
    }

    public selectOptionByIndex(index: number) {
        // -- make sure the index is not out of range
        cy.get("#dropdown-class-example")
            .find("option")
            .should("have.length.above", index);
        // -- select
        cy.get("#dropdown-class-example").select(index);
        // -- verify the selected option's index
        cy.get("#dropdown-class-example")
            .find("option:selected")
            .invoke("index")
            .should("equal", index);
    }

    public selectDynamicOptionByName(input: string, option: string) {
        const regExp = new RegExp("^" + option + "$", "i");
        cy.get("#autocomplete").clear().type(input);
        cy.get("#ui-id-1")
            .find(".ui-menu-item div")
            .contains(regExp)
            .click({ force: true });
        cy.get("#autocomplete").should("have.value", option);
    }

    public checkVisibility() {
        cy.get("#displayed-text").should("be.visible");
        cy.get("#hide-textbox").click();
        cy.get("#displayed-text").should("not.be.visible");
        cy.get("#show-textbox").click();
        cy.get("#displayed-text").should("be.visible");
    }

    public checkRadioButtonByText(text: string) {
        cy.get("#radio-btn-example")
            .contains(text)
            .find("input[type=radio]")
            .click()
            .should("be.checked");
    }

    public showAlertPopup(expectedText: string) {
        const stub = cy.stub();
        cy.on("window:alert", stub);

        const regExp = new RegExp(expectedText, "i");
        cy.get("#alertbtn")
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWithMatch(regExp);
            });
    }

    public showConfirmPopup(expectedText: string) {
        const stub = cy.stub(false);
        cy.on("window:confirm", stub);

        const regExp = new RegExp(expectedText, "i");
        cy.get("#confirmbtn")
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWithMatch(regExp);
            });
    }

    public handleNewTab() {
        cy.get("#opentab").invoke("removeAttr", "target").click();
        cy.origin("https://www.qaclickacademy.com", () => {
            cy.url().should("equal", "https://www.qaclickacademy.com/");
        });
    }

    public findRowInTableByColumnContent(content: string) {
        cy.get("table[name=courses] tbody")
            .find("tr td:nth-child(2)")
            .contains(content)
            .next("td")
            .should("contain.text", "25");
    }

    public hover() {
        cy.get("div.mouse-hover-content").invoke("show");
        // cy.get("button").contains("Mouse Hover").trigger("mouseover");
        cy.get("div.mouse-hover-content")
            .contains("Top")
            .should("be.visible")
            .click();
        cy.url().should("match", /#top$/);
    }

    public handleIFrame() {
        cy.frameLoaded("#courses-iframe");
        cy.iframe()
            .find("header nav")
            .contains(/Mentorship/i)
            .should("exist");
        // -- another way to do this - without the cypress-iframe lib
        cy.get("#courses-iframe")
            .should("be.visible")
            .should("not.be.empty")
            .then(($iframe) => {
                const $body = $iframe.contents().find("body");
                cy.wrap($body)
                    .find("header nav")
                    .contains(/Mentorship/i)
                    .should("exist");
                cy.wrap($body)
                    .find("h2")
                    .contains(/Learn Earn & Shine/i)
                    .should("exist");
            });
    }
}

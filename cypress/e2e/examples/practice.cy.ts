import { PracticePage } from "../../support/pages/practice-page";

describe("Playing with web controls ...", () => {
    const practicePage = new PracticePage();
    
    beforeEach(() => {
        practicePage.navigateToPracticePage();
    });

    it("should check and uncheck several checkboxes", () => {
        const options = ["Option1", "Option2", "Option3"];
        for (const option of options) {
            practicePage.checkCheckbox(option);
            practicePage.uncheckCheckbox(option);
        }
        practicePage.checkCheckboxByIndex(1);
    });

    it("should select an option from a select box by name or index", () => {
        practicePage.selectOptionByName("Option1");
        practicePage.selectOptionByIndex(2);
    });

    it("should select an option from a dynamic select field by name", () => {
        practicePage.selectDynamicOptionByName("ind", "India");
    });

    it("should click hide / show button and check visibility of textbox", () => {
        practicePage.checkVisibility();
    });

    it("should check a radio button by text", () => {
        practicePage.checkRadioButtonByText("Radio1");
    });

    it("should show an alert popup or a confirm popup when the respective button is clicked", () => {
        practicePage.showAlertPopup(
            "Hello , share this practice page and share your knowledge"
        );
        practicePage.showConfirmPopup(
            "Hello , Are you sure you want to confirm?"
        );
    });

    it("should handle new browser tab", () => {
        practicePage.handleNewTab();
    });

    it("should find table row by column content and check other column n same row", () => {
        practicePage.findRowInTableByColumnContent(
            "Learn SQL in Practical + Database Testing from Scratch"
        );
    });

    it("Handle mouse-over event", () => {
        practicePage.hover();
    });

    it.only("Handle iframe", () => {
        practicePage.handleIFrame();
    });
  
});

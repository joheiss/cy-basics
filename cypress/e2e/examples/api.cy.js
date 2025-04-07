describe("API Testing ...", () => {
    it("intercept #1", () => {
        cy.visit("/angularAppdemo");
        cy.intercept(
            {
                method: "GET",
                //url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
                path: "/Library/GetBook.php?**",
            },
            {
                statusCode: 200,
                body: [
                    {
                        book_name: "First Interception - Mocking the Response",
                        isbn: "47110815",
                        aisle: "4711",
                    },
                ],
            }
        ).as("books-retrieval");
        cy.visit("/angularAppdemo");
        cy.get("button")
            .contains(/virtual library/i)
            .click();
        cy.wait("@books-retrieval");
        cy.get("p").should("have.text", "Oops only 1 Book available");
        cy.get("table tbody").find("tr").should("have.length", 1);
    });

    it("intercept #2 - modify request", () => {
        cy.visit("/angularAppdemo");
        cy.intercept(
            "GET",
            "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
            (request) => {
                request.url =
                    "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
                request.continue();
            }
        ).as("manipulated-qs");

        cy.visit("/angularAppdemo");
        cy.get("button")
            .contains(/virtual library/i)
            .click();
        cy.wait("@manipulated-qs").then(($xhr) => {
            // expect($xhr.response.statusCode).equal(403);
        });
        // cy.get("p").should("have.text", "Oops only 1 Book available");
        // cy.get("table tbody").find("tr").should("have.length", 0);
    });

    it("request #1 - cy.request", () => {
        cy.request({
            method: "POST",
            url: "https://rahulshettyacademy.com/Library/AddBook.php",
            body: {
                name: "Learn Cypress",
                isbn: "47110815",
                aisle: "1a",
                author: "Hans Wurst",
            },
            failOnStatusCode: false,
        }).then((response) => {
            cy.log(response);
            console.log(response);
            expect(response.statusCode).equal(200);
        });
    });
});

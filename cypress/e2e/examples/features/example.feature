@example
Feature: Just some examples

Scenario: Testing the page "cypress.io"
    Given I navigate to page "https:://cypress.io"
    Then I should see the title containing "Testing Frameworks"
    
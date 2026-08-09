Feature: Search Functionality
  As a shopper
  I want to search for a product
  So that I can find items matching what I'm looking for

  Scenario: Searching for a product returns matching results
    Given I navigate to the home page
    When I search for "dress"
    Then the results page should display products matching "dress"
    And I capture a full-page screenshot named "search_results"
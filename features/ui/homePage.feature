Feature: Home Page Verification
  As a shopper
  I want the home page to load with key navigation visible
  So that I can trust the site is working before I browse further

  Scenario: Key navigation elements are present on the home page
    Given I navigate to the home page
    Then I should see the site logo
    And I should see the main navigation links
    And I should see the search icon
    And I capture a full-page screenshot named "home_page"
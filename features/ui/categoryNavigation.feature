Feature: Category Navigation
  As a shopper
  I want to navigate into a product category from the home page
  So that I can browse relevant products

  Scenario: Navigating to the Women's category loads the correct landing page
    Given I navigate to the home page
    When I click on the "WOMEN" navigation link
    Then I should land on the women's category page
    And I capture a full-page screenshot named "category_navigation_women"
    
    Scenario: Navigating to the Men's category loads the correct landing page
    Given I navigate to the home page
    When I click on the "MEN" navigation link
    Then I should land on the men's category page
    And I capture a full-page screenshot named "category_navigation_men"
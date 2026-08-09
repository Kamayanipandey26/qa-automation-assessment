Feature: Pet API CRUD Operations
  As a system integrator
  I want to create, read, update, and delete pet resources via the API
  So that I can confirm the API behaves correctly end-to-end

  Scenario: Full CRUD lifecycle for a pet resource
    Given I generate a new pet with a unique id and name
    When I send a request to create the pet
    Then the response should confirm the pet was created successfully

    When I retrieve the pet by its id
    Then the response should contain the expected pet data

    When I update the pet's name
    Then the response should reflect the updated name

    When I delete the pet
    Then a subsequent request for the pet should return a not-found response
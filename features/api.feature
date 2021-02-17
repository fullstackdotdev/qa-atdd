@api-test
Feature: API Test feature
  As a user, I should be able to get a JSON response

  @api-test
  Scenario: Veifying results for GET request
    When Im perform GET request for "https://jsonplaceholder.typicode.com/posts", I should able to receive posts results

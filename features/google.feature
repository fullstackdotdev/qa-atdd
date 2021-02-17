@google-search
Feature: Google search feature
  As a user, I should be able to search for a keyword and get the results

  @regression
  Scenario: Veifying search results for a given keyword
    Given Im on google search home "https://google.com"
    And I entered search terms as "ducks"
    Then I should able to see the search results

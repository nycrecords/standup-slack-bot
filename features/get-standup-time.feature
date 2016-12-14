Feature: Find out when the next standup is

  Scenario Outline: I ask for the standup time in a channel with a standup
    Given the bot is running
    And I am in a room with the bot
    And the standup is scheduled for <utc-time>
    And the standup is scheduled on <days-of-the-week>
    When I say "@bot when"
    Then the bot should respond "There's a standup scheduled for <local-time> EST on <days>"

    @daylight-savings-time
    Examples:
      | utc-time | local-time |
      | 9:30 am  | 5:30 am    |
      | 10:30 am | 6:30 am    |
      | 2:30 pm  | 10:30 am   |
      | 10:30 pm | 6:30 pm    |

    @standard-time
    Examples:
      | utc-time | local-time | days-of-the-week                         | days                          |
      | 9:30 am  | 4:30 am    |                                          | no days                       |
      | 9:30 am  | 4:30 am    | Monday                                   | Monday                        |
      | 10:30 am | 5:30 am    | Monday Tuesday                           | Monday and Tuesday            |
      | 2:30 pm  | 9:30 am    | Monday Tuesday Wednesday                 | Monday, Tuesday and Wednesday |
      | 10:30 pm | 5:30 pm    | Monday Tuesday Wednesday Thursday Friday | all weekdays                  |

  Scenario: I ask for the standup time in a channel without a standup
    Given the bot is running
    And I am in a room with the bot
    And no standup is scheduled
    When I say "@bot when"
    Then the bot should respond "There's no standup scheduled yet."

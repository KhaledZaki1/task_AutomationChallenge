@CRUD @ui
Feature: User Management Functionality

            As a registered admin
            I should able to create, update ,and delete users

    Background: admin user is on the form page
        Given The user is logged in and on the form page

    Scenario: Validate that admin user is able to view the mandatory form fields
        Then The admin should see the following mandatory fields:
            | Field Name     |
            | Name           |
            | Age            |
            | Marital Status |
            | Job            |

    @smoke @sanity
    Scenario: Validate that admin user cannot submit the form with empty fields
        When The user clicks on the 'submit form' button
        Then The user should see validation errors for all required fields

    @createUser @regression
    Scenario: Admin user should be able to create users and view them
        When The admin fills out the mandatory fields for users and click on submit form
            | user1 |
            | user2 |
            | user3 |
        Then The user should be 'added' successfully
            And The admin is able to view users
            | user1 |
            | user2 |

    @updateUser @regression
    Scenario Outline: Admin should be able to update an existing '<existingUser>'
        Given The admin fills out the mandatory fields for users and click on submit form
            | user4 |
            | user5 |
        When The admin 'updates' the user '<userForm>'
        Then The user should be 'updated' successfully
            And The old username for '<userForm>' should not appear in the table
            And The updated user for '<userForm>' should appear with the updated data in the table

        Examples:
            | existingUser | userForm     |
            | user4        | updatedUser1 |

    @deleteItem @regression
    Scenario Outline: Admin should be able to delete an existing '<existingUser>'
        Given The admin fills out the mandatory fields for users and click on submit form
            | user6 |
        When The admin 'deletes' the user '<existingUser>'
        Then The user should be 'deleted' successfully
            And The existing user '<existingUser>' should not be visible in the table

        Examples:
            | existingUser |
            | user6        |

    Scenario: User should be able to log out from the platform
        When The user clicks on the 'logout' button
        Then The user should be redirected to the login page
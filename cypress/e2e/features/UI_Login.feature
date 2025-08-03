@auth @ui @regression
Feature: Signup and Login Functionality

            As a user
            I should able to register and log in successfully with valid credentials
    Background:
        Given The user is on the login page

    @Signup @signupValidation
    Scenario Outline: User attempts to register through the platform with '<Data>' data
            And The user is on the signup page
        When The user enters username '<username>', email '<email>', and password '<password>'
            And The user clicks on the 'sign up' button
        Then The user should see '<message>'
        @validData @regression @smoke
        Examples:
            | Data  | username   | email           | password  | message                 |
            | valid | Admin Test | Admin@yahoo.com | Abcd1234# | Registration Successful |
        @emptyUser @negativeSignup
        Examples:
            | Data       | username | email          | password | message                    |
            | empty user |          | john@gmail.com | ssd4%    | Please fill out this field |
        @emptyEmail @negativeSignup
        Examples:
            | Data        | username        | email | password | message                    |
            | empty email | Test Automation |       | 987Kh%$  | Please fill out this field |
        @invalidEmailFormat
        Examples:
            | Data          | username | email              | password   | message                      |
            | invalid email | john_doe | invalid-email@test | Abcd1234$$ | Email must be a valid format |
        @emptyPass
        Examples:
            | Data           | username     | email            | password | message                    |
            | empty password | Andrew Alana | john@hotmail.com |          | Please fill out this field |
        @shortPassCharacters
        Examples:
            | Data                            | username   | email          | password | message                                |
            | less than 5 password characters | Test login | test@yahoo.com | 1k3$     | Password must be at least 5 characters |

    @login @loginValidation
    Scenario Outline: User attempts to login with '<DataUser>' username and '<DataPass>' password
        When The user enters username '<username>' and password '<password>'
            And The user clicks on the 'login' button
        Then The user should see '<message>'

        @validCredentials @smoke @regression
        Examples:
            | DataUser | DataPass | username   | password  | message           |
            | valid    | valid    | Admin Test | Abcd1234# | Welcome my friend |
        @validUserInvalidPass
        Examples:
            | DataUser | DataPass | username   | password  | message                      |
            | valid    | invalid  | Admin Test | Abcd1345& | Invalid username or password |
        @invalidUserInvalidPass
        Examples:
            | DataUser | DataPass | username    | password  | message                      |
            | invalid  | invalid  | Test khaled | Abcd1345& | Invalid username or password |
        @emptyUserEmptyPass
        Examples:
            | DataUser | DataPass | username | password | message                    |
            | empty    | empty    |          |          | Please fill out this field |
        @emptyUserValidPass
        Examples:
            | DataUser | DataPass | username | password  | message                    |
            | empty    | valid    |          | Abcd1234# | Please fill out this field |
        @invalidUserEmptyPass
        Examples:
            | DataUser | DataPass | username       | password | message                    |
            | invalid  | empty    | Khaled Testing |          | Please fill out this field |
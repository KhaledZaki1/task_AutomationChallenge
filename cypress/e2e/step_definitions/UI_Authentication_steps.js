const { Given, When, Then, Step } = require("@badeball/cypress-cucumber-preprocessor");

let ui_fields_placeholder = [];
let expectedFieldMessage = ['Name', 'Age', 'Status', 'Job'];

beforeEach(() => {
    // @ts-ignore
    cy.restoreLocalStorage()
})

afterEach(() => {
    // @ts-ignore
    cy.saveLocalStorage()
})

Given('The user is on the login page', () => {
    cy.visit('http://localhost:5173/');
    cy.get('div.toggle-left > h1').should('be.visible').and('have.text', 'Hello, Friend!');
});

Given('The user is on the signup page', () => {
    cy.get('.register-btn').should('be.visible').click();
});

Then('The user should be redirected to the login page', () => {
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('div.toggle-left > h1').should('be.visible').and('have.text', 'Hello, Friend!');
});

When('The user enters username {string} and password {string}', (username, password) => {
    if (username)
        cy.get('.login [placeholder="Username"]').type(username);
    if (password)
        cy.get('.login [placeholder="Password"]').type(password);
});

When('user register with valid data', () => {
    cy.fixture('userRegister').then((userData) => {

        cy.get('.register [placeholder="Username"]').type(userData.Name);
        cy.get('.register [placeholder="Email"]').type(userData.Email);
        cy.get('.register [placeholder="Password"]').type(userData.Password);

        cy.get('.register [type="submit"]').click();
    });
});


When('The user enters username {string}, email {string}, and password {string}', (user, email, pass) => {
    if (user)
        cy.get('.register [placeholder="Username"]').type(user);
    if (email)
        cy.get('.register [placeholder="Email"]').type(email);
    if (pass)
        cy.get('.register [placeholder="Password"]').type(pass);
    if (!user || !email || !pass) {
        // If any field is empty, we will not submit the form
        cy.get('.register [type="submit"]').click();
        // Check validation message for empty fields
        if (!user) {
            cy.get('.register [placeholder="Username"]').then(($input) => {
                expect($input[0].validationMessage).to.include('fill out');
            });
        }

        if (!email) {
            cy.get('.register [placeholder="Email"]').then(($input) => {
                expect($input[0].validationMessage).to.include('fill out');
            });
        }

        if (!pass) {
            cy.get('.register [placeholder="Password"]').then(($input) => {
                expect($input[0].validationMessage).to.include('fill out');
            });
        }
    }
});

When('The user clicks on the {string} button', (button) => {
    if (button === 'sign up') {
        cy.get('.register [type="submit"]').should('be.visible').click();
    } else if (button === 'login') {
        cy.get('.login [type="submit"]').should('be.visible').click();
    } else if (button === 'submit form') {
        cy.get('button.super-button', { timeout: 7000 }).should('be.visible').click();
    } else if (button === 'logout') {
        cy.get('button.logout-button').should('be.visible').click();
    }
    else {
        throw new Error(`Unknown button: ${button}`);
    }
});

When('The user clicks the sign up button', () => {
    cy.get('.register [type="submit"]').should('be.visible').click();
});

Then('The message {string} should be displayed', (expectedMessage) => {
    if (expectedMessage === 'Welcome my friend') {
        cy.url().should('include', '/home');
        cy.get('.Welcome').should('be.visible').and('contain.text', expectedMessage);
    }
});

Then('The user should see {string}', (expectedMessage) => {
    if (expectedMessage === 'Registration Successful') {
        cy.get('.form-box .success-text').should('be.visible').and('contain.text', expectedMessage);
    }
    else if (expectedMessage === 'Welcome my friend') {
        cy.url().should('include', '/home');
        cy.get('.Welcome').should('be.visible').and('contain.text', expectedMessage);
    }
    else if (expectedMessage.toLowerCase().includes('fill out')) {
        const placeholders = ['Username', 'Email', 'Password'];
        let found = false;
        cy.wrap(null).then(() => {
            placeholders.forEach((placeholder) => {
                if (found) return;

                cy.get(`.register [placeholder="${placeholder}"]`).then(($input) => {
                    const msg = $input[0].validationMessage;
                    if (msg && msg.toLowerCase().includes('fill out')) {
                        expect(msg).to.include(expectedMessage);
                        found = true;
                    }
                });
            });
        });
    }
    else if (expectedMessage === 'Invalid username or password') {
        cy.get('.login .error-text').should('be.visible').and('contain.text', expectedMessage);
    }

    //....This function to validate for the embedded validation message like "Please fill out the field
    //
    // else if (expectedMessage.toLowerCase().includes('invalid')) {
    //     cy.get('.register [placeholder="Email"]').then(($input) => {
    //         const msg = $input[0].validationMessage;
    //         expect(msg).to.include(expectedMessage);
    //     });
    // }
    else if (expectedMessage === 'Email must be a valid format') {
        cy.get('.register input[placeholder="Email"]').parent().find('.error-text')
            .should('be.visible').and('contain.text', expectedMessage);
    }
    else if (expectedMessage === 'Password must be at least 5 characters') {
        cy.get('.register input[placeholder="Password"]').parent().find('.error-text')
            .should('be.visible').and('contain.text', expectedMessage);
    }
});

Given('The user is logged in and on the form page', () => {
    Step(this, 'The user is on the login page');
    Step(this, 'The user is on the signup page');
    cy.get('.register [placeholder="Username"]').type('Admin Test');
    cy.get('.register [placeholder="Email"]').type('Admin@yahoo.com');
    cy.get('.register [placeholder="Password"]').type('Abcd1234#');
    cy.get('.register [type="submit"]').click();
    cy.wait(1500);
    Step(this, `The user enters username "Admin Test" and password "Abcd1234#"`);
    Step(this, 'The user clicks on the "login" button');
    cy.get('.slide-in').should('be.visible').and('have.text', 'Welcome my friend');
});

Then('The admin should see the following mandatory fields:', (options) => {
    cy.get('.data > input').then(($fields) => {
        ui_fields_placeholder = Array.from($fields, (field) => field.placeholder);

        options.rows().forEach((element) => {
            expect(ui_fields_placeholder).to.include(element[0]);
            cy.log(`Field name is: ${element[0]}`);
        });
    });
});

Then('The user should see validation errors for all required fields', () => {
    //cy.get('.data .error-text').should('have.length', 4);
    cy.get('.data .error-text').should('have.length', expectedFieldMessage.length);
    cy.get('.data .error-text').each(($el) => {
        const text = $el.text().trim();
        expect(text.endsWith('is required')).to.be.true;
        const fieldName = text.replace(' is required', '');
        expect(expectedFieldMessage).to.include(fieldName);
        cy.log(fieldName + ' is required');
    });
});

When('The admin fills out the mandatory fields for users and click on submit form', (dataTable) => {
    const createUsers = dataTable.raw().flat();
    cy.fixture('userDetails').then((details) => {
        createUsers.forEach((users) => {
            const user = details[users];
            cy.get('[placeholder="Name"]').clear().type(user.name);
            cy.get('[placeholder="Age"]').clear().type(user.age);
            cy.get('[placeholder="Marital Status"]').clear().type(user.status);
            cy.get('[placeholder="Job"]').clear().type(user.job);
            Step(this, 'The user clicks on the "submit form" button');
            Step(this, 'The user should be "added" successfully');
        });
    });
});

Then('The user should be {string} successfully', (item) => {
    if (item === 'added') {
        cy.get('#swal2-title').should('be.visible').and('contain', 'added successfully');
    }
    else if (item === 'ready to be updated') {
        cy.get('#swal2-title').should('be.visible').and('contain', 'Now, you can update the user data');
    }
    else if (item === 'updated') {
        cy.get('#swal2-title').should('be.visible').and('contain', 'updated successfully');
    }
    else if (item === 'deleted') {
        cy.get('.swal2-html-container').should('be.visible').and('contain', 'deleted successfully');
        cy.contains('button', 'OK').click();
    }
});

When('The admin is able to view users', (dataTable) => {
    cy.get('table').should('be.visible');
    const viewUsers = dataTable.raw().flat();
    cy.fixture('userDetails').then((details) => {
        viewUsers.forEach((users) => {
            const user = details[users];
            cy.get('table tbody tr').filter(`:contains("${user.name}")`).within(() => {
                cy.contains(user.age);
                cy.contains(user.status);
                cy.contains(user.job);
            });
        });
    });
});

When('The admin {string} the user {string}', (action, userData) => {
    if (action === 'updates') {
        cy.fixture('updatedUserDetails').then((data) => {
            const user = data[userData];

            cy.contains('tr', user.oldName).within(() => {
                cy.get('button.buttonup').click();
            });
            Step(this, 'The user should be "ready to be updated" successfully');

            cy.get('[placeholder="Name"]').clear().type(user.newName);
            cy.get('[placeholder="Age"]').clear().type(user.newAge);
            cy.get('[placeholder="Marital Status"]').clear().type(user.newStatus);
            cy.get('[placeholder="Job"]').clear().type(user.newJob);
            Step(this, 'The user clicks on the "submit form" button');


        });
    } else if (action === 'deletes') {
        cy.fixture('userDetails').then((data) => {
            const user = data[userData];

            cy.contains('tr', user.name).within(() => {
                cy.get('button.buttondel').click();
            });
            cy.contains("Are you sure?").should('be.visible');
            cy.contains('button', 'Yes, delete this').click();
        });
    }
});

Then('The old username for {string} should not appear in the table', (userData) => {
    cy.fixture('updatedUserDetails').then((data) => {
        cy.get('table').should('not.contain', data[userData].oldName);
        cy.log(data[userData].oldName);
        cy.log(data[userData].newName);
    });
});

Then('The existing user {string} should not be visible in the table', (userData) => {
    cy.fixture('userDetails').then((users) => {
        const user = users[userData];
        // making this locator with ('table') not with ('table tbody tr') because sometimes the table hasn't any row
        cy.get('table').should('not.contain', user.name);
    });
});

Then('The updated user for {string} should appear with the updated data in the table', (userData) => {
    cy.fixture('updatedUserDetails').then((data) => {
        const user = data[userData];
        cy.contains('tr', user.newName).within(() => {
            cy.contains(user.newAge);
            cy.contains(user.newStatus);
            cy.contains(user.newJob);
        });
    });
});
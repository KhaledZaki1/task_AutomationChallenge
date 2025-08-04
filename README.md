# task_AutomationChallenge

# 🧪 Test Plan: Web App User Management & Authentication

**Author:** Khaled Hamdy  
**Date:** August 2025  
**Scope:** End-to-end testing for user authentication and admin CRUD functionality  
**Tools Used:** Cypress + Cucumber, GitHub Actions CI, @cypress/code-coverage

---

## 1. 🎯 What is Being Tested

- User Registration (Signup)
- User Login / Logout
- Admin CRUD operations (Create, Read, Update, Delete)
- UI field validations and visual integrity
- Code coverage for frontend logic

---

## 2. 📌 Test Coverage Areas

### ✅ Authentication (All Users)
- Valid & invalid login attempts
- Signup validations (empty fields, email format, password length)
- Error messages and redirects
- Successful login and logout flow

### ✅ User Management (Admin Only)
- Viewing form field placeholders
- Required field validations
- Adding and viewing users in table
- Updating existing users
- Deleting users
- Success and error alerts

### ✅ Visual Testing
- Snapshot testing using `cypress-image-snapshot`

### ✅ Code Coverage
- Using `nyc` with `@cypress/code-coverage` to track tested code

---

## 3. 🧰 Tools Used and Why

| Tool                      | Purpose                                                                  |
|---------------------------|--------------------------------------------------------------------------|
| **Cypress**               | E2E testing framework with fast browser control                         |
| **Cucumber + Cypress**    | BDD syntax (`Given/When/Then`) for readable scenarios                   |
| **@cypress/code-coverage**| Tracks which frontend code is exercised during tests                    |
| **cypress-image-snapshot**| Detects UI regressions visually                                          |
| **GitHub Actions**        | Runs tests & uploads reports on push and PR                              |

---

## 4. 🚀 How to Run the Tests

### 🔧 Locally

```bash
npm install
npm run dev
# In another terminal
npx cypress open  # or npx cypress run
```

### 🧾 Code Coverage

```bash
npx nyc report
# View HTML report at: coverage/index.html
```

### ⚙️ GitHub Actions CI

Runs on:
- Push to `main`
- Pull Requests to `main`

Artifacts:
- Screenshots
- Code coverage reports
- Snapshot diffs

---

## 5. ⚠️ Assumptions & Limitations

- Visual tests rely on consistent rendering across environments
- Email regex only validates format, not deliverability
- No current tests for responsive/mobile design

---

✅ **Conclusion:**  
Automated E2E suite ensures key user/admin flows are validated with Cypress, Cucumber, visual regression, and code coverage via CI/CD

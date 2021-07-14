# Angular Web App 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

This code base was created to demonstrate an application built with Angular that interacts with a mock backend server wtih CRUD operations. The main purpose of this project is to practice developing an e2e automation test suite.

## Get started

### Clone the repo

```shell
git clone https://github.com/Mr-YaRou/angular-assignment-2.git
cd angular-assignment-2
```

### Install the npm dependancies and start application

Install the `npm` packages described in the `package.json` and verify that it works:

```bash
npm install
npm run start:proxy
```

[JSON Server](https://github.com/typicode/json-server) was used as a full fake REST API. Start the `JSON Server` with the following command:

```bash
json-server -w .\\database-sample.json
```

Go to `http://localhost:3000/` to verify `JSON Server` works.

The `npm run start:proxy` command builds (compiles Typescript and copies assets) and watches for changes to the source files and runs the application on  `http://localhost:4200/`. A basic server-side proxy was created for Angular to connect to Json-server.


Shut it down application manually with `Ctrl-C`.

## Functionality Overview

The application created is a Health Appointment Management System. It uses both angular in-memory-web-api and json-server to simulate CRUD operations overy a RESTy API.

**General Functionality:**

- Authenticate users via JWT (Login/Register pages + Logout Button)
- CRUD Usrs (Able to create, read, update and delete users registered as Admin)
- CRUD Appointments (Able to create, read, update Appointments scheduled)
- GET and display paginated list of Appointments

![Demo](https://github.com/Mr-YaRou/angular-assignment-2/blob/main/src/assets/search-demo.gif)

## Testing Overview

These are the test-related scripts:

```bash
npm run tests
```


The end-to-end test framework used is [Protractor](https://www.protractortest.org/#/). Protractor runs tests against the application in a real browser, interacting with it as a user would. Protractor is built on top of WebDriver JS (Selenuim).

Test case flow were designed to be self-cleaning. Below is the list of test cases created:

| S/No | Type Type      | Test Case                                                                       |
|------|----------------|---------------------------------------------------------------------------------|
| 1    | Negative       | should display   error message if provided incorrect credentails                |
| 2    | Negative       | should display   error message if missing credentails provided                  |
| 3    | Normal         | should   redirect to regsiter page when registering new account                 |
| 4    | Negative       | should display   error message if missing registration details                  |
| 5    | Normal         | should display   success message on successful registration                     |
| 6    | Normal         | should   redirect to home page if successful admin login                        |
| 7    | Normal         | should   redirect to login page if successful log out                           |
| 8    | Normal         | should display   success message on successful registration as paitent          |
| 9    | Normal         | should display   success message on successful login as paitent                 |
| 10   | Normal         | should   redirect to appointments page and have correct titles                  |
| 11   | Normal         | should   redirect to Appointment Creation page and have correct tittle          |
| 12   | Normal         | should   redirect to appointments page after new appointment creation           |
| 13   | Normal         | should   redirect to appointments page after new appointment creation - loop    |
| 14   | Normal         | should remove   one appointment created by the Paitent                          |
| 16   | Normal         | should   redirect to home page if successful login as admin                     |
| 18   | Normal         | should   redirect to confirmation page and have correct titles                  |
| 19   | Normal         | should confrim   appointment and redirect to appointment page                   |
| 20   | Normal         | should cancel   confirmed appointment and redirect to appointment page          |
| 21   | Normal         | should   redirect to Users page and have correct titles                         |
| 22   | Normal         | should   redirect to Add user page and have correct titles                      |
| 23   | Negative       | should error when add users   form is incomplete                                |
| 24   | Negative       | should display error when   password entered does not meet requirements         |
| 25   | Normal         | should successfully register   and create user                                  |
| 26   | Normal         | should select a user and   redirect to edit user page with correct titles       |
| 27   | Normal         | should update details of a user   and redirect to user page with correct titles |
| 28   | Normal         | should delete selected users   and display correct titles                       |


### Test Script Samples

Form Validation test case on Login page. 

```ts
  it('should display error message if provided incorrect credentails',function()
  {
    browser.get('http://localhost:4200/');
    element(by.xpath('.//input[@formcontrolName="username"]')).sendKeys('incorrect');
    element(by.xpath('.//input[@formcontrolName="password"]')).sendKeys('incorrect');
    element(by.xpath(".//button[contains(text(),'Login')]")).click()
    browser.sleep(1000);
    expect(element(by.xpath(".//span[text()='Username or password is incorrect']")).getText()).toEqual('Username or password is incorrect');
  });
```

Page Redirection test case

```ts
    it('should redirect to Users page and have correct titles ',function()
    {
      element(by.xpath("//a[@routerlink='/users'][text()='Users']")).click();

      expect(element(by.xpath(".//h1[contains(text(),'Manage Users')]")).getText()).toEqual('Manage Users');
      
    });
```

Sample run of Test Automation

![Demo](https://github.com/Mr-YaRou/angular-assignment-2/blob/main/src/assets/test-demo.gif)

At the end of Test execution, a html report will be generated in `/Reports/screenshots/report.html` with browser screenshots of each step.

A Sample report below:

![Demo](https://github.com/Mr-YaRou/angular-assignment-2/blob/main/src/assets/report-demo.png)




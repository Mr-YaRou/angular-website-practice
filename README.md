# Angular Assignment

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

#

## Development server

Run `npm run start:proxy` for a dev server with proxy to json-server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

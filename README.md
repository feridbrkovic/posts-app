# Simple posts app project (MEAN stack)

This is an Angular application that allows users to create, read, update, and delete posts. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Description

The Posts App is a web application built with Angular that allows users to create, read, update, and delete posts. It provides a user-friendly interface for managing posts and interacting with the data.

## Prerequisites

Before running this application locally, ensure that you have the following prerequisites installed on your machine:

- Node.js
- Angular CLI

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Development Server

To start the development server, run `ng serve` and navigate to `http://localhost:4200/`. The application will automatically reload if you make any changes to the source files.

## MongoDB Atlas Setup

This application uses MongoDB Atlas as the database. Follow the steps below to set up MongoDB Atlas and enter your credentials:

1. Sign up for a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster and configure the necessary settings.
3. Obtain your MongoDB connection string.
export const environment = {
    production: false,
    mongoURI: 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/posts-app?retryWrites=true&w=majority'
};

## Code Scaffolding

You can generate new components using the command `ng generate component component-name`. Additionally, you can use `ng generate directive|pipe|service|class|guard|interface|enum|module` to generate other Angular artifacts.

## Build

To build the project, run `ng build`. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Execute unit tests with `ng test` using [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

To run end-to-end tests, execute `ng e2e` after adding a package that supports end-to-end testing.

## Further Help

For more information about the Angular CLI, use `ng help` or visit the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


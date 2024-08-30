# Pactum-JS-Cucumber-Api

![download (2)](https://github.com/user-attachments/assets/b7436c51-bdbe-4d3a-83d7-75e6b371e1aa)


`qa-automation-api` framework integrates Pactum, Cucumber, and JavaScript for efficient and reliable testing. Pactum simplifies API interaction definition and validation, while Cucumber enables clear, BDD-style test scenarios for better team collaboration. JavaScript drives the test execution with flexibility. Additionally, the framework includes a reporting layer to provide detailed insights and summaries of test results, ensuring comprehensive visibility into testing outcomes.

[Actions-CI/CD](ACTIONS.md)


## Requirements🧾 

Before you start, make sure you have the following requirements:

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine. You can check the installation with the command `node -v`.
- **Text Editor**: It is recommended to use [Visual Studio Code](https://code.visualstudio.com/) for a smoother development experience, though you can use any text editor of your choice.

## Installation 🖥️

To start using the `qa-automation-api` framework, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/qa-automation-api.git
cd qa-automation-api
```
### 2. Install Dependencies
```bash
npm install
```

### 2. Project Structure

```bash

.github
    └── workflows
        └── build.yml                   # Configuration for CI/CD using GitHub Actions

.pactum
    └── snapshots
        └── user-1.json               # Snapshots of expected response data for comparison tests

.vscode
    └── settings.json                 # Project-specific settings for Visual Studio Code

config
    └── cucumber-html-reporter.js     # Configuration for generating HTML reports from Cucumber
    └── cucumber.conf.js              # Configuration file for Cucumber

reports
    └── cucumber_report.html          # HTML report generated after running tests
    └── cucumber_report.json          # JSON report generated after running tests

src
    └── features
        └── Regres.feature            # Cucumber feature file defining the test scenarios

    └── steps
        └── steps.js                  # Implementation of the steps defined in feature files

    └── support
        └── hooks.js                  # Hooks to handle setup and teardown before and after scenarios

    └── .gitignore                     # Files and directories to be ignored by Git
    └── package-lock.json              # Dependency lock file to ensure version consistency
    └── package.json                  # npm configuration file listing project dependencies and scripts
    └── README.md                     # This file

```
## Using Cucumber and Gherkin ✏️

### Cucumber

[Cucumber](https://cucumber.io/) is a behavior-driven development (BDD) testing tool that allows you to write tests in a natural language that can be understood by both developers and non-technical people. It uses feature files (with a `.feature` extension) to define tests in a readable and clear manner.

In this project, Cucumber is used along with Pactum to define and execute API tests. Feature files define test scenarios in an easily readable format, while Pactum handles the implementation of steps and interaction with the API.

### Gherkin

[Gherkin](https://cucumber.io/docs/gherkin/) is the language used to write feature files in Cucumber. Gherkin uses a simple and structured syntax that facilitates writing and understanding test scenarios. The Gherkin syntax includes several parts:

#### Example of a `.feature` file

```gherkin
Feature: Regres

  In order to keep Regres API stable
  As a tester
  I want to make sure that everything works as expected
  
  Scenario: Get A User With Id
    Given I make a GET request to /api/users/{id}
      And I set path param id to $S{UserId}
    When I receive a response
    Then I expect response should have a status 200
      And I expect response should have a json like
      """
      {
        "data": {
          "id": 7
        }
      }
      """

```
## Gherkin Components

- **Feature**: Describes the functionality being tested. In this case, the functionality is ensuring that the Regres API is stable.

    ```gherkin
    Feature: Regres
    ```

- **Scenario**: Describes a specific situation being tested. Here, it is testing the ability to get a user by their ID.
    ```gherkin
    Scenario: Get A User With Id
    ```

- **Given**: Describes the initial state or context before the scenario. In this case, it specifies that a GET request will be made to a specific endpoint with a path parameter.

    ```gherkin
    Given I make a GET request to /api/users/{id}
      And I set path param id to $S{UserId}
    ```

- **When**: Describes the action being performed. Here, it indicates that a response is being received from the request.
    ```gherkin
    When I receive a response
    ```

- **Then**: Describes the expected outcome after performing the action. It defines expectations about the response, such as status code and JSON content.

    ```gherkin
    Then I expect response should have a status 200
      And I expect response should have a json like
      """
      {
        "data": {
          "id": 7
        }
      }
      """
    ```

Estos elementos permiten describir de manera clara y estructurada los escenarios de prueba, facilitando la colaboración entre equipos técnicos y no técnicos y asegurando que las pruebas cubran todas las funcionalidades necesarias de la aplicación.

## Gherkin Expressions

### Sample Step Definitions

```gherkin
  Given
    I make a (.*) request to (.*)
    I set path param (.*) to (.*)
    I set query param (.*) to (.*)
    I set header (.*) to (.*)
    I set cookie (.*) to (.*)
    I set basic authentication credentials (.*) and (.*)
    I set body to
    I set multipart form data (.*) to (.*)
    I upload file at (.*)
    I set form-data to
    I set inspection

  When
    I receive a response

  Then
    I expect response should have a status {int}
    I expect response header (.*) should be (.*)
    I expect response header (.*) should have (.*)
    I expect response cookie (.*) should be (.*)
    I expect response should have a json
    I expect response should have a json at (.*)
    I expect response should have a json like
    I expect response should have a json like at (.*)
    I expect response should have a json schema
    I expect response should have a json schema at (.*)
    I expect response should have a body
    I expect response to match a json snapshot (.*)
    I expect response body should contain (.*)
    I expect response should have {string}
    I expect response time should be less than {int} ms
    I store response at (.*) as (.*)
```

# Example of Defined Steps with Pactum ⌨️

This file contains an example of defined steps using Pactum with the Cucumber testing framework for Node.js. Pactum is an API testing library that allows you to define and verify HTTP requests and responses easily.

## Example Code

```javascript
const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
});

Given(/^I make a (.*) request to (.*)$/, function (method, endpoint) {
  spec[method.toLowerCase()](endpoint);
});

Given(/^I set path param (.*) to (.*)$/, function (key, value) {
  spec.withPathParams(key, value);
});

Given(/^I set query param (.*) to (.*)$/, function (key, value) {
  spec.withQueryParams(key, value);
});

Given(/^I set basic authentication credentials (.*) and (.*)$/, function (username, password) {
  spec.withAuth(username, password);
});

Given(/^I set header (.*) to (.*)$/, function (key, value) {
  spec.withHeaders(key, value);
});

Given(/^I set cookie (.*) to (.*)$/, function (key, value) {
  spec.withCookies(key, value);
});

Given(/I set body to/, function (body) {
  try {
    spec.withJson(JSON.parse(body));
  } catch(error) {
    spec.withBody(body);
  }
});

Given(/^I upload file at (.*)$/, function (filePath) {
  spec.withFile(filePath);
});

Given(/^I set multi-part form param (.*) to (.*)$/, function (key, value) {
  spec.withMultiPartFormData(key, value);
});

Given(/I set form-data to/, function (form) {
  spec.withForm(form);
});

Given(/I set inspection/, function (body) {
  spec.inspect();
});

When('I receive a response', async function () {
  await spec.toss();
});

Then(/^I expect response to match a json snapshot (.*)$/, async function (name) {
  spec.response().should.have.jsonSnapshot(name);
});

Then('I expect response should have a status {int}', function (code) {
  spec.response().should.have.status(code);
});

Then(/^I expect response header (.*) should be (.*)$/, function (key, value) {
  spec.response().should.have.header(key, value);
});

Then(/^I expect response header (.*) should have (.*)$/, function (key, value) {
  spec.response().should.have.headerContains(key, value);
});

Then(/^I expect response cookie (.*) should be (.*)$/, function (key, value) {
  spec.response().should.have.cookies(key, value);
});

Then(/^I expect response should have a json$/, function (json) {
  spec.response().should.have.json(JSON.parse(json));
});

Then(/^I expect response should have a json at (.*)$/, function (path, value) {
  spec.response().should.have.json(path, JSON.parse(value));
});

Then(/^I expect response should have a json like$/, function (json) {
  spec.response().should.have.jsonLike(JSON.parse(json));
});

Then(/^I expect response should have a json like at (.*)$/, function (path, value) {
  spec.response().should.have.jsonLike(path, JSON.parse(value));
});

Then(/^I expect response should have a json schema$/, function (json) {
  spec.response().should.have.jsonSchema(JSON.parse(json));
});

Then(/^I expect response should have a json schema at (.*)$/, function (path, value) {
  spec.response().should.have.jsonSchema(path, JSON.parse(value));
});

Then(/^I expect response should have a body$/, function (body) {
  spec.response().should.have.body(body);
});

Then(/^I expect response body should contain (.*)$/, function (value) {
  spec.response().should.have.bodyContains(value);
});

Then('I expect response should have {string}', function (handler) {
  spec.response().should.have._(handler);
});

Then('I expect response time should be less than {int} ms', function (ms) {
  spec.response().should.have.responseTimeLessThan(ms);
});

Then(/^I store response at (.*) as (.*)$/, function (path, name) {
  spec.stores(name, path);
});

After(() => {
  spec.end();
});
```

# Example of Defined Steps with Pactum

This file contains an example of defined steps using Pactum with the Cucumber testing framework for Node.js. Pactum is an API testing library that allows you to define and verify HTTP requests and responses easily.

## Step Methods Table

| Step Method | Regular Expression | Description |
|-------------|---------------------|-------------|
| `Given(/^I make a (.*) request to (.*)$/` | Performs an HTTP request with the specified method (GET, POST, PUT, etc.) to the provided endpoint. |
| `Given(/^I set path param (.*) to (.*)$/` | Sets a parameter in the request path. |
| `Given(/^I set query param (.*) to (.*)$/` | Adds query parameters to the request. |
| `Given(/^I set basic authentication credentials (.*) and (.*)$/` | Configures basic authentication credentials for the request. |
| `Given(/^I set header (.*) to (.*)$/` | Adds a header to the request. |
| `Given(/^I set cookie (.*) to (.*)$/` | Sets a cookie for the request. |
| `Given(/I set body to/` | Defines the body of the request, handling both JSON data and plain text. |
| `Given(/^I upload file at (.*)$/` | Uploads a file with the request. |
| `Given(/^I set multi-part form param (.*) to (.*)$/` | Adds a multi-part form parameter to the request. |
| `Given(/I set form-data to/` | Configures form data for the request. |
| `Given(/I set inspection/` | Enables inspection of the request for debugging. |
| `When('I receive a response'` | Sends the request and waits for the response. |
| `Then(/^I expect response to match a json snapshot (.*)$/` | Verifies that the response matches a saved JSON snapshot. |
| `Then('I expect response should have a status {int}'` | Verifies that the response has the expected HTTP status code. |
| `Then(/^I expect response header (.*) should be (.*)$/` | Verifies that a specific header in the response has the expected value. |
| `Then(/^I expect response header (.*) should have (.*)$/` | Verifies that a specific header in the response contains an expected value. |
| `Then(/^I expect response cookie (.*) should be (.*)$/` | Verifies that a specific cookie in the response has the expected value. |
| `Then(/^I expect response should have a json$/` | Verifies that the response contains a specific JSON. |
| `Then(/^I expect response should have a json at (.*)$/` | Verifies that a specific JSON is present at a given path in the response. |
| `Then(/^I expect response should have a json like$/` | Verifies that the response contains a JSON that matches the expected JSON. |
| `Then(/^I expect response should have a json like at (.*)$/` | Verifies that a matching JSON is present at a given path in the response. |
| `Then(/^I expect response should have a json schema$/` | Verifies that the response conforms to a specific JSON schema. |
| `Then(/^I expect response should have a json schema at (.*)$/` | Verifies that a JSON schema is present at a given path in the response. |
| `Then(/^I expect response should have a body$/` | Verifies that the response contains a specific body. |
| `Then(/^I expect response body should contain (.*)$/` | Verifies that the body of the response contains a specific value. |
| `Then('I expect response should have {string}'` | Allows additional conditions to be checked in the response using the handler name. |
| `Then('I expect response time should be less than {int} ms'` | Verifies that the response time is less than the specified value in milliseconds. |
| `Then(/^I store response at (.*) as (.*)$/` | Stores the response at a specific path for later use. |
| `After(() => { spec.end(); });` | Finalizes the `spec` setup after each scenario. |


# Methods Explained

This file contains an example of defined steps using Pactum with the Cucumber testing framework for Node.js. Pactum is an API testing library that allows you to define and verify HTTP requests and responses easily.

| Step Method | Regular Expression | Explanation |
|-------------|---------------------|-------------|
| `spec[method.toLowerCase()](endpoint)` | `Given(/^I make a (.*) request to (.*)$/` | Makes an HTTP request with the specified method (GET, POST, PUT, etc.) to the provided endpoint. For example, `spec.get('/users')` for a GET request to the `/users` endpoint. |
| `spec.withPathParams(key, value)` | `Given(/^I set path param (.*) to (.*)$/` | Sets a parameter in the request path. For example, `spec.withPathParams('userId', '123')` to replace `{userId}` in the path with `123`. |
| `spec.withQueryParams(key, value)` | `Given(/^I set query param (.*) to (.*)$/` | Adds query parameters to the request. For example, `spec.withQueryParams('search', 'test')` to add `?search=test` to the URL. |
| `spec.withAuth(username, password)` | `Given(/^I set basic authentication credentials (.*) and (.*)$/` | Configures basic authentication credentials for the request. For example, `spec.withAuth('user', 'pass')` to add the `Authorization` header with basic credentials. |
| `spec.withHeaders(key, value)` | `Given(/^I set header (.*) to (.*)$/` | Adds a header to the request. For example, `spec.withHeaders('Content-Type', 'application/json')` to set the `Content-Type` header. |
| `spec.withCookies(key, value)` | `Given(/^I set cookie (.*) to (.*)$/` | Sets a cookie for the request. For example, `spec.withCookies('session_id', 'abc123')` to add a cookie with the name `session_id` and value `abc123`. |
| `spec.withJson(json)` | `Given(/I set body to/` | Defines the request body as JSON. For example, `spec.withJson({ name: 'John' })` to set the body as a JSON object. |
| `spec.withBody(body)` | `Given(/I set body to/` | Defines the request body as plain text. For example, `spec.withBody('raw text')` to set the body as plain text. |
| `spec.withFile(filePath)` | `Given(/^I upload file at (.*)$/` | Uploads a file with the request. For example, `spec.withFile('/path/to/file.jpg')` to include a file in the request. |
| `spec.withMultiPartFormData(key, value)` | `Given(/^I set multi-part form param (.*) to (.*)$/` | Adds a multi-part form parameter to the request. For example, `spec.withMultiPartFormData('file', '/path/to/file.jpg')` to send a file as part of a multipart form. |
| `spec.withForm(form)` | `Given(/I set form-data to/` | Configures form data for the request. For example, `spec.withForm({ name: 'John', age: 30 })` to send form data in `application/x-www-form-urlencoded` format. |
| `spec.inspect()` | `Given(/I set inspection/` | Enables request inspection for debugging. Useful for printing the request content and facilitating debugging. |
| `spec.toss()` | `When('I receive a response'` | Sends the request and waits for the response. The `toss()` method performs the HTTP request and waits for the server response. |
| `spec.response().should.have.jsonSnapshot(name)` | `Then(/^I expect response to match a json snapshot (.*)$/` | Verifies that the response matches a saved JSON snapshot. Used to compare the response with a predefined snapshot to check for changes. |
| `spec.response().should.have.status(code)` | `Then('I expect response should have a status {int}'` | Verifies that the response has the expected HTTP status code. For example, `spec.response().should.have.status(200)` to check that the response status is 200 OK. |
| `spec.response().should.have.header(key, value)` | `Then(/^I expect response header (.*) should be (.*)$/` | Verifies that a specific header in the response has the expected value. For example, `spec.response().should.have.header('Content-Type', 'application/json')`. |
| `spec.response().should.have.headerContains(key, value)` | `Then(/^I expect response header (.*) should have (.*)$/` | Verifies that a specific header in the response contains the expected value. For example, `spec.response().should.have.headerContains('Content-Type', 'json')`. |
| `spec.response().should.have.cookies(key, value)` | `Then(/^I expect response cookie (.*) should be (.*)$/` | Verifies that a specific cookie in the response has the expected value. For example, `spec.response().should.have.cookies('session_id', 'abc123')`. |
| `spec.response().should.have.json(json)` | `Then(/^I expect response should have a json$/` | Verifies that the response contains a specific JSON. For example, `spec.response().should.have.json({ name: 'John' })`. |
| `spec.response().should.have.json(path, value)` | `Then(/^I expect response should have a json at (.*)$/` | Verifies that a specific JSON is present at a given path in the response. For example, `spec.response().should.have.json('data.user', { name: 'John' })`. |
| `spec.response().should.have.jsonLike(json)` | `Then(/^I expect response should have a json like$/` | Verifies that the response contains a JSON that matches the expected JSON. For example, `spec.response().should.have.jsonLike({ name: 'John' })`. |
| `spec.response().should.have.jsonLike(path, value)` | `Then(/^I expect response should have a json like at (.*)$/` | Verifies that a matching JSON is present at a given path in the response. For example, `spec.response().should.have.jsonLike('data.user', { name: 'John' })`. |
| `spec.response().should.have.jsonSchema(json)` | `Then(/^I expect response should have a json schema$/` | Verifies that the response conforms to a specific JSON schema. For example, `spec.response().should.have.jsonSchema({ type: 'object', properties: { name: { type: 'string' } } })`. |
| `spec.response().should.have.jsonSchema(path, value)` | `Then(/^I expect response should have a json schema at (.*)$/` | Verifies that a JSON schema is present at a given path in the response. For example, `spec.response().should.have.jsonSchema('data.user', { type: 'object', properties: { name: { type: 'string' } } })`. |
| `spec.response().should.have.body(body)` | `Then(/^I expect response should have a body$/` | Verifies that the response has a specific body. For example, `spec.response().should.have.body('Success')`. |
| `spec.response().should.have.bodyContains(value)` | `Then(/^I expect response body should contain (.*)$/` | Verifies that the body of the response contains a specific value. For example, `spec.response().should.have.bodyContains('Success')`. |
| `spec.response().should.have._(handler)` | `Then('I expect response should have {string}'` | Allows checking additional conditions in the response using the handler name. |
| `spec.response().should.have.responseTimeLessThan(ms)` | `Then('I expect response time should be less than {int} ms'` | Verifies that the response time is less than the specified value in milliseconds. For example, `spec.response().should.have.responseTimeLessThan(500)` to ensure the response is faster than 500 ms. |
| `spec.stores(name, path)` | `Then(/^I store response at (.*) as (.*)$/` | Stores the response at a specific path for later use. For example, `spec.stores('userResponse', 'data.user')` to save part of the response under the name `userResponse`. |
| `spec.end()` | `After(() => { spec.end(); })` | Finalizes the `spec` instance setup at the end of each test. |


# Pactum Snapshot Feature

## What is a Snapshot in Pactum?

In the context of API testing with Pactum, a snapshot is a capture of an API response at a specific moment. Pactum uses these snapshots to compare future responses with the originally saved response, helping to detect unexpected changes in the API.

## Using Snapshots in Pactum

### 1. Capturing Snapshots

To capture a snapshot of a response during a test, use Pactum’s `jsonSnapshot` method. Here is an example of how to capture a snapshot in a test:

```javascript
Then(/^I expect response to match a json snapshot (.*)$/, async function (name) {
  spec.response().should.have.jsonSnapshot(name);
});
```

## CComparing Snapshots
When a test is run, Pactum compares the current API response with the previously saved snapshot. If the current response differs from the saved snapshot, the test will fail. This mechanism is useful for ensuring that API responses do not change unexpectedly.

## Snapshot File Structure
Snapshots are saved in the .pactum/snapshot folder and are in JSON format. Here’s an example of what a snapshot file might look like:
```json
{
  "data": {
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  },
  "support": {
    "url": "https://reqres.in/#support-heading",
    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
  }
}
```

# Setting Up Hooks with Cucumber and Pactum

## Introduction to Hooks

In the Cucumber testing framework, hooks are special functions that automatically run at specific points during the test lifecycle. Hooks allow you to set up the environment before a test scenario starts and to clean up or log information after the scenario has finished.

In this file, we set up two main hooks using @cucumber/cucumber and pactum:

- **Before Hook**: Runs before each test scenario.
- **After Hook**: Runs after each test scenario.

## Setting Up the Before Hook
The `Before` hook runs before each test scenario. It is used to perform necessary setup before the scenario begins. In the example below, the following is done:

```javascript
const { Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { request, settings } = require('pactum');

// Set the default timeout for tests
setDefaultTimeout(60000); 

// Hook that runs before each scenario
Before(function (scenario) {
  console.log(`[HOOK] Starting scenario: ${scenario.pickle.name}`);
  console.log(`[HOOK] Scenario tags: ${scenario.pickle.tags.map(tag => tag.name).join(', ')}`);
  
  // Set up the base URL for requests
  request.setBaseUrl('https://reqres.in');
  settings.setReporterAutoRun(false);
  
  console.log(`[HOOK] Base URL set to: https://reqres.in`);
  console.log(`[HOOK] Reporter auto-run disabled`);
});

```
# Running Tests with Cucumber

## How to Run Tests

To run tests in your project, use `Cucumber`, a behavior-driven testing tool that allows you to write tests in a human-readable format. Test configuration is managed through a configuration file, and tests are executed using an npm command.

### Command to Run Tests
To execute the tests, use the following command:

```bash
npm run test
```
example
![image](https://github.com/user-attachments/assets/fb1984ed-0f67-46a5-85c8-af9a762327cf)

# Generating Reports with Cucumber 📑

## How to Generate an HTML Report

After running your tests with Cucumber, you can generate an HTML report to visualize the results in a more detailed and accessible manner. The HTML report provides a graphical and structured representation of the test results, making it easier to review and analyze.

### Command to Generate the Report

![image](https://github.com/user-attachments/assets/f38a4ffd-f0ed-41b8-aebf-3ae1d851998a)

![image](https://github.com/user-attachments/assets/6119cf9f-0f47-4ac3-8f51-e97e9ea6c2e0)

![image](https://github.com/user-attachments/assets/764174ff-9eb2-40c2-bc34-c535ab390e61)


To generate the HTML report, use the following command:


```bash
npm run report
```


[test-report.zip](https://github.com/user-attachments/files/16811374/test-report.1.zip) 🗂️

# Author 🛠️
Thiago Tobias Turk

www.linkedin.com/in/thiago-tobias-turk-4462542a9

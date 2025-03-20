## UI Testing Framework for EtonDigital ##

## Getting started
Make sure you have proper version (v20.18.2) of NodeJS environment set up.
- Clone the project to your machine
- Install Cypress with `npm install cypress --save-dev`

## Tests Execution
There are 2 ways to run tests:
1. `npx cypress open` which will open Cypress runner where you can select spec files to run
2. `npx cypress run --spec cypress\e2e\*.cy.js` which will run all tests in a command line (headless)
3. `npx cypress-repeat run -n 2 ... --spec cypress\e2e\*.cy.js --browser chrome` which can be used to run all tests in wanted iterations in specified browser (headless)

## What's where?
- e2e/ - location of spec file
- e2e/pages/ - location of page class files with locators and functions
- fixtures/ - location of Job roles export file
- cypress.config.js - location of cookie definition
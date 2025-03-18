## UI Testing Framework for EtonDigital ##

## Getting started
Make sure you have proper version (v20.18.2) of NodeJS environment set up.
- Clone the project to your machine
- Install Cypress with `npm install cypress --save-dev`

## Tests Execution
There are 2 ways to run tests:
1. `npx cypress open` which will open Cypress runner where you can select spec file to run (holycode.cy.js)
2. `npx cypress run --spec cypress\e2e\*.cy.js` which will run all tests in a command line (headless)

## What's where?
- e2e/ - location of spec file
- fixtures/ - location of Job roles export file
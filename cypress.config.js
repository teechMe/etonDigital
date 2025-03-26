const { defineConfig } = require('cypress');
// const configureMocha = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    charts: true,
    reportPageTitle: 'Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true, 
    json: true,
    html: true
  },
  e2e: {
    env: {
      //Set cookie in LocalStorage in order to avoid cookie consent in every test:
      cookieValue: '{stamp:%27Hatb0SYVnyiT/dWFoRiNO7Ea1RhZMjG/zfej9iNVLNx9kQ/owMJDdg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1741820100211%2Cregion:%27rs%27}'
    },
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/junit/results-[hash].xml',
    toConsole: true,
  }
});

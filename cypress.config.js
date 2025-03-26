const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    env: {
      cookieValue: '{stamp:%27Hatb0SYVnyiT/dWFoRiNO7Ea1RhZMjG/zfej9iNVLNx9kQ/owMJDdg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1741820100211%2Cregion:%27rs%27}'
    },
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochaFile: 'cypress/results/results.xml'
  }
});
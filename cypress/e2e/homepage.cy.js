import HomePage from './pages/homePage'

/**
 * @description Test suite for testing the homepage. It includes cookie handling and home page visit.
 * Test covers validations of the homepage
 */
describe('Homepage tests', () => {
    beforeEach(() => {
        cy.setCookie('CookieConsent', Cypress.env('cookieValue'));
        HomePage.visit();
    });
    it('Validation of homepage', () => {
        HomePage.validateURL()
        HomePage.validateTitle()
        HomePage.validateHeaders()
    })
})
import CareersPage from './pages/careersPage';

/**
 * @description Test suite for testing the Careers page. It includes cookie handling and careers page visit.
 * Test covers validations and filtering the QA role assertion.
 */
describe('Careers Page Tests', () => {
  beforeEach(() => {
    cy.setCookie('CookieConsent', Cypress.env('cookieValue'));
    CareersPage.visit();
  });

  it('Validates Careers page', () => {
    CareersPage.openPositions();
    CareersPage.validateHeaderText();
    CareersPage.filterByQA();
    CareersPage.handleQAFilterButtonClick();
    CareersPage.validateQARole();
  });

})
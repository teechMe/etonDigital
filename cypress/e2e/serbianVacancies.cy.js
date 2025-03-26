import CareersPage from './pages/careersPage';

/**
 * @description Test suite for testing the Careers page and exporting serbian roles. It includes cookie handling and careers page visit.
 * Test covers page validations, filtering for Serbian roles and exporting the job titles to a separate file.
 */
describe('Vacancies Page Tests', () => {
  beforeEach(() => {
    cy.setCookie('CookieConsent', Cypress.env('cookieValue'));
    CareersPage.visit();
    CareersPage.interceptLoadMoreJobs()
  });

  it('Exports Serbian vacancies', () => {
    CareersPage.openPositions();
    CareersPage.validateHeaderText();
    CareersPage.filterBySerbia();
    CareersPage.handleSerbiaFilterButtonClick();
    CareersPage.clickShowMore();
  });
});
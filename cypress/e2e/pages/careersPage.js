const JOB_ROLES_FILE_PATH = 'cypress/fixtures/job_roles.txt'; //Location for Job Titles export

/**
 * Represents the Careers page of the application.
 * This class contains methods and getters for interacting with elements on the Careers page.
 */
class CareersPage {
/**
 * Getting the careers API response.
 * This method defines careers API request which is later used to intercept the response.
 *
 * @function getCareersApiUrl
 * @memberof CareersPage
 **/
  getCareersApiUrl({ perPage = 12, location = 28, page = 2, order = 'desc' } = {}) {
    return `/wp-json/wp/v2/careers/?per_page=${perPage}&location=${location}&page=${page}&order=${order}`;
  }

/**
 * Intercepts the "Load More Jobs" API call.
 * This method sets up an interception for the API call that loads more jobs on the Careers page.
 *
 * @function interceptLoadMoreJobs
 * @memberof CareersPage
 **/
  interceptLoadMoreJobs() {
    const apiUrl = this.getCareersApiUrl({ page: 2 });
    cy.intercept('GET', apiUrl).as('loadMoreJobs');
  }

   /**
   * Getter for the hamburger menu element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the hamburger menu's inner element.
   **/
    get hamburgerMenu() {
      return cy.get(".hamburger-inner");
    }
    
   /**
   * Getter for the open positions element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the open positions's element.
   **/
    get openPositionsButton() {
      return cy.xpath("//span[normalize-space()='Open positions']");
    }

   /**
   * Getter for the header text element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the header text element.
   **/
    get headerText() {
        return cy.get('.c-txt--hero')
    }

   /**
   * Getter for the QA filter button element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the QA filter button element.
   **/
    get qaFilterButton() {
      return cy.get("button[id='26']");
    }

   /**
   * Getter for the QA filter button class element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the QA filter button class element.
   **/
    get activeQAButtonClass() {
        return 'c-tag position is-active';
      }

   /**
   * Getter for the Serbia filter button class element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the Serbia filter button class element.
   **/
    get activeSerbiaButtonClass() {
        return 'c-tag location is-active';
      }
      
   /**
   * Getter for the Serbia filter button element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the Serbia filter button element.
   **/
    get serbiaFilterButton(){
        return cy.get("button[id='28']")
    }

   /**
   * Getter for the QA role title element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the QA role title element.
   **/
    get qaRoleCardTitle() {
        return cy.contains('h3', 'Senior QA Specialist');
    }

   /**
   * Getter for the QA role parent class element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the QA role parent class element.
   **/
    get qaRoleCard() {
        return this.qaRoleCardTitle.closest('.c-careercard');
    }

   /**
   * Getter for the team name paragraph element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the team name paragraph element.
   **/
   get teamNameParagraph() {
      return this.qaRoleCard.find('p');
   }
 
   /**
   * Getter for the Country name element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the Country name element.
   **/
   get locationList() {
       return this.qaRoleCard.find('ul.o-listcomma');
   }
   
   /**
   * Getter for the Show More button element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the Show More button element.
   **/
    get showMoreButton() {
        return cy.get('.c-btn.load-more.paged')
    }

   /**
   * Getter for the Job title element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the Show More button element.
   **/
    get jobTitles(){
        return cy.xpath("//h3[@class='c-txt--h3  c-careercard__†itle']")
    }

  /**
   * This method navigates to the Holycode Careers page URL.
   *
   * @function visit
   * @memberof CareersPage
   **/
    visit() {
        cy.visit('https://www.holycode.com/careers');
    }

  /**
   * This method navigates to the Open Positions section.
   *
   * @function openPositions
   * @memberof CareersPage
   **/
    openPositions() {
        this.hamburgerMenu.should('be.visible').click();
        this.openPositionsButton
          .scrollIntoView()
          .should('be.visible')
          .click();
      }

  /**
   * This method validates the Headers text.
   *
   * @function validateHeaderText
   * @memberof CareersPage
   **/
    validateHeaderText() {
        this.headerText.should('have.text', 'Join our team')
    }

  /**
   * This method filters the jobs for QA roles.
   *
   * @function filterByQA
   * @memberof CareersPage
   **/
    filterByQA() {
        this.qaFilterButton
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    }

  /**
   * This method verifies if QA filter was successful and if not, it repeats the click.
   *
   * @function handleQAFilterButtonClick
   * @memberof CareersPage
   **/
    handleQAFilterButtonClick() {
        this.qaFilterButton.then(($el) => {
            if (!$el.hasClass(this.activeQAButtonClass)) {
                $el.trigger("click");
              }
        })
    }

  /**
   * This method validates QA role filter and searches for job with specific team.
   *
   * @function validateQARole
   * @memberof CareersPage
   **/
    validateQARole() {
        this.qaRoleCard.within(() => {
          this.teamNameParagraph.should('contain', 'Team: EtonDigital');
          this.locationList.should('contain', 'Serbia');
        });
    }

  /**
   * This method filters jobs by Serbia button.
   *
   * @function filterBySerbia
   * @memberof CareersPage
   **/
    filterBySerbia() {
        this.serbiaFilterButton
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
    }

  /**
   * This method verifies if Serbia filter was successful and if not, it repeats the click.
   *
   * @function handleSerbiaFilterButtonClick
   * @memberof CareersPage
   **/
    handleSerbiaFilterButtonClick() {
      this.serbiaFilterButton.then(($el) => {
          if (!$el.hasClass(this.activeSerbiaButtonClass)) {
              $el.trigger("click");
            }
      })
    }

  /**
   * This method clicks on Show More button, handles if there are more that one time it's shown,
   * also, it is performing the operation of export of Job Titles to a specific file
   *
   * @function clickShowMore
   * @memberof CareersPage
   **/
    clickShowMore() {
        this.showMoreButton
        //.should('be.visible')
        .then(($btn) => {
          if ($btn.length > 0 && $btn.is(':visible')) {
            cy.wrap($btn).click();
            cy.wait('@loadMoreJobs');
            this.clickShowMore();
           } else {
            this.extractJobs(); // If "Show more" is not found, extract jobs
          }
       })
    }
  
  /**
   * This method exports Job Titles to a specified file
   *
   * @function extractJobs
   * @memberof CareersPage
   **/
    extractJobs() {
        this.jobTitles
        .then(($titles) => {
          const jobList = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
          cy.writeFile(JOB_ROLES_FILE_PATH, jobList.join('\n'));
        });
    }
}

export default new CareersPage
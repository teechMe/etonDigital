/**
 * Represents the Home page of the application.
 * This class contains methods and getters for interacting with elements on the Home page.
 */
class HomePage {
   /**
   * Getter for the header text element.
   * 
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress object for the Serbia filter button element.
   **/
   get header(){
    return cy.get(".c-txt--hero")
   }
   
   /**
   * This method navigates to the Holycode homepage page URL.
   *
   * @function visit
   * @memberof HomePage
   **/
    visit() {
        cy.visit('https://www.holycode.com/')
    }

   /**
   * This method validates homepage URL.
   *
   * @function validateURL
   * @memberof HomePage
   **/
    validateURL() {
        cy.url().should('include', 'holycode')
    }

   /**
   * This method validates homepage title.
   *
   * @function validateTitle
   * @memberof HomePage
   **/
    validateTitle() {
        cy.title().should('include', 'Holycode')
    }

   /**
   * This method validates homepage header.
   *
   * @function validateHeaders
   * @memberof HomePage
   **/
    validateHeaders() {
        this.header.should('have.text','Tech Solutions to scale')
    }
}

export default new HomePage();
describe('Testing Holycode website', () => {
  beforeEach(() => {
      //Set cookie in LocalStorage in order to avoid cookie consent in every test:
      cy.setCookie('CookieConsent','{stamp:%27Hatb0SYVnyiT/dWFoRiNO7Ea1RhZMjG/zfej9iNVLNx9kQ/owMJDdg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1741820100211%2Cregion:%27rs%27}')
      //Open homepage:
      cy.visit('https://www.holycode.com/')
  
      //Assertions:
      cy.url().should('include', 'holycode')
      cy.title().should('include', 'Holycode')
  });

  it ('Validation of homepage', () => {
        
      //Assertionse:
      cy.get('.c-txt--hero').should('have.text','Tech Solutions to scale')
    
    })

  it('Validation of Careers page', () => {
    
      //Open Careers page:
      cy.get(".hamburger-inner").should('be.visible').click();
      cy.wait(1000)

      cy.xpath("//span[normalize-space()='Open positions']", { timeout: 2000 })
        .scrollIntoView()
        .should('be.visible')
        .click();

      //Asserting careers page:
      cy.get('.c-txt--hero').should('have.text', 'Join our team')

      //Click on QA button:
      cy.get("button[id='26']")
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
      cy.wait(2000)
  
      //Handle if button is not clicked:
      cy.get("button[id='26']").then((el) => {
         if (!el.hasClass('c-tag position is-active')) {
            el.trigger("click")     
            }
          })

        //Asserting filtered QA role
        cy.contains('h3', 'Senior QA Specialist')
        .closest('.c-careercard')
        .within(() => {
          cy.get('p').should('contain', 'Team: EtonDigital');
          cy.get('ul.o-listcomma').should('contain', 'Serbia');
        });
    })

    it('Serbian vacancies export', () => {
        //Opening Careers:
        cy.get(".hamburger-inner").should('be.visible').click();
        cy.wait(1000)

        //Click on Open Positions:
        cy.xpath("//span[normalize-space()='Open positions']", { timeout: 2000 })
          .scrollIntoView()
          .should('be.visible')
          .click();

        //Asserting careers page:
        cy.get('.c-txt--hero').should('have.text', 'Join our team')

        //Filtering for Serbia:
        cy.get("button[id='28']")
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });
        cy.wait(2000)

        //Handle if button is not clicked:
        cy.get("button[id='28']").then((el) => {
          if (!el.hasClass('c-tag location is-active')) {
            el.trigger("click")
          } 
        })

        //Asserting button clicked:
        cy.contains('button', 'Serbia')
            .then(($el) => $el[0].className)
            .should("eq", 'c-tag location is-active');

        // Function to click "Show more" until it's gone
        function clickShowMore() {
          cy.get('.c-btn.load-more.paged')
            .then(($btn) => {
              if ($btn.length > 0 && $btn.is(':visible')) {
                cy.wrap($btn).click();
                cy.wait(500);
                clickShowMore();
              } else {
                extractJobs(); // If "Show more" is not found, extract jobs
              }
            })
        }
    
        // Function to extract job roles
        function extractJobs() {
          cy.xpath("//h3[@class='c-txt--h3  c-careercard__†itle']")
            .then(($titles) => {
              const jobList = $titles.map((i, el) => Cypress.$(el).text().trim()).get();
              cy.writeFile('cypress/fixtures/job_roles.txt', jobList.join('\n'));
            });
        }
    
        // Start clicking "Show more"
        clickShowMore();
    })
})
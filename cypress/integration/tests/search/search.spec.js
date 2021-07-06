import SearchPage from "../../../pages/searchPage";
describe('Search smoke tests', () => {
    const searchPage = new SearchPage()

    it('find a return flight from NYC to LAX for 3 passengers', () => {
        const searchCriteria = {
            from: 'New York',
            to: 'Los Angeles',
            passengers: 3
        }
        cy.setKiwiConsent()
        cy.setCookie('preferred_currency', 'EUR')
        cy.intercept('https://api.skypicker.com/umbrella/v2/**')
            .as('locations')
        cy.intercept('**SearchReturnItinerariesQuery**').as('search')
        cy.visit('/')
        searchPage.clearOriginInput();
        //zadam kam
        searchPage.enterOrigin(searchCriteria.from);
        searchPage.enterDestination(searchCriteria.to);
        searchPage.addPassengers(searchCriteria.passengers - 1);

        cy.get('[data-test=LandingSearchButton]')
            .click()
        cy.wait('@search')
        cy.url()
            .should('include', 'new-york')
            .and('include', 'los-angeles')

        cy.get('[data-test="ResultCardWrapper"]')
            .should('be.visible')
            .should('have.length.greaterThan', 0)
            .first().within(() => {
                cy.get('[data-test="ResultCardPrice"]').should('contain', '€').then(element => {
                    const price = element.text()
                    expect(parseInt(price)).to.be.gt(10);
                    expect(parseInt(price)).to.be.lt(400);
                })
            })
    });

    it('find a one way flight from Sydney to Melbourne for 1 passenger and 1 cabin bag', () => {
        const searchCriteria = {
            from: 'Sydney',
            to: 'Melbourne',
            passengers: 1
        }
        cy.setKiwiConsent()
        cy.setCookie('preferred_currency', 'EUR')
        cy.intercept('https://api.skypicker.com/umbrella/v2/**')
            .as('locations')
        cy.intercept('**SearchReturnItinerariesQuery**').as('search')
        cy.visit('/')
        searchPage.clearOriginInput();
        //zadam kam
        searchPage.enterOrigin(searchCriteria.from);
        searchPage.enterDestination(searchCriteria.to);
        searchPage.addPassengers(searchCriteria.passengers - 1);
        cy.get('[data-test="SearchFormModesPicker-active-return"]').click()
        cy.get('[data-test="ModePopupOption-oneWay"]').click()
        cy.get('[data-test="PassengersField"]')
            .click();
        cy.get('[data-test="BagsPopup-cabin"]')
            .find('button[aria-label="increment"]')
            .click()
        cy.get('[data-test=LandingSearchButton]')
            .click()
        cy.wait('@search')
        cy.url()
            .should('include', 'sydney-new-south-wales-australia')
            .and('include', 'melbourne-victoria-australia')

        cy.get('[data-test="ResultCardWrapper"]')
            .should('be.visible')
            .should('have.length.greaterThan', 0)
            .first().within(() => {
                cy.get('[data-test="ResultCardPrice"]').should('contain', '€').then(element => {
                    const price = element.text()
                    expect(parseInt(price)).to.be.gt(10);
                    expect(parseInt(price)).to.be.lt(400);
                })
            })
    });
})






it('finds a flight from NYC to LAX for 3 passengers', () => {
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
    cy.get('[data-test="SearchPlaceField-origin"]')
        .find('[data-test="PlacePickerInputPlace"]')
        .first()
        .find('[data-test="PlacePickerInputPlace-close"]')
        .click()
    //zadam kam
    cy.get('[data-test=PlacePickerInput-origin] > [data-test=SearchField-input]')
        .type(searchCriteria.from)
    cy.wait('@locations')
    cy.get('[data-test="PlacepickerModalOpened-origin"]')
        .contains(searchCriteria.from)
        .click()
    cy.get('[data-test=PlacePickerInput-destination] > [data-test=SearchField-input]')
        .type(searchCriteria.to)
    cy.wait('@locations')
    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .contains(searchCriteria.to)
        .click()

    addPassengers(searchCriteria.passengers - 1);

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

function addPassengers(numberOfPassengers) {
    cy.get('[data-test="PassengersField"]')
        .click();
    cy.get('[data-test=PassengersRow-adults]')
        .find('button[aria-label="increment"]')
        .as('addAdult');
    for (let index = 0; index < numberOfPassengers; index++) {
        cy.get('@addAdult').click();
    }
}

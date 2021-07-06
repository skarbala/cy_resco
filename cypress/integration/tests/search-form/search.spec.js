
it('finds a flight from NYC to LAX', () => {
    cy.setKiwiConsent()
    cy.setCookie('preferred_currency', 'EUR')
    window.localStorage.setItem('bookingcom_extension_default', 'false')
    cy.intercept('**SearchReturnItinerariesQuery**').as('search')

    cy.visit('/')
    cy.get('[data-test="SearchPlaceField-origin"]')
        .find('[data-test="PlacePickerInputPlace"]')
        .first()
        .find('[data-test="PlacePickerInputPlace-close"]')
        .click()
    //zadam kam
    cy.get('[data-test=PlacePickerInput-origin] > [data-test=SearchField-input]')
        .type('New York')
    cy.get('[data-test="PlacepickerModalOpened-origin"]')
        .contains('New York')
        .click()
    cy.get('[data-test=PlacePickerInput-destination] > [data-test=SearchField-input]')
        .type('Los Angeles')
    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .contains('Los Angeles')
        .click()
    cy.get('[data-test=LandingSearchButton]').click()
    cy.wait('@search')
    cy.get('[data-test="ResultCardWrapper"]')
        .should('be.visible')
        .should('have.length.above', 0)
        .first().within(() => {
            cy.get('[data-test="ResultCardPrice"]').should('contain', '€').then(element => {
                const price = element.text()
                expect(parseInt(price)).to.be.gt(10);
                expect(parseInt(price)).to.be.lt(400);
            })
        })


    //zadam kam

    // vyklikam 3 ludi

    //kliknem na search

    //overim vysledok
});
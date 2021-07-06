
it.only('finds a flight from NYC to LAX for 3 adults', () => {
    window.localStorage.setItem('bookingcom_extension_default', 'false')
    cy.intercept('**SearchReturnItinerariesQuery**', { statusCode: 500 })
        .as('search')

    cy.visit('https://www.kiwi.com/en')
    cy.contains('button', 'Accept').click();
    //zadam kam
    cy.get('[data-test=PlacePickerInput-destination] > [data-test=SearchField-input]')
        .type('Vienna')
    cy.get('[data-test="PlacepickerModalOpened-destination"]')
        .contains('Vienna')
        .click()

    cy.get('[data-test=LandingSearchButton]').click()
    cy.wait('@search')

    //zadam kam

    // vyklikam 3 ludi

    //kliknem na search

    //overim vysledok
});
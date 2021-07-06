class SearchPage {

    addPassengers(numberOfPassengers) {
        cy.get('[data-test="PassengersField"]')
            .click();
        cy.get('[data-test=PassengersRow-adults]')
            .find('button[aria-label="increment"]')
            .as('addAdult');
        for (let index = 0; index < numberOfPassengers; index++) {
            cy.get('@addAdult').click();
        }
    }
    enterDestination(destination) {
        cy.get('[data-test=PlacePickerInput-destination] > [data-test=SearchField-input]')
            .type(destination);
        cy.wait('@locations');
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains(destination)
            .click();
    }
    enterOrigin(origin) {
        cy.get('[data-test=PlacePickerInput-origin] > [data-test=SearchField-input]')
            .type(origin);
        cy.wait('@locations');
        cy.get('[data-test="PlacepickerModalOpened-origin"]')
            .contains(origin)
            .click();
    }
    clearOriginInput() {
        cy.get('[data-test="SearchPlaceField-origin"]')
            .find('[data-test="PlacePickerInputPlace"]')
            .first()
            .find('[data-test="PlacePickerInputPlace-close"]')
            .click();
    }


}

export default SearchPage

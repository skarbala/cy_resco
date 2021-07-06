class SearchPage {

    enterDestination(destination) {
        cy.get('[data-test=PlacePickerInput-destination] > [data-test=SearchField-input]')
            .type(destination)

        return this;
    }
    pickDestination(destination) {
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains(destination)
            .click()
        return this;
    }

    enterOrigin(destination) {
        cy.get('[data-test=PlacePickerInput-origin] > [data-test=SearchField-input]')
            .type(destination)

        return this;
    }
    pickOrigin(destination) {
        cy.get('[data-test="PlacepickerModalOpened-origin"]')
            .contains(destination)
            .click()
        return this;
    }
}

export default SearchPage;

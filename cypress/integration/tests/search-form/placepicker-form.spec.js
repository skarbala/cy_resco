/// <reference types="cypress" />

import SearchPage from "../../../pages/searchPage";

describe('Place picker', () => {
    beforeEach(() => {
        cy.visit('https://www.kiwi.com/en')
        cy.contains('button', 'Accept').click();
    });
    it('origin place should be selected', () => {
        cy.get('[data-test=PlacePickerInputPlace]')
            .should('be.visible')
            .should('not.be.empty')
    })
    it.only('add next place to origin', () => {
        cy.intercept('https://api.skypicker.com/umbrella/v2/**')
            .as('locations')

        cy.get('[data-test=PlacePickerInput-origin] > [data-test=SearchField-input]')
            .type('Vienna')
        cy.wait('@locations')
        cy.get('[data-test="PlacepickerModalOpened-origin"]')
            .contains('Vienna')
            .click()
        cy.get('[data-test="SearchPlaceField-origin"]')
            .find('[data-test="PlacePickerInputPlace"]')
            .should('have.length', 2)
    })
    it('remove place from origin', () => {
        cy.get('[data-test="SearchPlaceField-origin"]')
            .find('[data-test="PlacePickerInputPlace"]')
            .first()
            .find('[data-test="PlacePickerInputPlace-close"]')
            .click()
        cy.get('[data-test="SearchPlaceField-origin"]')
            .find('[data-test="PlacePickerInputPlace"]')
            .should('have.length', 0)
    })
    it('destination input should display a placeholder', () => {
        cy.get('[data-test="SearchPlaceField-destination"]',)
            .find('[data-test="SearchField-input"]', { timeout: 30000 })
            .should('have.attr', "placeholder", 'Try "Grand Canyon"')
    })

    it('display empty placepicker', () => {
        cy.intercept('https://api.skypicker.com/umbrella/v2/**', { statusCode: 500 })
            .as('locations')
        new SearchPage()
            .enterOrigin('Vienna')
        cy.wait('@locations')
        cy.get('[data-test="PlacepickerModalOpened-origin"]')
            .should('have.text', "Sorry, we're having some issues. Try reloading the page.")
    });
});


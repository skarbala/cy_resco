/// <reference types="cypress" />

describe('Explore button', () => {
    it('navigate to explore page when destination is not selected', () => {
        cy.setKiwiConsent()
        cy.visit('/')
        cy.get('[data-test=LandingSearchButton]')
            .should('have.text', 'Explore')
            .click()
        cy.url().should('include', 'anywhere')

        cy.get('[data-test="SearchPlaceField-destination"]')
            .find('[data-test=PlacePickerInputPlace]')
            .should('be.visible')
            .should('not.be.empty')
            .should('have.text', 'Anywhere')
    });
});
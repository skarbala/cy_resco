/// <reference types="cypress" />

describe('Explore page', () => {
    beforeEach(() => {
        cy.setKiwiConsent()
        cy.visit('/search/tiles/new-york-city-new-york-united-states/anywhere')
    })
    it('display recommended places', () => {
        cy.get('[data-test="PictureCard"]')
            .should('be.visible')
            .should('have.length.greaterThan', 1)
        cy.get('[data-test="PictureCard-departure"]')
            .each(element => cy.wrap(element).should('not.be.empty'))
    });
    it.only('navigate to search result page after clicking on the picture', () => {
        cy.intercept('**SearchReturnItinerariesQuery**').as('search')
        cy.get('[data-test="PictureCard"]', { timeout: 30000 })
            .first()
            .click()
        cy.wait('@search')
        cy.url().should('include', 'search/results/')
        cy.get('[data-test="ResultCardWrapper"]')
            .should('be.visible')
            .should('have.length.greaterThan', 0)
    });
});
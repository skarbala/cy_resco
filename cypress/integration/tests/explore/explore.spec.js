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
    it('navigate to search result page after clicking on the picture', () => {
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
    describe('Filters', () => {
        describe('things to do', () => {
            it('contain all possible things to do', () => {
                const thingsToDo = [
                    'Sports',
                    'Activities',
                    'Nightlife',
                    'Family fun',
                    'Adventure',
                    'Events',
                    'Surfing',
                    'Food & drink',
                ]
                cy.get('[data-test="SearchFormFilters-button-locations"]').click()
                cy.get('[data-test="PopupFilterContent-locations"]')
                    .should('be.visible')
                    .within(() => {
                        thingsToDo.forEach(activity => {
                            cy.contains(activity).should('be.visible')
                        })
                    })
            });
            it('filters places on filter change', () => {
                cy.intercept('**umbrella/v2/graphql?featureName=OnePerCityReturnItinerariesQuery').as('search')
                cy.get('[data-test="SearchFormFilters-button-locations"]').click()
                cy.get('[data-test="PopupFilterContent-locations"]')
                    .contains('Food & drink')
                    .click()
                cy.wait('@search')
                cy.get('[data-test="PictureCard"]')
                    .should('be.visible')
                    .should('have.length.greaterThan', 1)
                cy.get('[data-test="PictureCard-departure"]')
                    .each(element => cy.wrap(element).should('not.be.empty'))
            });
        });
        describe('transport', () => {
            it('contains all transport options', () => {
                const transportOptions = ['Flight', 'Bus', 'Train']
                cy.get('[data-test="SearchFormFilters-button-transport"]').click()
                cy.get('[data-test="TransportOptionChoiceGroup"]')
                    .should('be.visible')
                    .within(() => {
                        transportOptions.forEach(transport => {
                            cy.contains(transport).should('be.visible')
                        })
                    })
            })
        })

    });
});
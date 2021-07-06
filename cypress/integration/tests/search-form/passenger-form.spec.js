/// <reference types="cypress" />

describe('Passenger picker', () => {
    beforeEach(() => {
        cy.visit('https://www.kiwi.com/en')
        cy.contains('button', 'Accept').click();
    });
    it('select max 9 adult passengers', () => {
        cy.get('[data-test="PassengersField"]')
            .click()
        cy.get('[data-test=PassengersRow-adults]')
            .find('button[aria-label="increment"]')
            .as('addAdult')
        for (let index = 0; index < 8; index++) {
            cy.get('@addAdult').click()
        }
        cy.get('[data-test=PassengersRow-adults]')
            .find('button[aria-label="increment"]')
            .should('be.disabled')
    })
});
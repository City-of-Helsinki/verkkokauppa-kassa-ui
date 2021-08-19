/// <reference types="cypress" />

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example flow of shop', () => {

    beforeEach(() => {
        // root-level hook
        // runs before every test block
        // TODO These should come from env file
        cy.wrap("https://talpa-verkkokauppa-order-experience-api-test.apps.arodevtest.hel.fi/").as("REACT_APP_ORDER_API_URL")
        cy.wrap("https://talpa-verkkokauppa-payment-experience-api-test.apps.arodevtest.hel.fi/").as("REACT_APP_PAYMENT_API_URL")
    })

    it('Opening shop without order id in get parameter shows error', () => {
        // Open baseUrl
        // TODO Dev environment url should come from env file
        cy.visit('/');
        // Error is shown when no parameter is given
        cy.get('body > #root > .App > #checkout-container > h2').contains("Error")

    })

    it('Opening shop with dummy-order shows data correctly in table', function () {
        // TODO Dev environment should contain one dummy-order
        cy.visit('/dummy-order');

        // Lang is FI
        cy.get('#hds-select-2-toggle-button').contains("FI")
        // Cart contains 2 items
        cy.get('#cart-size').contains("2");
        // First table row
        cy.get('.product-list > table > tbody > tr:nth-child(1) > td:nth-child(1)').contains("1 kpl")
        cy.get('.product-list > table > tbody > tr:nth-child(1) > td:nth-child(1)').contains("productName")
        // Second td
        cy.get('.product-list > table > tbody > tr:nth-child(1) > td:nth-child(2)').contains("100€")
        // Second table row
        cy.get('.product-list > table > tbody > tr:nth-child(2) > td:nth-child(1)').contains("4 kpl")
        cy.get('.product-list > table > tbody > tr:nth-child(2) > td:nth-child(1)').contains("productName2")
        // Second td
        cy.get('.product-list > table > tbody > tr:nth-child(2) > td:nth-child(2)').contains("400€")

    })

    describe('Opening mocked order and giving customer data works', function() {

        it('Flow Customer information -> Summary -> Payment method', function() {
            // TODO Dev environment should contain one dummy-order
            cy.visit('/dummy-order')

            cy.get('#firstName').type('dummy')

            cy.get('#lastName').type('test')

            cy.get('#email').type('dummy.test@gmail.com')

            cy.get('#phone').type('+358401234567')


            // TODO Check why 2 requests needs to be done, or is this only caused when using mocks?
            cy.get('.submit').click()
            cy.get('.submit').click()
            cy.wait(300)
            cy.get('.cart-total').contains("500")
            cy.wait(300)
            cy.get('#acceptTerms').click()

            cy.get('.submit').click()
            cy.wait(300)
            // TODO Real count from backend?
            const paymentMethodCount = 3;
            cy.get('.payment_methods').children().should('have.length', paymentMethodCount)
        })

    })


})

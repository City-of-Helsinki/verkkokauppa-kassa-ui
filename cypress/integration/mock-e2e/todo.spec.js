/// <reference types="cypress" />

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example flow of shop', () => {

    beforeEach(() => {
        // root-level hook
        // runs before every test block
        cy.wrap("http://localhost:8001/").as("REACT_APP_PAYMENT_API_URL")
        cy.wrap("http://localhost:8000/").as("REACT_APP_ORDER_API_URL")
    })

    it('Opening shop without order id in get parameter shows error', () => {
        // Open baseUrl
        cy.visit('/');
        // Error is shown when no parameter is given
        cy.get('body > #root > .App > #checkout-container > h2').contains("Error")

    })

    it('Opening shop with dummy-order shows data correctly in table', function () {
        console.log(this)
        // spying and response stubbing
        cy.intercept('GET', `${this.REACT_APP_PAYMENT_API_URL}/dummy-order`, {
            statusCode: 200,
            body: {
                "orderId": "orderId",
                "namespace": "namespace",
                "user": "user",
                "createdAt": "createdAt",
                "items": [
                    {
                        "productId": "productId",
                        "productName": "productName",
                        "quantity": 1,
                        "unit": "1",
                        "rowPriceNet": "100",
                        "rowPriceVat": "0",
                        "rowPriceTotal": "100",
                        "priceNet": "100",
                        "priceGross": "0",
                        "priceVat": "0",
                        "vatPercentage": "0"
                    },
                    {
                        "productId": "productId2",
                        "productName": "productName2",
                        "quantity": 4,
                        "unit": "2",
                        "rowPriceNet": "400",
                        "rowPriceVat": "0",
                        "rowPriceTotal": "400",
                        "priceNet": "400",
                        "priceGross": "0",
                        "priceVat": "0",
                        "vatPercentage": "0"
                    }
                ],
                "priceNet": "500",
                "priceVat": "500",
                "priceTotal": "500",
                "checkoutUrl": "http://localhost:8000/",
                "type": "order"
            },
        }).as("getDummyOrder")
        cy.waitFor('@getDummyOrder')
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

})

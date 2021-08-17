/// <reference types="cypress" />

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example flow of shop', () => {

    beforeEach(() => {
        // root-level hook
        // runs before every test block
        cy.wrap("http://localhost:8000/").as("REACT_APP_ORDER_API_URL")
        cy.wrap("http://localhost:8001/").as("REACT_APP_PAYMENT_API_URL")
    })

    it('Opening shop without order id in get parameter shows error', () => {
        // Open baseUrl
        cy.visit('/');
        // Error is shown when no parameter is given
        cy.get('body > #root > .App > #checkout-container > h2').contains("Error")

    })

    it('Opening shop with dummy-order shows data correctly in table', function () {
        // spying and response stubbing
        cy.intercept('GET', `${this.REACT_APP_ORDER_API_URL}/dummy-order`, {
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

    describe('Opening mocked order and giving customer data works', function() {

        it('Flow Customer information -> Summary -> Payment method', function() {
            // spying and response stubbing
            cy.intercept('GET', `${this.REACT_APP_ORDER_API_URL}/dummy-order`, {
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
            cy.visit('/dummy-order')

            cy.get('#firstName').type('dummy')

            cy.get('#lastName').type('test')

            cy.get('#email').type('dummy.test@gmail.com')

            cy.get('#phone').type('+358401234567')

            // spying and response stubbing
            cy.intercept('POST', `${this.REACT_APP_PAYMENT_API_URL}/dummy-order/customer`, {
                statusCode: 200,
                body: {
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "email": "email",
                    "phone": "phone"
                },
            }).as("getDummyOrderCustomerPost")
            cy.waitFor('@getDummyOrderCustomerPost')

            // spying and response stubbing
            cy.intercept('GET', `${this.REACT_APP_PAYMENT_API_URL}/dummy-order/customer`, {
                statusCode: 200,
                body: {
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "email": "email",
                    "phone": "phone"
                },
            }).as("getDummyOrderCustomerGet")
            cy.waitFor('@getDummyOrderCustomerGet')

            // TODO Check why 2 requests needs to be done
            cy.get('.submit').click()
            cy.get('.submit').click()
            cy.wait(300)
            cy.get('.cart-total').contains("500")
            cy.wait(300)
            cy.get('#acceptTerms').click()

            // spying and response stubbing
            cy.intercept('GET', `${this.REACT_APP_PAYMENT_API_URL}/dummy-order/paymentMethods`, {
                statusCode: 200,
                body: {
                    "0": {
                        "name": "Nordea",
                        "code": "nordea",
                        "group": "banks",
                        "img": "https://www.vismapay.com/e-payments/method_logos/nordea.png"
                    },
                    "1": {
                        "name": "Osuuspankki",
                        "code": "osuuspankki",
                        "group": "banks",
                        "img": "https://www.vismapay.com/e-payments/method_logos/osuuspankki.png"
                    },
                    "2": {
                        "name": "Mastercard",
                        "code": "creditcards",
                        "group": "creditcards",
                        "img": "https://www.vismapay.com/e-payments/method_logos/mastercard.png"
                    }
                },
            }).as("getDummyPaymentMethods")
            cy.waitFor('@getDummyPaymentMethods')

            cy.get('.submit').click()
            cy.wait(300)
            cy.get('.payment_methods').children().should('have.length', 3)
        })

    })


})

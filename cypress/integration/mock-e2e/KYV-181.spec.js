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

    it('Opening shop with buy link', function () {

        const productId = "dummy-product";
        const language = "fi";
        const quantity = "1";
        const namespace = "dummyNamespace";
        const user = "user";
        // Url example, purchase/{productId}?language=fi&quantity=1&namespace=testNameSpace&user=someUser

        const urlParams = {
            language: language,
            quantity: quantity,
            namespace: namespace,
            user: user,
        };

        const paramString = Object
            .keys(urlParams)
            .map(value => `${value}=${encodeURIComponent(urlParams[value])}`)
            .join('&');

        cy.visit(`purchase/${productId}?${paramString}`)
        // TODO Endpoint: POST /instantPurchase

        // Create order with post request to /instantPurchase
        // TODO get orderId from created purchase

        // TODO redirect to /orderId

    })

})

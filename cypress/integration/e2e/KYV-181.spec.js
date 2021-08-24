/// <reference types="cypress" />

// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example flow of instant purchase', () => {

    beforeEach(() => {
        // root-level hook
        // runs before every test block
        // TODO These should come from env file
        cy.wrap("https://talpa-verkkokauppa-order-experience-api-test.apps.arodevtest.hel.fi/").as("REACT_APP_ORDER_API_URL")
        cy.wrap("https://talpa-verkkokauppa-payment-experience-api-test.apps.arodevtest.hel.fi/").as("REACT_APP_PAYMENT_API_URL")
    })

    it('Opening shop with buy link - happy path - KYV-181', function () {

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
        // TODO Assertions needs to be added.

    })

    it('Opening shop with buy link - not so happy path - KYV-181', function () {

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
        // TODO Assertions needs to be added.

    })

})

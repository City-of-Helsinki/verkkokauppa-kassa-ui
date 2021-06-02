// TODO: switch these
export const cartApiUrl = process.env.NODE_ENV === 'production'
    ? "https://talpa-verkkokauppa-cart-experience-api-dev.apps.arodevtest.hel.fi/"
    : 'https://talpa-verkkokauppa-cart-experience-api-test.apps.arodevtest.hel.fi/';

export const orderApiUrl = process.env.NODE_ENV === 'production'
    ? "https://talpa-verkkokauppa-order-experience-api-dev.apps.arodevtest.hel.fi/"
    : 'https://talpa-verkkokauppa-order-experience-api-test.apps.arodevtest.hel.fi/';


export const productApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://talpa-verkkokauppa-product-experience-api-dev.apps.arodevtest.hel.fi/'
    : 'https://talpa-verkkokauppa-product-experience-api-test.apps.arodevtest.hel.fi/';
# Mock order/payment server responses
[Globally install mock server](https://github.com/namshi/mockserver)

Mock server files can be added under this [mocksOrder folder](../src/tests/mocksOrder) or
under this [mocksPayment folder](../src/tests/mocksPayment)

Start mock server with [script](../tools/startMockServer.sh)
1. `npm run start-mock`

You can get mocked order using this [link](http://localhost:8000/dummy-order) when server is running.

## How to add mock responses
Add jsons under [cypress fixtures](../cypress/fixtures) folder.

###Extra tip:
Change [docker compose](../docker-compose.yml) variables to use mockservers
    REACT_APP_ORDER_API_URL=http://localhost:8000/
    REACT_APP_PAYMENT_API_URL=http://localhost:8001/

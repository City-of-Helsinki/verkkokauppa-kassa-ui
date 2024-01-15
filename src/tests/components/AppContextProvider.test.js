import { fireEvent, render, screen } from '@testing-library/react'
import AppContextProvider, { AppActionsContext, AppContext, resolvePaymentMethodLabel } from "../../context/Appcontext"
import { useContext } from "react"

/**
 * A component that uses the context
 */
function TestComponent(props) {
  // const [value, setValue] = useCustomHook();
  const { setPayment } = useContext(AppActionsContext)
  // contextValue.setFirstName('John');

  // Example of testing initial state
  // Assuming you have a way to access the context value in your tests
  const {
    timestamp,
    total,
  } = useContext(AppContext)
  return (
    <div>
      <button onClick={() => setPayment(props.payment)}>Change Value</button>
      <p title={'paymentMethodLabel'}>{resolvePaymentMethodLabel(
        props.payment.paymentType, props.payment.paymentMethod, props.payment.paymentMethodLabel
      )}</p>
      <p title={'timestamp'}>{timestamp}</p>
      <p title={'total'}>{total}</p>
    </div>
  );
}

describe('AppContextProvider', () => {
  test('initializes with the correct payment default values, uses paymentMethod if no paymentMethodLabel (feature/KYV-967-subscription-payment-values-not-show)', () => {
    const payment = {
      "paymentId": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d_at_20240115-192411",
      "namespace": "venepaikat",
      "orderId": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d",
      "userId": "dummy_user",
      "status": "payment_paid_online",
      "paymentMethod": "Visa",
      "paymentType": "subscription",
      "totalExclTax": 100,
      "total": 100,
      "taxAmount": 100,
      "description": null,
      "additionalInfo": "{\"payment_method\": Visa}",
      "token": null,
      "timestamp": "20240115-192411",
      "paymentMethodLabel": null,
      "paytrailTransactionId": "e6613348-b3ca-11ee-92a3-1f98717c5e63",
      "shopInShopPayment": false,
      "paytrailProvider": null,
      "paymentGateway": "online-paytrail",
      "createdAt": "2024-01-15T19:24:12.164",
      "updatedAt": "2024-01-15T19:24:12.164",
      "id": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d_at_20240115-192411",
      "new": false
    }
    render(<TestComponent payment={
      payment
    }/>, { wrapper: AppContextProvider })

    // The act function is used here to wrap the event that triggers the hook
    fireEvent.click(screen.getByText('Change Value'));

    // Asserting the expected outcome
    expect(screen.getByTitle('paymentMethodLabel')).toBeInTheDocument();
    expect(screen.getByTitle('paymentMethodLabel').innerHTML).toContain(payment.paymentMethod); // paymentMethodLabel is null then paymentMethod is used
    expect(screen.getByTitle('timestamp')).toBeInTheDocument();
    expect(screen.getByTitle('timestamp').innerHTML).toContain('20240115-192411');
    expect(screen.getByTitle('total')).toBeInTheDocument();
    expect(screen.getByTitle('total').innerHTML).toContain('100');

  })

  test('Uses paymentMethodLabel if set', () => {
    const payment = {
      "paymentId": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d_at_20240115-192411",
      "namespace": "venepaikat",
      "orderId": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d",
      "userId": "dummy_user",
      "status": "payment_paid_online",
      "paymentMethod": "Visa",
      "paymentType": "subscription",
      "totalExclTax": 100,
      "total": 100,
      "taxAmount": 100,
      "description": null,
      "additionalInfo": "{\"payment_method\": Visa}",
      "token": null,
      "timestamp": "20240115-192411",
      "paymentMethodLabel": "paymentMethodLabelValue",
      "paytrailTransactionId": "e6613348-b3ca-11ee-92a3-1f98717c5e63",
      "shopInShopPayment": false,
      "paytrailProvider": null,
      "paymentGateway": "online-paytrail",
      "createdAt": "2024-01-15T19:24:12.164",
      "updatedAt": "2024-01-15T19:24:12.164",
      "id": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d_at_20240115-192411",
      "new": false
    }
    render(<TestComponent payment={
      payment
    }/>, { wrapper: AppContextProvider })

    // The act function is used here to wrap the event that triggers the hook
    fireEvent.click(screen.getByText('Change Value'));

    // Asserting the expected outcome
    expect(screen.getByTitle('paymentMethodLabel')).toBeInTheDocument();
    expect(screen.getByTitle('paymentMethodLabel').innerHTML).toContain(payment.paymentMethodLabel);
    expect(screen.getByTitle('timestamp')).toBeInTheDocument();
    expect(screen.getByTitle('timestamp').innerHTML).toContain('20240115-192411');
    expect(screen.getByTitle('total')).toBeInTheDocument();
    expect(screen.getByTitle('total').innerHTML).toContain('100');

  })

  test('If no paymentMethod or paymentMethodLabel set defaults subscription to Korttimaksu', () => {
    const payment = {
      "paymentId": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d_at_20240115-192411",
      "namespace": "venepaikat",
      "orderId": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d",
      "userId": "dummy_user",
      "status": "payment_paid_online",
      "paymentMethod": null,
      "paymentMethodLabel": null,
      "paymentType": "subscription",
      "totalExclTax": 100,
      "total": 100,
      "taxAmount": 100,
      "description": null,
      "additionalInfo": "{\"payment_method\": Visa}",
      "token": null,
      "timestamp": "20240115-192411",
      "paytrailTransactionId": "e6613348-b3ca-11ee-92a3-1f98717c5e63",
      "shopInShopPayment": false,
      "paytrailProvider": null,
      "paymentGateway": "online-paytrail",
      "createdAt": "2024-01-15T19:24:12.164",
      "updatedAt": "2024-01-15T19:24:12.164",
      "id": "d3528af4-fe1c-3d05-b076-d3a11ce7cd2d_at_20240115-192411",
      "new": false
    }
    render(<TestComponent payment={
      payment
    }/>, { wrapper: AppContextProvider })

    // The act function is used here to wrap the event that triggers the hook
    fireEvent.click(screen.getByText('Change Value'));

    // Asserting the expected outcome
    expect(screen.getByTitle('paymentMethodLabel')).toBeInTheDocument();
    expect(screen.getByTitle('paymentMethodLabel').innerHTML).toContain('Korttimaksu');
    expect(screen.getByTitle('timestamp')).toBeInTheDocument();
    expect(screen.getByTitle('timestamp').innerHTML).toContain('20240115-192411');
    expect(screen.getByTitle('total')).toBeInTheDocument();
    expect(screen.getByTitle('total').innerHTML).toContain('100');

  })
})

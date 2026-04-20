import React, { Suspense } from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import i18n from "../../i18nInit" // Use test-specific i18n
import { AppContext, Order } from "../../context/Appcontext"
import ContractRow from "./ContractRow"
import { paymentApiUrl } from "../../constants"
import { PaymentMethod } from "../../types/payment/types"
import { OrderInvoice } from "../../types/invoice/types"

const mockPaymentMethod: PaymentMethod = {
  code: "invoice"
} as unknown as PaymentMethod

const mockInvoice: OrderInvoice = {
  businessId: "123456789"
} as unknown as OrderInvoice

const mockContextValue = {
  merchantTermsOfServiceUrl: "https://merchant-terms.com",
  isValidForCheckout: true,
  order: {} as Partial<Order>
}

describe("ContractRow Component", () => {
  const merchantTermsOfServiceUrl = "https://merchant-terms.com"

  const renderComponent = (props: any) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading translations...</div>}>
          {/* @ts-ignore */}
          <AppContext.Provider value={mockContextValue}>
            <ContractRow {...props} />
          </AppContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
  }

  test("renders service contract link", async () => {
    renderComponent({ orderType: "one-time" })
    await screen.findByText((content) => content.includes("Palvelun"))
    await waitFor(() => expect(screen.getByRole("link", { name: /käyttöehdot/i })).toHaveAttribute("href", merchantTermsOfServiceUrl))
  })

  test("renders subscription contract link if order type is subscription", async () => {
    renderComponent({ orderType: "subscription" })
    await screen.findByText((content) => content.includes("Jatkuvia tilauksia koskevat"))
    await waitFor(() => expect(screen.getByRole("link", { name: /yleiset ehdot/i })).toHaveAttribute("href", i18n.t("summary.contract.subscription-terms-url")))
  })

  test("renders invoice contract link if payment method is invoice and has businessId", async () => {
    renderComponent({ orderType: "one-time", paymentMethod: mockPaymentMethod, invoice: mockInvoice })
    await screen.findByText((content) => content.includes("Laskutettavia tilauksia koskevat"))
    await waitFor(() => expect(screen.getByRole("link", { name: /yleiset ehdot/i })).toHaveAttribute("href", `${paymentApiUrl}${i18n.t("summary.contract.invoice-terms-filename")}`))
  })

  test("does not render invoice contract row if no businessId is present", async () => {
    renderComponent({ orderType: "one-time", paymentMethod: mockPaymentMethod, invoice: {} })
    await screen.findByText((content) => content.includes("Palvelun")) // Other rows should exist
    await waitFor(() => expect(screen.queryByText((content) => content.includes("Laskutettavia tilauksia koskevat"))).not.toBeInTheDocument())
  })
})
import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nInit"; // Use test-specific i18n
import { AppContext } from "../../context/Appcontext";
import InvoiceDetailsRow from "./InvoiceDetailsRow";
import { OrderInvoice } from "../../types/invoice/types"

const mockInvoice = {
  name: "Test Company",
  businessId: "123456789",
  address: "123 Test St",
  postcode: "1000",
  city: "Test City",
  ovtId: "OVT-123456"
} as OrderInvoice;

const mockContextValue = {
  invoice: mockInvoice
};

describe("InvoiceDetailsRow Component", () => {
  const renderComponent = (contextValue: any) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {/* @ts-ignore */}
        <AppContext.Provider value={contextValue}>
          <InvoiceDetailsRow />
        </AppContext.Provider>
      </I18nextProvider>
    );
  };

  test("renders invoice details correctly", () => {
    renderComponent(mockContextValue);

    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText(`123 Test St`)).toBeInTheDocument();
    expect(screen.getByText(`1000 Test City`)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("123456789"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("OVT-123456"))).toBeInTheDocument();
  });

  test("does not render component if no invoice is provided", () => {
    renderComponent({ invoice: null });
    expect(screen.queryByText("Test Company")).not.toBeInTheDocument();
  });
});

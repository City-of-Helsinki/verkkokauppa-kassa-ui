import React from "react"
import { Trans, useTranslation } from "react-i18next";
import { PaymentGateway } from "../../enums/Payment";
import { PaymentMethod } from "../PaymentMethod";
import { PaymentMethods } from "../../talons/checkout/usePaymentMethods";

type PaymentMethodListProps = {
  // 👇️ turn of type checking
  availablePaymentMethods: PaymentMethods;
  currentSelectedPaymentMethod: string | null;
  initialSelectedMethod: (params: any) => any;
  setCurrentSelectedPaymentMethod: (params: any) => any;
  setCurrentSelectedPaymentMethodGateway: (params: any) => any;
  setNoMethodSelected: (params: any) => any;
};

export const PaymentMethodList: ({
                                   availablePaymentMethods,
                                   currentSelectedPaymentMethod,
                                   initialSelectedMethod,
                                   setCurrentSelectedPaymentMethod,
                                   setCurrentSelectedPaymentMethodGateway,
                                   setNoMethodSelected
                                 }: PaymentMethodListProps) => JSX.Element = ({
                                                       availablePaymentMethods,
                                                       currentSelectedPaymentMethod,
                                                       initialSelectedMethod,
                                                       setCurrentSelectedPaymentMethod,
                                                       setCurrentSelectedPaymentMethodGateway,
                                                       setNoMethodSelected,
                                                     }: PaymentMethodListProps) => {

  const { t } = useTranslation();

  const hasPaymentMethods = availablePaymentMethods && Object.keys(availablePaymentMethods).length > 0
  const vismaPaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway === PaymentGateway.VISMA;
  })

    return (
      <>
        <h2>{t("payment-methods.choose-payment-method")}</h2>
        <div className="inner-box">
          {hasPaymentMethods ? (
            <p>{t("payment-methods.choose-payment-method-info")}</p>
          ) : (
            <p>{t("payment-methods.no-payment-methods-info")}</p>
          )}

          <ul className="payment_methods" aria-label={t("payment-methods.choose-payment-method")}>
            {hasPaymentMethods &&
              Object.keys(availablePaymentMethods).map((key) => {
                const { code, img, name, gateway } = availablePaymentMethods[key]
                const isSelected =
                  currentSelectedPaymentMethod === null
                    ? initialSelectedMethod === null
                    : currentSelectedPaymentMethod === code;

                const handleSelectPaymentMethod = () => {
                  setNoMethodSelected(false);
                  setCurrentSelectedPaymentMethod(code);
                  setCurrentSelectedPaymentMethodGateway(gateway);
                }

                const cssRootClass = "payment_method";

                // TODO: styling
                return (
                  <PaymentMethod
                    key={name}
                    className={
                      isSelected ? cssRootClass + " selected" : cssRootClass
                    }
                    onClick={handleSelectPaymentMethod}
                    onChange={handleSelectPaymentMethod}
                    onFocus={handleSelectPaymentMethod}
                    image={img}
                    title={name}
                    checked={isSelected}
                  />
                );
              })}
          </ul>
          <Trans i18nKey="payment-methods.visma-pay.information" t={t}>
            Teksti <a target="_blank"  href={t("payment-methods.visma-pay.link-url")} rel="noreferrer">Linkki</a>
          </Trans>
        </div>
      </>
    )
}

export default PaymentMethodList;
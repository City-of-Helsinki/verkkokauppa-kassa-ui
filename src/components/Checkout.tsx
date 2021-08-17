import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Footer } from "hds-react";
import CustomerDetails from "./CustomerDetails";
import Summary from "./Summary";
import Paymentmethods from "./PaymentMethods";
import Error from "./Error";
import Success from "./Success";
import { useTranslation } from "react-i18next";
import StepContainer from "./StepContainer";
import CreateInstantPurchase from "./purchase/CreateInstantPurchase";

export const Checkout = () => {
  const { t } = useTranslation();


  return (
    <Container className="checkout-container" id="checkout-container">
      <Switch>
        <Route exact path="/">
            <Error />
        </Route>
        <Route exact path="/:id">
          <StepContainer
            statusLabel={t("steps.step-one")}
            activeStep={1}
            steps={4}
          >
            <CustomerDetails />
          </StepContainer>
        </Route>
        <Route path="/:id/summary">
          <StepContainer
            statusLabel={t("steps.step-two")}
            activeStep={2}
            steps={4}
          >
            <Summary />
          </StepContainer>
        </Route>
        <Route path="/:id/paymentmethod">
          <StepContainer
            statusLabel={t("steps.step-three")}
            activeStep={3}
            steps={4}
          >
            <Paymentmethods />
          </StepContainer>
        </Route>
        <Route path="/purchase/:id/">
          <StepContainer
              statusLabel={t("steps.step-four")}
              activeStep={1}
              steps={1}
          >
            <CreateInstantPurchase/>
          </StepContainer>
        </Route>
        <Route path="/:id/success">
          <StepContainer
            statusLabel="Test"
            activeStep={4}
            steps={4}
          >
            <Success />
          </StepContainer>
        </Route>
      </Switch>
    </Container>
  );
};

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
import FiInformation from "../assets/html/fi-information.html";
import EnInformation from "../assets/html/en-information.html";
import SvInformation from "../assets/html/sv-information.html";

export const Checkout = () => {
  const { t } = useTranslation();

  return (
      <Switch>
        <Route exact path="/">
            <Error />
        </Route>
        {/*Plain Html start*/}
        <Route exact path="/fi/information" >
          <div dangerouslySetInnerHTML={ { __html: FiInformation } }/>
        </Route>
        <Route exact path="/en/information" >
          <div dangerouslySetInnerHTML={ { __html: EnInformation } }/>
        </Route>
        <Route exact path="/sv/information" >
          <div dangerouslySetInnerHTML={ { __html: SvInformation } }/>
        </Route>
        {/*Plain Html end*/}
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
          <CreateInstantPurchase/>
        </Route>
        <Route path="/:id/success">
          <StepContainer
            statusLabel={t("steps.step-four")}
            activeStep={5}
            steps={4}
          >
            <Success />
          </StepContainer>
        </Route>
      </Switch>
  );
};

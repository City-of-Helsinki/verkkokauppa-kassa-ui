import React, { useContext } from "react"
import { Route, Switch } from 'react-router-dom'
import CustomerDetails from './pages/CustomerDetails'
import Summary from './pages/Summary'
import Paymentmethods from './payment/PaymentMethods'
import Error from './Error'
import Success from './pages/Success'
import UpdateCard from './pages/UpdateCard'
import CardUpdateSuccess from './pages/CardUpdateSuccess'
import CardUpdateFailed from './pages/CardUpdateFailed'
import { useTranslation } from 'react-i18next'
import StepContainer from './layout/containers/StepContainer'
import CreateInstantPurchase from './purchase/CreateInstantPurchase'
import FiInformation from '../assets/html/fi-information.html'
import EnInformation from '../assets/html/en-information.html'
import SvInformation from '../assets/html/sv-information.html'

import OidcCallback from '../auth/components/OidcCallback/OidcCallback'
import Login from './pages/Login'
import InvoiceDetails from './pages/InvoiceDetails'
import { AppContext } from "../context/Appcontext"
import { isInvoiceOrder } from "../services/OrderService"

export const Checkout = () => {
  const { t } = useTranslation();
  const {
    type,
    paymentMethod,
    invoice } = useContext(AppContext)
  const invoiceOrder = isInvoiceOrder(type, paymentMethod, invoice)
  return (
      <Switch>
        <Route exact path="/">
            <Error />
        </Route>

        <Route path="/auth/helsinki/return/" component={OidcCallback} />

        <Route path="/auth/helsinki/tunnistus/return" component={OidcCallback} />

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
        <Route exact path="/fi/subscription-terms" >
          <div dangerouslySetInnerHTML={ { __html: FiInformation } }/>
        </Route>
        <Route exact path="/en/subscription-terms" >
          <div dangerouslySetInnerHTML={ { __html: EnInformation } }/>
        </Route>
        <Route exact path="/sv/subscription-terms" >
          <div dangerouslySetInnerHTML={ { __html: SvInformation } }/>
        </Route>
        {/*Plain Html end*/}

        {/*Visitor routes start*/}
        <Route exact path="/:id">
          <StepContainer
            statusLabel={t("steps.step-one")}
            activeStep={1}
            steps={4}
          >
            <CustomerDetails />
          </StepContainer>
        </Route>

        <Route path="/:id/paymentmethod">
          <StepContainer
            statusLabel={t("steps.step-three")}
            activeStep={2}
            steps={4}
          >
            <Paymentmethods />
          </StepContainer>
        </Route>

        <Route path="/:id/summary">
          <StepContainer
            statusLabel={t("steps.step-two")}
            activeStep={3}
            steps={4}
          >
            <Summary />
          </StepContainer>
        </Route>


        <Route path="/purchase/:id/">
          <CreateInstantPurchase/>
        </Route>
        <Route path="/:id/success">
          <StepContainer
            statusLabel={invoiceOrder ? t("steps.step-four-invoice") : t("steps.step-four")}
            activeStep={5}
            steps={4}
          >
            <Success />
          </StepContainer>
        </Route>
        <Route path="/:id/receipt">
          <StepContainer
            statusLabel={t("steps.step-four")}
            activeStep={5}
            steps={4}
          >
            <Success />
          </StepContainer>
        </Route>

        <Route path="/:id/invoice">
          <StepContainer
            statusLabel={t("steps.step-five")}
            activeStep={4}
            steps={4}
          >
            <InvoiceDetails />
          </StepContainer>
        </Route>

        <Route path="/:id/update-card">
          <StepContainer
            statusLabel={t("steps.step-update-card")}
            activeStep={0}
            steps={0}
          >
            <UpdateCard />
          </StepContainer>
        </Route>

        <Route path="/:id/card-update-success">
          <StepContainer
            statusLabel={t("steps.step-card-update-success")}
            activeStep={0}
            steps={0}
          >
            <CardUpdateSuccess />
          </StepContainer>
        </Route>

        <Route path="/:id/card-update-failed">
          <StepContainer
            statusLabel={t("steps.step-card-update-failed")}
            activeStep={0}
            steps={0}
          >
            <CardUpdateFailed />
          </StepContainer>
        </Route>
        {/*Visitor routes end*/}

        {/*Profile routes start*/}
        <Route exact path="/profile/:id/login">
          <Login></Login>
        </Route>
        <Route exact path="/profile/:id">
          <StepContainer
            statusLabel={t("steps.step-one")}
            activeStep={1}
            steps={4}
          >
            <CustomerDetails />
          </StepContainer>
        </Route>

        <Route path="/profile/:id/paymentmethod">
          <StepContainer
            statusLabel={t("steps.step-three")}
            activeStep={2}
            steps={4}
          >
            <Paymentmethods />
          </StepContainer>
        </Route>

        <Route path="/profile/:id/summary">
          <StepContainer
            statusLabel={t("steps.step-two")}
            activeStep={3}
            steps={4}
          >
            <Summary />
          </StepContainer>
        </Route>

        <Route path="/profile/purchase/:id/">
          <CreateInstantPurchase/>
        </Route>
        <Route path="/profile/:id/success">
          <StepContainer
            statusLabel={t("steps.step-four")}
            activeStep={5}
            steps={4}
          >
            <Success />
          </StepContainer>
        </Route>
        <Route path="/profile/:id/receipt">
          <StepContainer
            statusLabel={t("steps.step-four")}
            activeStep={5}
            steps={4}
          >
            <Success />
          </StepContainer>
        </Route>
        {/*Profile routes end*/}
      </Switch>
  );
};

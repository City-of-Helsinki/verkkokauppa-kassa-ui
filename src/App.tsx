import React from 'react';
import {Container, Navigation} from "hds-react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useTranslation} from "react-i18next";

import LanguageSwitcher from "./components/header/LanguageSwitcher";
import Checkout from './components/Checkout';
import Summary from './components/Summary';
import Steps from './components/Steps';
import {AppContext} from './context/Appcontext';
import './App.scss';

export default function App() {
  const {t} = useTranslation();

  window.onbeforeunload = function () {return false;}
  
  return (
    <AppContext.Provider value={{}}>
    <Router>
      <div className="App">
        <Navigation
          title={t('common.page-title')}
          menuToggleAriaLabel="menu"
          skipTo="#checkout-container"
          skipToContentLabel={t('steps.skip-to-content')}
          >    
          <Navigation.Actions>
            <div className="cart">
              <svg className="cart-icon" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <title>Slice 1</title>
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="icon-shopping-cart">
                          <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                          <path d="M15.6,13 C16.3,13 17,12.6 17.3,12 L20.9,5.5 C21.2,4.8 20.8,4 20,4 L5.2,4 L4.3,2 L1,2 L1,4 L3,4 L6.6,11.6 L5.2,14 C4.5,15.3 5.4,17 7,17 L19,17 L19,15 L7,15 L8.1,13 L15.6,13 Z M6.2,6 L18.3,6 L15.5,11 L8.5,11 L6.2,6 Z M7,18 C5.9,18 5,18.9 5,20 C5,21.1 5.9,22 7,22 C8.1,22 9,21.1 9,20 C9,18.9 8.1,18 7,18 Z M17,18 C15.9,18 15,18.9 15,20 C15,21.1 15.9,22 17,22 C18.1,22 19,21.1 19,20 C19,18.9 18.1,18 17,18 Z" id="Shape" fill="#000000" fillRule="nonzero"></path>
                      </g>
                  </g>
              </svg>
              <div className="cart-size" id="cart-size">0</div>
            </div>
            <LanguageSwitcher />
          </Navigation.Actions>
        </Navigation>
        <Container className="checkout-container" id="checkout-container">
          <Switch>
            <Route exact path="/:id">
              <Steps statusLabel={t('steps.step-one')} activeStep={1}/>
              <Checkout/>
            </Route>
            <Route path="/:id/summary">
              <Steps statusLabel={t('steps.step-two')} activeStep={2}/>
              <Summary/>
            </Route>
            <Route path="/:id/paymentmethod">
              <Steps statusLabel={t('steps.step-three')} activeStep={3}/>
              <Paymentmethod />
            </Route>
            <Route path="/:id/success">
              <Steps statusLabel="Test" activeStep={4}/>
              <Success />
            </Route>
          </Switch>

        </Container>
      </div>
    </Router>
    </AppContext.Provider>
  );
}

function Paymentmethod() {
  // TODO: translate?
  return <h2>PaymentMethod</h2>;
}

function Success() {
  // TODO: translate?
  return <h2>Success</h2>;
}

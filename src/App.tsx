import React, {useState, useEffect, Component} from 'react';
import { IconAngleLeft, IconAngleRight, Footer, Tooltip, Card, Navigation, Container, Button, Notification, Checkbox, TextInput } from "hds-react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import Checkout from './components/Checkout';
import Steps from './components/Steps';
import { AppContext } from './context/Appcontext';
import './App.scss';

export default function App() {
  
  window.onbeforeunload = function () {return false;}
  
  return (
    <AppContext.Provider value={{}}>
    <Router>
      <div className="App">
        <Navigation
          title="Helsinki Verkkokauppa Kassa"
          menuToggleAriaLabel="menu"
          skipTo="#checkout-container"
          skipToContentLabel="Skip to content"
          >    
          <Navigation.Actions>
            <div className="cart">
              <div className="cart-size" id="cart-size">0</div>
            </div>
          </Navigation.Actions>
        </Navigation>
        <Container className="checkout-container" id="checkout-container">
          
          <Switch>
            <Route path="/step2">
              <Steps statusLabel="Test" activeStep={2}></Steps>
              <Step2 />
            </Route>
            <Route path="/step3">
              <Steps statusLabel="Test" activeStep={3}></Steps>
              <Step3 />
            </Route>
            <Route path="/step4">
              <Steps statusLabel="Test" activeStep={4}></Steps>
              <Step4 />
            </Route>
            <Route path="/:id">
              <Steps statusLabel="Syötä tilaajan tiedot" activeStep={1}></Steps>
              <Checkout></Checkout>
            </Route>
            <Route path="/">
              <Steps statusLabel="Syötä tilaajan tiedot" activeStep={1}></Steps>
              <Checkout></Checkout>
            </Route>
          </Switch>

        </Container>
      </div>
    </Router>
    </AppContext.Provider>
  );
}

function Step2() {
  const appContext = React.useContext(AppContext);
  return <h2>Step2{appContext.name}</h2>;
}

function Step3() {
  return <h2>Step3</h2>;
}

function Step4() {
  return <h2>Step4</h2>;
}

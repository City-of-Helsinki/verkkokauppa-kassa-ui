import React, {useState, useEffect, Component} from 'react';
import { IconAngleLeft, IconAngleRight, Footer, Tooltip, Card, Navigation, Container, Button, Notification, Checkbox, TextInput } from "hds-react";
import Products from './Products';
import {
  useParams
} from "react-router-dom";

//import { ReactComponent as Logo } from './../assets/images/shopping-cart.svg';


function Checkout() {

  let { id } = useParams();
  // Declare a new state variable, which we'll call "count"
  const [cartId, setCartId] = useState(id);
  const [statusLabel, setStatuslable] = useState("Syötä tilaajan tiedot");

  const submit=() => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    var firstname = document.getElementById('firstname');
    console.log(firstname);
  }

  return(
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
        <h1>{statusLabel}</h1>
        <div className="steps-container">
          <div className="step-container"><div className="step active" id="step-1">1</div></div>
          <div className="step-container"><div className="step" id="step-2">2</div></div>
          <div className="step-container"><div className="step" id="step-3">3</div></div>
          <div className="step-container"><div className="step" id="step-4">4</div></div>
        </div>

        <Products cartId={cartId}></Products>

        <div className="subscriber-details">
          <h2>Henkilötiedot</h2>
          <form>
          <TextInput
            id="firstname"
            label="Etunimi"
            className="checkout-input"
            helperText="Kirjoita tähän tilaajan etunimi"
            required
          />
          <TextInput
            id="lastname"
            label="Sukunimi"
            className="checkout-input"
            helperText="Kirjoita tähän tilaajan sukunimi"
            required
          />
          <TextInput
            id="email"
            label="Sähköposti"
            className="checkout-input"
            helperText="Kirjoita tähän käytössä oleva sähköpostiosoite"
            required
          />
          </form>
        </div>

        <div className="checkout-actions">
          <Checkbox id="checkbox1" className="accept-conditions" label="Hyväksyn palvelun yleiset ehdot" />
          <Button onClick={submit} className="submit" iconRight={<IconAngleRight />}>Siirry maksamaan</Button>
          <Button className="cancel" variant="secondary" iconLeft={<IconAngleLeft />}>Peruuta ja palaa edelliseen</Button>
        </div>
        
      </Container>

      <Footer></Footer>
    </div>
  )
}

export default Checkout;

import React, {useState, useEffect, Component} from 'react';
import { IconAngleLeft, IconAngleRight, Footer, Tooltip, Card, Navigation, Container, Button, Notification, Checkbox, TextInput } from "hds-react";
import Products from './Products';
import { AppContext } from '../context/Appcontext';
import {
  useParams,
  useHistory
} from "react-router-dom";

function Summary() {

  const appContext = React.useContext(AppContext);
  const history = useHistory();
  const orderId = localStorage.getItem('orderId');

  const submit=() => {

    if (document.getElementById('terms-checkbox').checked) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customer: {firstName: localStorage.getItem('firstname'), lastName: localStorage.getItem('lastname'), email: localStorage.getItem('email')}})
      };
  
      fetch('https://talpa-verkkokauppa-order-experience-api-test.apps.arodevtest.hel.fi/'+localStorage.getItem('orderId')+'/customer', requestOptions)
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          //history.push("/paymentmethod");
       });
    } else {
        alert("Sinun täytyy hyväksyä rekisteriseloste ja tietosuojaperiaatteet ennen kun voit siirtymä maksamaan");
    }
  }

  const goBack=() => {
    history.push(orderId);
  }

  return(
    <div className="App2"> 
      <Container className="checkout-container" id="checkout-container">
        <Products orderId={orderId} activeStep={2}></Products>

        <div className="subscriber-details">
          <h2>Tilaajan tiedot</h2>
          <div className="subscriber-details-values">
            <p>{localStorage.getItem('firstname')} {localStorage.getItem('lastname')}</p>
            <p>{localStorage.getItem('email')}</p>
            <p>{localStorage.getItem('phone')}</p>
          </div>          
          <hr></hr>
        </div>

        <div className="checkout-actions">  
          <label className="container">Olen tutustunut <a href="#">rekisteriselosteeseen</a> ja kaupungin <a href="#">tietosuojaperiaatteisiin</a>
            <input type="checkbox" id="terms-checkbox"/>
            <span className="checkmark"></span>
          </label>    
          <Button onClick={submit} className="submit" iconRight={<IconAngleRight />}>Siirry maksamaan</Button>
          <Button onClick={goBack} className="cancel" variant="secondary" iconLeft={<IconAngleLeft />}>Peruuta ja palaa edelliseen</Button>
        </div>
        
      </Container>

      <Footer></Footer>
    </div>
  )
}

export default Summary;

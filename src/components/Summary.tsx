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
  let { id } = useParams();


  console.log(id);
  if (!appContext.firstname) {
    history.push("/"+id);
  }

  const submit=() => {

    if (document.getElementById('terms-checkbox').checked) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({customer: {firstName: appContext.firstname, lastName: appContext.lastname, email: appContext.email}})
      };
  
      fetch('https://talpa-verkkokauppa-order-experience-api-test.apps.arodevtest.hel.fi/'+appContext.subscriptionId+'/customer', requestOptions)
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          history.push("/"+appContext.subscriptionId+"/paymentmethod");
       });
    } else {
        alert("Sinun täytyy hyväksyä rekisteriseloste ja tietosuojaperiaatteet ennen kun voit siirtymä maksamaan");
    }
  }

  const goBack=() => {
    history.push("/"+id);
  }

  return(
    <div className="App2"> 
      <Container className="checkout-container" id="checkout-container">
        <Products orderId={id} activeStep={2}></Products>

        <div className="subscriber-details">
          <h2>Tilaajan tiedot</h2>
          <div className="subscriber-details-values">
            <p>{appContext.firstname} {appContext.lastname}</p>
            <p>{appContext.email}</p>
            <p>{appContext.phone}</p>
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

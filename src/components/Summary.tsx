import React from 'react';
import {Button, Container, Footer, IconAngleLeft, IconAngleRight} from "hds-react";
import {useHistory, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

import Products from './Products';
import {AppContext} from '../context/Appcontext';

function Summary() {
  const {t} = useTranslation();
  const appContext = React.useContext(AppContext);
  const history = useHistory();
  let { id } = useParams();

  console.log(id);
  if (!appContext.firstname) {
    history.push("/"+id);
  }

  const submit=() => {

    // @ts-ignore
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
        alert(t('summary.terms.cb-error'));
    }
  }

  const goBack=() => {
    history.push("/"+id);
  }

  return(
    <div className="App2"> 
      <Container className="checkout-container" id="checkout-container">
        <Products orderId={id} activeStep={2}/>

        <div className="subscriber-details">
          <h2>{t('summary.customer-information')}</h2>
          <div className="subscriber-details-values">
            <p>{appContext.firstname} {appContext.lastname}</p>
            <p>{appContext.email}</p>
            <p>{appContext.phone}</p>
          </div>          
          <hr></hr>
        </div>

        <div className="checkout-actions">  
          <label className="container">{t('summary.terms.cb-label')}
            <input type="checkbox" id="terms-checkbox"/>
            <span className="checkmark"/>
          </label>    
          <Button onClick={submit} className="submit" iconRight={<IconAngleRight />}>{t('checkout.form.submit-button')}</Button>
          <Button onClick={goBack} className="cancel" variant="secondary" iconLeft={<IconAngleLeft />}>{t('common.cancel-and-return')}</Button>
        </div>
        
      </Container>

      <Footer></Footer>
    </div>
  )
}

export default Summary;

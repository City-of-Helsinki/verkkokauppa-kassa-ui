import React, {useState, useEffect, Component} from 'react';
import { IconAngleLeft, IconAngleRight, Footer, Tooltip, Card, Navigation, Container, Button, Notification, Checkbox, TextInput } from "hds-react";
import Products from './Products';
import { AppContext } from './../context/Appcontext';
import {
  useParams,
  useHistory
} from "react-router-dom";
import { Formik } from 'formik';

function Checkout() {

  const appContext = React.useContext(AppContext);
  let { id } = useParams();
  appContext.subscriptionId = id;
  const history = useHistory();

  // Declare a new state variable, which we'll call "count"
  const [orderId, setOrderId] = useState(id);

  return(
    <div className="App2"> 
      <Container className="checkout-container" id="checkout-container">
        <Products orderId={orderId} activeStep={1}></Products>

        <div className="subscriber-details">
          <h2>Henkilötiedot</h2>
          <Formik
            initialValues={{ firstname: appContext.firstname, lastname: appContext.lastname, email: appContext.email, phone: appContext.phone }}
            validate={values => {
              const errors = {};
              if (!values.firstname) {
                errors.firstname = 'Pakollinen';
              } else if (values.firstname.length > 15) {
                errors.firstname = 'Saa olla enintään 15 merkkiä pitkä';
              }
            
              if (!values.lastname) {
                errors.lastname = 'Pakollinen';
              } else if (values.lastname.length > 20) {
                errors.lastname = 'Saa olla enintään 20 merkkiä pitkä';
              }
            
              if (!values.email) {
                errors.email = 'Pakollinen';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Virheellinen sähköposti';
              }

              var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

              if (!values.phone) {
                errors.phone = 'Pakollinen';
              } else if (!regex.test(values.phone)) {
                errors.phone = 'Virheellinen puhelinnumero';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                appContext.firstname = values.firstname;
                appContext.lastname = values.lastname;
                appContext.email = values.email;
                appContext.phone = values.phone;
                setSubmitting(false);
                history.push("/"+appContext.subscriptionId+"/summary");
              }, 400);
            }}
          >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <TextInput
                id="firstname"
                type="text"
                name="firstname"
                label="Etunimi"
                className="checkout-input"
                helperText="Kirjoita tähän tilaajan etunimi"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.firstname && touched.firstname && errors.firstname}
              />
              <TextInput
                id="lastname"
                type="text"
                name="lastname"
                label="Sukunimi"
                className="checkout-input"
                helperText="Kirjoita tähän tilaajan sukunimi"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.lastname && touched.lastname && errors.lastname}
              />
              <TextInput
                id="email"
                type="email"
                name="email"
                label="Sähköposti"
                className="checkout-input"
                helperText="Kirjoita tähän käytössä oleva sähköpostiosoite"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.email && touched.email && errors.email}
              />
              <TextInput
                id="phone"
                type="text"
                name="phone"
                label="Puhelin"
                className="checkout-input"
                helperText="Kirjoita tähän käytössä oleva puhelinnumero muodossa (+358401234567)"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.phone && touched.phone && errors.phone}
              />
                
              <div className="checkout-actions">
                <Button type="submit" className="submit" disabled={isSubmitting} iconRight={<IconAngleRight />}>Siirry maksamaan</Button>
                <Button className="cancel" variant="secondary" iconLeft={<IconAngleLeft />}>Peruuta ja palaa edelliseen</Button>
              </div>
            </form>
          )}
        </Formik>
      
        </div>

        
        
      </Container>

      <Footer></Footer>
    </div>
  )
}

export default Checkout;

import React, {useState} from 'react';
import {IconAngleLeft, IconAngleRight, Footer, Container, Button, TextInput} from "hds-react";
import {
    useParams,
    useHistory
} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';

import Products from './Products';
import {AppContext} from '../context/Appcontext';

function Checkout() {
    const {i18n, t} = useTranslation();

    const appContext = React.useContext(AppContext);
    let {id} = useParams();
    appContext.subscriptionId = id;
    const history = useHistory();

    // Declare a new state variable, which we'll call "count"
    const [orderId] = useState(id);

    return (
        <div className="App2">
            <Container className="checkout-container" id="checkout-container">
                <Products orderId={orderId} activeStep={1}/>

                <div className="subscriber-details">
                    <h2>{t('checkout.address-information')}</h2>
                    <Formik
                        initialValues={{
                            firstname: appContext.firstname,
                            lastname: appContext.lastname,
                            email: appContext.email,
                            phone: appContext.phone
                        }}
                        validate={values => {
                            const errors: any = {};
                            if (!values.firstname) {
                                errors.firstname = t('common.validation.required');
                            } else if (values.firstname.length > 15) {
                                errors.firstname = t('common.validation.maxlength', {maxLength: 15});
                            }

                            if (!values.lastname) {
                                errors.lastname = t('common.validation.required');
                            } else if (values.lastname.length > 20) {
                                errors.lastname = t('common.validation.maxlength', {maxLength: 20});
                            }

                            if (!values.email) {
                                errors.email = t('common.validation.required');
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = t('error.constraint.email.valid');
                            }

                            var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

                            if (!values.phone) {
                                errors.phone = t('common.validation.required');
                            } else if (!regex.test(values.phone)) {
                                errors.phone = t('error.constraint.phone.valid');
                            }

                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                //alert(JSON.stringify(values, null, 2));
                                appContext.firstname = values.firstname;
                                appContext.lastname = values.lastname;
                                appContext.email = values.email;
                                appContext.phone = values.phone;
                                setSubmitting(false);
                                history.push("/" + appContext.subscriptionId + "/summary?lng=" + i18n.language);
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
                                    label={t('checkout.form.fields.firstname.label')}
                                    className="checkout-input"
                                    helperText={t('checkout.form.fields.firstname.helper-text')}
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorText={errors.firstname && touched.firstname ? errors.firstname : undefined}
                                />
                                <TextInput
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    label={t('checkout.form.fields.surname.label')}
                                    className="checkout-input"
                                    helperText={t('checkout.form.fields.surname.helper-text')}
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorText={errors.lastname && touched.lastname ? errors.lastname : undefined}
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    label={t('checkout.form.fields.email.label')}
                                    className="checkout-input"
                                    helperText={t('checkout.form.fields.email.helper-text')}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorText={errors.email && touched.email ? errors.email : undefined}
                                />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    label={t('checkout.form.fields.phone.label')}
                                    className="checkout-input"
                                    helperText={t('checkout.form.fields.phone.helper-text')}
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errorText={errors.phone && touched.phone ? errors.phone : undefined}
                                />

                                <div className="checkout-actions">
                                    <Button
                                        type="submit"
                                        className="submit"
                                        disabled={isSubmitting}
                                        iconRight={<IconAngleRight/>}
                                    >
                                        {t('checkout.form.submit-button')}
                                    </Button>
                                    <Button
                                        className="cancel"
                                        variant="secondary"
                                        iconLeft={<IconAngleLeft/>}
                                    >
                                        {t('common.cancel-and-return')}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    )
}

export default Checkout;

import React, {useContext} from 'react'
import {IconAngleLeft, IconAngleRight,  Container, Button, TextInput} from "hds-react";
import {
    useHistory
} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {Formik, Field, Form} from 'formik'

import Products from './Products';
import {AppActionsContext, AppContext} from '../context/Appcontext'
import {useCustomer} from "../talons/checkout/useCustomer"

export const CustomerDetails = () => {
    const {i18n, t} = useTranslation();
    const { setCustomer } = useCustomer();

    const {orderId, firstName, lastName, email, phone} = useContext(AppContext);
    const {setFirstName, setLastName, setEmail, setPhone} = useContext(AppActionsContext);
    const history = useHistory();



    return (
        <div className="App2">
            <Container className="checkout-container" id="checkout-container">
                <Products activeStep={1}/>

                <div className="subscriber-details">
                    <h2>{t('checkout.address-information')}</h2>
                    <Formik
                        initialValues={{
                            firstName,
                            lastName,
                            email,
                            phone
                        }}
                        validate={values => {
                            const errors: any = {};
                            if (!values.firstName) {
                                errors.firstName = t('common.validation.required');
                            } else if (values.firstName.length > 15) {
                                errors.firstName = t('common.validation.maxlength', {maxLength: 15});
                            }

                            if (!values.lastName) {
                                errors.lastName = t('common.validation.required');
                            } else if (values.lastName.length > 20) {
                                errors.lastName = t('common.validation.maxlength', {maxLength: 20});
                            }

                            if (!values.email) {
                                errors.email = t('common.validation.required');
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = t('error.constraint.email.valid');
                            }

                            const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

                            if (!values.phone) {
                                errors.phone = t('common.validation.required');
                            } else if (!regex.test(values.phone)) {
                                errors.phone = t('error.constraint.phone.valid');
                            }

                            return errors;
                        }}
                        onSubmit={async (values, {setSubmitting}) => {
                            if (orderId) {
                                setFirstName(values.firstName)
                                setLastName(values.lastName)
                                setEmail(values.email)
                                setPhone(values.phone)
                                await setCustomer({orderId, ...values});
                            }
                            setSubmitting(false);
                            history.push("/" + orderId + "/summary?lng=" + i18n.language);
                        }}
                    >
                        {({
                              errors,
                              touched,
                              isSubmitting,
                          }) => (
                            <Form>
                                <Field
                                  as={TextInput}
                                  id="firstName"
                                  type="text"
                                  name="firstName"
                                  label={t('checkout.form.fields.firstname.label')}
                                  className="checkout-input"
                                  helperText={t('checkout.form.fields.firstname.helper-text')}
                                  errorText={errors.firstName && touched.firstName ? errors.firstName : undefined}
                                />
                                <Field
                                  as={TextInput}
                                  id="lastName"
                                  type="text"
                                  name="lastName"
                                  label={t('checkout.form.fields.surname.label')}
                                  className="checkout-input"
                                  helperText={t('checkout.form.fields.surname.helper-text')}
                                  errorText={errors.lastName && touched.lastName ? errors.lastName : undefined}
                                />
                                <Field
                                  as={TextInput}
                                  id="email"
                                  type="email"
                                  name="email"
                                  label={t('checkout.form.fields.email.label')}
                                  className="checkout-input"
                                  helperText={t('checkout.form.fields.email.helper-text')}
                                  errorText={errors.email && touched.email ? errors.email : undefined}
                                />
                                <Field
                                  as={TextInput}
                                  id="phone"
                                  type="text"
                                  name="phone"
                                  label={t('checkout.form.fields.phone.label')}
                                  className="checkout-input"
                                  helperText={t('checkout.form.fields.phone.helper-text')}
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
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    )
}

export default CustomerDetails;

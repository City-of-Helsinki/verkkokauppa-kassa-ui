import React, { useContext } from "react"


import { Button,Container, IconAngleRight } from "hds-react-next"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppContext } from "../../context/Appcontext"
import { useUpdateCardFormParameters } from "../../hooks/checkout/useUpdateCardFormParameters"
import Products from "../product/Products"


function UpdateCard() {
  const { t } = useTranslation()

  const {
    orderId,
    subscriptionId,
    firstName,
    lastName,
    email,
    phone,
    merchantCity,
    merchantEmail,
    merchantName,
    merchantPhone,
    merchantStreet,
    merchantZip,
  } = useContext(AppContext)

  const history = useHistory()
  if (!orderId) {
    history.push("/")
  }

  const {
    redirectToPaytrailUpdateCardForm,
  } = useUpdateCardFormParameters()

  if (!subscriptionId) {
    history.push("/")
  }

  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">

        <div className="desktop-flex normal">
          <div className="inner-box">
            { t("update-card.prefix") }
          </div>
        </div>

        <div className="desktop-flex normal">
          <div className="subscriber-details">
            <h2>{ t("summary.customer-information") }</h2>
            <div className="inner-box">
              <div className="subscriber-details-values">
                <table>
                  <tr>
                    <td>{ firstName } { lastName }</td>
                  </tr>
                  <tr>
                    <td>{ email }</td>
                  </tr>
                  <tr>
                    <td>{ phone }</td>
                  </tr>
                </table>
              </div>
              <hr/>
            </div>
          </div>

          <div className="merchant-details">
            <h2>{ t("success.merchant-information") }</h2>
            <div className="inner-box">
              <div className="merchant-details-values">
                <table>
                  <tr>
                    <td>{ merchantName }</td>
                  </tr>
                  <tr>
                    <td>{ merchantStreet }</td>
                  </tr>
                  <tr>
                    <td>{ merchantZip } { merchantCity }</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{ merchantEmail }</td>
                  </tr>
                  <tr>
                    <td>{ merchantPhone }</td>
                  </tr>
                </table>
              </div>
              <hr/>


            </div>
          </div>

            <div className="product-values">
              <Products activeStep={ 1 }></Products>
            </div>

        </div>
        <br></br>


        <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            onClick={ () => redirectToPaytrailUpdateCardForm(orderId) }
            iconEnd={ <IconAngleRight className={ 'icon-right' }/> }
          >
            { t("update-card.cta") }
          </Button>


        </div>
      </Container>
    </div>
  )
}

export default UpdateCard
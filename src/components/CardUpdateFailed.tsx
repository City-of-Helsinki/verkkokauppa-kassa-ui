import React, { useContext } from "react"

import { Button, Container, IconAngleRight, Notification } from "hds-react"
import { useHistory, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppContext } from "../context/Appcontext"
import { useUpdateCardFormParameters } from "../talons/checkout/useUpdateCardFormParameters"


function CardUpdateFailed() {
  const { t } = useTranslation()

  const { orderId } = useContext(AppContext)
  const {
    redirectToPaytrailUpdateCardForm,
  } = useUpdateCardFormParameters()

  const history = useHistory()
  if (!orderId) {
    history.push("/")
  }

  let { id } = useParams()

  const handleProceedToSuccess = () => {
    if (id) {
      window.location.href = `/${ id }/success`
    }
  }

  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">

        <Notification className="success-notification" label={ t("update-card.card-update-failed-header") }
                      type="alert">{ t("update-card.card-update-failed-content") }</Notification>

        <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            onClick={ () => redirectToPaytrailUpdateCardForm(orderId) }
            iconRight={ <IconAngleRight className={ 'icon-right' }/> }
          >
            { t("update-card.card-update-failed-try-again") }
          </Button>
        </div>

        <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            variant="secondary"
            onClick={ handleProceedToSuccess }
            iconRight={ <IconAngleRight className={ 'icon-right' }/> }
          >
            { t("update-card.go-to-receipt") }
          </Button>


        </div>
      </Container>
    </div>
  )
}

export default CardUpdateFailed
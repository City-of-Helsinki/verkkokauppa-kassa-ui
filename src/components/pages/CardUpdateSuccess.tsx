import React, { useContext } from "react"

import { Button, Container, IconAngleRight, Notification } from "hds-react"
import { useHistory, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { AppContext } from "../../context/Appcontext"
import { getSearchParam } from "../../hooks/general/useSearchParam"


function CardUpdateSuccess() {
  const { t } = useTranslation()

  const { orderId, merchantUrl } = useContext(AppContext)

  const history = useHistory()
  if (!orderId) {
    history.push("/")
  }

  let { id } = useParams()
  const cardLastFourDigits = getSearchParam("cardLastFourDigits")
  const cardExpiry = getSearchParam("cardExpiry")

  const goBackToMerchant = () => {
    window.location.href = merchantUrl
  }

  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">
        <Notification className="success-notification" label={t("update-card.card-update-success-header")}
                      type="success">{
          t("update-card.card-update-success-content")
        }
          <div>
            {t("update-card.card-details-content", {
              lastFour: cardLastFourDigits,
              expiry: cardExpiry
            })}
          </div>
        </Notification>

        <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            variant="secondary"
            onClick={goBackToMerchant}
            iconRight={<IconAngleRight className={"icon-right"} />}
          >
            {t("success.proceed-to-service")}
          </Button>


        </div>
      </Container>
    </div>
  )
}

export default CardUpdateSuccess
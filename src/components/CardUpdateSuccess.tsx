import React, { useContext } from "react";

import { Container, IconAngleRight, Button, Notification} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext} from "../context/Appcontext"


function CardUpdateSuccess() {
  const { t } = useTranslation();

  const {orderId} = useContext(AppContext);

  const history = useHistory();
  if (!orderId) {
      history.push("/");
  }

  let { id } = useParams();

  const handleProceedToSuccess = () => {
    if (id) {
      window.location.href = "/"+id+"/success";
    }
  };

  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">
        <Notification className="success-notification" label={t("update-card.card-update-success-header")} type="success">{t("update-card.card-update-success-content")}</Notification>
      
        <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            variant="secondary"
            onClick={handleProceedToSuccess}
            iconRight={<IconAngleRight />}
          >
           {t("update-card.go-to-receipt")}
          </Button>

          
        </div>
      </Container>
    </div>
  );
}

export default CardUpdateSuccess;
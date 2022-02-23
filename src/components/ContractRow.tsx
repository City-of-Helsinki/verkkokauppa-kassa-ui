import React, { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import { AppContext } from "../context/Appcontext";

type Props = {
  orderType: string,
}

export const ContractRow: FunctionComponent<Props &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > = (props) => {
  const { orderType } = props;
  const { t } = useTranslation();
  const { merchantTermsOfServiceUrl } = useContext(AppContext);

  return <ul>
    <li>
      <Trans i18nKey="summary.contract.service-label" t={t}> Teksti <a target="_blank"  href={merchantTermsOfServiceUrl} rel="noreferrer">Linkki</a></Trans>
    </li>
    {
      orderType === "subscription" && <li>
        <Trans i18nKey="summary.contract.subscription-label" t={t}> Teksti <a target="_blank"  href={t('summary.contract.subscription-terms-url')} rel="noreferrer">Linkki</a></Trans>
      </li>
    }

  </ul>
}

export default ContractRow
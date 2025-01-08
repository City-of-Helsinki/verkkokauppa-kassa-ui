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

  return <ul key={'contract-row'}>
    <li key={'li-summary.contract.service-label'}>
      <Trans key={'summary.contract.service-label'} i18nKey="summary.contract.service-label" t={t}> Teksti <a key={'summary.contract.service-label-link'} target="_blank"  href={merchantTermsOfServiceUrl} rel="noreferrer">Linkki</a></Trans>
    </li>
    {
      orderType === "subscription" && <li key={'li-summary.contract.subscription-label'}>
        <Trans key={'summary.contract.subscription-label'} i18nKey="summary.contract.subscription-label" t={t}> Teksti <a key={'summary.contract.subscription-label-link'} target="_blank"  href={t('summary.contract.subscription-terms-url')} rel="noreferrer">Linkki</a></Trans>
      </li>
    }

  </ul>
}

export default ContractRow
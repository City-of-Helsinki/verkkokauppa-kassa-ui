import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from 'hds-react';

import authService from '../../authService';
//import { useErrorPageRedirect } from '../../../profile/hooks/useErrorPageRedirect';

function OidcCallback({
  history,
}: RouteChildrenProps): React.ReactElement | null {
  const { t } = useTranslation();
  //const redirectToErrorPage = useErrorPageRedirect();

  const orderId = localStorage.getItem('orderId');

  useEffect(() => {
    //window.location.replace(`/profile/${ orderId }`);

    authService
      .endLogin()
      .then(() => {
        window.location.replace(`/profile/${ orderId }`);
      })
      .catch((error: Error) => {
       console.log(error)
      });
  }, [history, t]);

  return (
    <div className="box spinner">
      <LoadingSpinner />
    </div>
  );
}

export default OidcCallback;
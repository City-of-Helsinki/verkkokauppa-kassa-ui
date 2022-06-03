import React, { useEffect } from 'react';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from 'hds-react';

import authService from '../../authService';

function OidcCallback({
  history,
}: RouteChildrenProps): React.ReactElement | null {
  const { t } = useTranslation();
  const orderId = localStorage.getItem('orderId');

  useEffect(() => {
    authService
      .endLogin()
      .then(() => {
        window.location.replace(`/profile/${ orderId }`);
      })
      .catch((error: Error) => {
       console.log(error)
       window.location.replace(`/`);
      });
    // eslint-disable-next-line
  }, [history, t]);

  return (
    <div className="box spinner">
      <LoadingSpinner />
    </div>
  );
}

export default OidcCallback;
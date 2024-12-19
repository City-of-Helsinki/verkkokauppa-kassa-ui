import React, { useEffect } from 'react'
import { RouteChildrenProps } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from 'hds-react'

import authService from '../../authService'
import { toast } from 'react-toastify'
import * as Sentry from '@sentry/browser'

function OidcCallback({
                        history,
                      }: RouteChildrenProps): React.ReactElement | null {
  const { t } = useTranslation()
  const orderId = localStorage.getItem('orderId')
  useEffect(() => {
    authService
      .endLogin()
      .then(() => {
        console.log(`Logged in, redirecting to /profile/${orderId}`)
        window.location.replace(`/profile/${orderId}`)
      })
      .catch((error) => {
        console.log(error)
        if (!(error instanceof Error)) {
          error = new Error(`Login-rejection: ${JSON.stringify(error)}`);
        }
        // if (error.message !== 'Network Error') {
        Sentry.captureException(error)
        // }
        toast.warn(`Message: orderId: ${orderId}\n ${error}`, {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        )
        window.location.replace(`/`)
      })
    // eslint-disable-next-line
  }, [ history, t ])

  return (
    <div className="box spinner">
      <LoadingSpinner/>
    </div>
  )
}

export default OidcCallback
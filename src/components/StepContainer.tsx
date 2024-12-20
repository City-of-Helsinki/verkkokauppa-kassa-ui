import React, { FunctionComponent, useContext, useEffect, useState } from "react"
import Steps from "./Steps"
import { useOrder } from "../talons/checkout/useOrder"
import { AppActionsContext, AppContext } from "../context/Appcontext"
import { matchPath, useHistory, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useMerchant } from "../talons/checkout/useMerchant"
import { getSearchParam } from "../hooks/useSearchParam"
import useUser from "../talons/header/useUser"
import authService from '../auth/authService'
import { getMerchantIdFromFirstOrderItem } from "../utils/OrderItemUtils"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Timer } from "./timer/Timer"
import { useTranslation } from "react-i18next"
import { Notification } from "hds-react"
import useGetCancelUrlAndRedirectBackToService from "../hooks/useGetCancelUrlAndRedirectBackToService"
import { isAllowedPathForTimer } from "../utils/PathCheckUtil"
import { UserKeys } from '../enums/User'

type Props = {
  statusLabel: string;
  activeStep: number;
  steps: number;
};


export const StepContainer: FunctionComponent<Props> = (props) => {
  const { statusLabel, activeStep, steps } = props
  const { fetchOrder, loading: orderLoading } = useOrder()
  const { fetchMerchant, loading: merchantLoading } = useMerchant()
  const history = useHistory()
  const { orderId, lastValidPurchaseDateTime, merchantUrl } = useContext(AppContext)
  const { setOrderId, setOrder, setMerchantFromConfiguration } = useContext(AppActionsContext)
  const { id } = useParams()
  const { t } = useTranslation()
  localStorage.setItem('orderId', id)

  const { getCancelUrlAndRedirectBackToService } = useGetCancelUrlAndRedirectBackToService(
    orderId,
    merchantUrl
  )

  const location = useLocation()
  const isProfileLogin = matchPath(location.pathname, {
    path: '/profile/:id',
    exact: false,
    strict: false
  })

  const [ loading, setLoading ] = useState(true)

  const userParameter = getSearchParam("user")
  const { setOrGenerateUserId } = useUser()

  useEffect(() => {
    if (userParameter !== "") {
      setOrGenerateUserId(userParameter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setLoading(true)
    setOrderId(id)
    if (id) {

      // if (isProfileLogin && userParameter) {
      //   window.location.replace(`/${orderId}`)
      // }

      if (isProfileLogin && !authService.isAuthenticated()) {
        setLoading(true)
        window.location.replace(`/profile/${orderId}/login`);
        return
      }

      fetchOrder(id).then((data) => {
        if (orderLoading) {
          setLoading(true)
          return
        }

        if (null !== data && typeof data !== "undefined" && data.orderId) {
          setOrder(data)
          const { items } = data
          let merchantId = null
          if (getMerchantIdFromFirstOrderItem(items)) {
            merchantId = items[0].merchantId
          }
          fetchMerchant(data.namespace, merchantId).then((data) => {
            if (merchantLoading) {
              return
            }
            setMerchantFromConfiguration(data)
          })
        } else {
          history.push("/")
        }
        setLoading(false)
      })


    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ id, orderId, activeStep ])

  return (
    <>
      <Steps statusLabel={ statusLabel } activeStep={ activeStep } steps={ steps }/>
      { lastValidPurchaseDateTime && isAllowedPathForTimer(window?.location?.pathname) ?
        <Timer
          expiryTimestamp={ lastValidPurchaseDateTime }
          text={ t('timer.time-to-pay-text') }
        >
          <Notification className="error-notification" label={ t("timer.error.payment-time-ended.header") }
                        type="error">
            <div className={'wrapper'}>
              { t("timer.error.payment-time-ended.message") }
            </div>
            <a
              href={'/'}
              className={'text-bold text-underline'}
              onClick={event => {
                event.preventDefault()
                getCancelUrlAndRedirectBackToService()
              }}
            >
              {t("timer.error.payment-time-ended.redirect-text")}
            </a>
          </Notification>
          {/*  TODO add back to start*/ }

        </Timer>
        :
        null
      }
      <ToastContainer/>
      { !loading && props.children }
    </>
  )
}

export default StepContainer

import { paymentApiUrl, paytrailApiUrl } from "../../constants"
import { axiosAuth } from "../../utils/axiosAuth"
import { PaytrailCardFormParameters } from "../../types/paytrail/paytrailCard"

export const useUpdateCardFormParameters = () => {

  const redirectToPaytrailUpdateCardForm = async (orderId: string) => {
    const response = await axiosAuth.get<PaytrailCardFormParameters>(`${ paymentApiUrl }${ orderId }/updateCardFormParameters`)

    if (response.data != null) {
      const paytrailForm = document.createElement('form')

      paytrailForm.setAttribute('method', 'POST')
      paytrailForm.setAttribute('action', `${ paytrailApiUrl }/tokenization/addcard-form`)
      paytrailForm.setAttribute('hidden', 'true')

      for (const [ key, value ] of Object.entries(response.data)) {
        const inputElement = document.createElement('input')
        inputElement.setAttribute('type', 'hidden')
        inputElement.setAttribute('name', key)
        inputElement.setAttribute('value', value)
        paytrailForm.appendChild(inputElement)
      }

      document.body.appendChild(paytrailForm)
      paytrailForm.submit()
    }
    return response.data
  }

  return {
    redirectToPaytrailUpdateCardForm
  }
}

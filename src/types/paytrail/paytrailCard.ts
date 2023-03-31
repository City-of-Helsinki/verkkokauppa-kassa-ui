export interface PaytrailCardFormParameters {
  'checkout-account': number
  'checkout-algorithm': string
  'checkout-method': string
  'checkout-nonce': string
  'checkout-timestamp': string
  'checkout-redirect-success-url': string
  'checkout-redirect-cancel-url': string
  'checkout-callback-success-url': string
  'checkout-callback-cancel-url': string
  signature: string
  language: string
}

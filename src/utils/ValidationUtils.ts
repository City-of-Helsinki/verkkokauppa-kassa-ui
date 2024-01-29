import { FinnishBusinessIds } from 'finnish-business-ids'

export function requiredEnv(env: string) {
  throw new TypeError(`The ${ env } environment variable is strictly required.`);
}

/**
 * Validate Finnish Party Identification number (OVT-tunnus).
 *
 * The Finnish Party Identification number (OVT-tunnus) is a 12-17
 * digit number and it is generated from Business ID.
 *
 * Example: 0037AAAAAAAABBBBB, 0037 indicates Finland, AAAAAAAA is the
 * Business ID and BBBBB is optional organization number.
 * Test value: 003715728600
 *
 * @param partyId
 */
export const validatePartyId = (partyId: string) => {

  const regex = /^[0-9]{12,17}$/

  if (regex.test(partyId)) {
    const countryCode = partyId.substr(0, 4)
    const controlNum = partyId.substr(11, 1)
    const businessNum = partyId.substr(4, 7)
    const businessId = `${ businessNum }-${ controlNum }`
    if (countryCode === '0037' && FinnishBusinessIds.isValidBusinessId(businessId)) {
      return true
    }
  }
  return false
}
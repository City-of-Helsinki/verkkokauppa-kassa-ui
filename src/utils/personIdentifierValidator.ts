import { FinnishSsnValidator } from "./finnishSsnValidator";
import { FinnishAuthenticatorUidValidator } from "./finnishAuthenticatorUidValidator";

export class PersonIdentifierValidator {
  static isValid(identifier: string): boolean {
    return (
      FinnishSsnValidator.isValid(identifier) ||
      FinnishAuthenticatorUidValidator.isValid(identifier)
    );
  }
}

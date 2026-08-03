export class FinnishAuthenticatorUidValidator {
  private static readonly UID_REGEX = /^[56].{9}$/;

  static isValid(uid: string): boolean {
    return this.UID_REGEX.test(uid);
  }
}

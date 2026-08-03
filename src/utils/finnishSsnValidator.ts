export class FinnishSsnValidator {
  private static readonly CHECKSUM = "0123456789ABCDEFHJKLMNPRSTUVWXY";

  static isValid(ssn: string): boolean {
    if (!/^\d{6}[+-A]\d{3}[0-9A-Y]$/.test(ssn)) {
      return false;
    }

    const day = Number(ssn.substring(0, 2));
    const month = Number(ssn.substring(2, 4));
    const year = Number(ssn.substring(4, 6));
    const century = ssn[6];
    const individual = ssn.substring(7, 10);
    const checksum = ssn[10];

    const fullYear =
      century === "+"
        ? 1800 + year
        : century === "-"
          ? 1900 + year
          : 2000 + year;

    const date = new Date(fullYear, month - 1, day);

    if (
      date.getFullYear() !== fullYear ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }

    const number = `${ssn.substring(0, 6)}${individual}`;
    const expected = FinnishSsnValidator.CHECKSUM[Number(number) % 31];

    return checksum === expected;
  }
}

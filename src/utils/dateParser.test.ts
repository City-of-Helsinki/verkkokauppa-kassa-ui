import { dateParser } from './dateParser'; // Adjust the path as necessary

describe('dateParser', () => {
  it('should parse the date string correctly and return a formatted date-time string', () => {
    // Input values
    const inputDate = '20250109-151715';
    const inputTimezone = 'Europe/Berlin';

    // Expected output for the given timezone
    const expectedOutput = new Date(Date.UTC(2025, 0, 9, 15, 17, 15))
      .toLocaleDateString('de-DE', {
        timeZone: inputTimezone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }) + ' ' + new Date(Date.UTC(2025, 0, 9, 15, 17, 15))
      .toLocaleTimeString('de-DE', {
        timeZone: inputTimezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

    // Call the function with the input values
    const result = dateParser(inputDate, inputTimezone);

    // Assertion
    expect(result).toBe(expectedOutput);
  });

  it('should handle different timezones correctly', () => {
    const inputDate = '20250109-151715';
    const inputTimezone = 'America/New_York';

    const expectedOutput = new Date(Date.UTC(2025, 0, 9, 15, 17, 15))
      .toLocaleDateString('de-DE', {
        timeZone: inputTimezone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }) + ' ' + new Date(Date.UTC(2025, 0, 9, 15, 17, 15))
      .toLocaleTimeString('de-DE', {
        timeZone: inputTimezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

    const result = dateParser(inputDate, inputTimezone);

    expect(result).toBe(expectedOutput);
  });
});

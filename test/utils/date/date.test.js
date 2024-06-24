const {
  getFormatDate,
  getTimezoneOfDate,
  isValidDateFormat,
  isValidISO8601,
} = require('../../../src/utils/functions/date');
const timeZone = 'America/Santiago';

describe('date functions', () => {
  test('get Date UTC valid ISO8601 null params', () => {
    const date = getFormatDate();
    console.log('Formatted Date (null params):', date);
    expect(isValidISO8601(date)).toBeTruthy();
  });

  test('get Date UTC-5 valid ISO8601, default format is ISO8601', () => {
    const date = getFormatDate(null, 'America/Bogota');
    console.log('Formatted Date (UTC-5):', date);
    expect(isValidISO8601(date)).toBeTruthy();
    expect(getTimezoneOfDate(date, 'America/Bogota')).toBe('America/Bogota');
  });

  test('get string date and return ISO8601', () => {
    const testDate = '2024-06-16T14:30:00';
    const date = getFormatDate(testDate);
    console.log('Formatted Date (string date):', date);
    expect(isValidISO8601(date)).toBeTruthy();
  });

  test('get string date with format', () => {
    const format = 'YYYY-MM-DDTHH:mm:ss';
    const testDate = '2024-06-16T14:30:00';
    const date = getFormatDate(testDate, timeZone, format);
    console.log('Formatted Date (with format):', date);
    expect(isValidISO8601(date)).toBeTruthy();
    expect(getTimezoneOfDate(date, timeZone)).toBe(timeZone);
  });

  test('get format date in YYYY-MM-DD', () => {
    const format = 'YYYY-MM-DD';
    const testDate = '2024-06-16T14:30:00';
    const date = getFormatDate(testDate, null, format);
    console.log('Formatted Date:', date);
    expect(isValidDateFormat(date)).toBeTruthy();
  });
});

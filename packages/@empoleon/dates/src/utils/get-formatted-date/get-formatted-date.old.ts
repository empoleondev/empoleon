import 'dayjs/locale/ru';

import { DateFormatter, getFormattedDate } from './get-formatted-date';

const TEST_DATES = ['2021-09-13', '2021-10-08'];
const customFormatter: DateFormatter = ({ date }) =>
  typeof date === 'string' ? new Date(date).toISOString() : '';

describe('@empoleon/dates/get-formatted-date', () => {
  it('formats default date type with given format', () => {
    expect(
      getFormattedDate({
        type: 'default',
        date: TEST_DATES[0],
        locale: 'en',
        format: 'MM/DD/YYYY',
        labelSeparator: ' - ',
      })
    ).toBe('09/13/2021');
  });

  it('formats multiple date type with given format', () => {
    expect(
      getFormattedDate({
        type: 'multiple',
        date: TEST_DATES,
        locale: 'en',
        format: 'MM/DD/YYYY',
        labelSeparator: ' - ',
      })
    ).toBe('09/13/2021, 10/08/2021');
  });

  it('formats range date type with given format', () => {
    expect(
      getFormattedDate({
        type: 'range',
        date: TEST_DATES,
        locale: 'en',
        format: 'MM/DD/YYYY',
        labelSeparator: '–',
      })
    ).toBe('09/13/2021 – 10/08/2021');
  });

  it('formats range date type with given format and empty second date', () => {
    expect(
      getFormattedDate({
        type: 'range',
        date: [TEST_DATES[0], null],
        locale: 'en',
        format: 'MM/DD/YYYY',
        labelSeparator: '–',
      })
    ).toBe('09/13/2021 – ');
  });

  it('supports localization', () => {
    expect(
      getFormattedDate({
        type: 'default',
        date: TEST_DATES[0],
        locale: 'ru',
        format: 'DD MMMM YYYY',
        labelSeparator: '–',
      })
    ).toBe('13 сентября 2021');
  });

  it('supports custom formatter', () => {
    expect(
      getFormattedDate({
        type: 'default',
        date: TEST_DATES[0],
        locale: 'en',
        format: 'MM/DD/YYYY',
        labelSeparator: '–',
        formatter: customFormatter,
      })
    ).toBe(new Date(TEST_DATES[0]).toISOString());
  });
});

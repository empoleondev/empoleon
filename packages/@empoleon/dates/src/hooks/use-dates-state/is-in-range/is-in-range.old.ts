import dayjs from 'dayjs';
import { isInRange } from './is-in-range';

type DateRange = [string, string];

const sortedRange: DateRange = ['2023-04-01', '2023-04-06'];
const unsortedRange: DateRange = [sortedRange[1], sortedRange[0]];
const sameDateRange: DateRange = [sortedRange[0], sortedRange[0]];

describe('@empoleon/dates/hooks/use-dates-state/is-in-range', () => {
  // Sorted range
  it('returns false for dates well before the sorted range', () => {
    expect(
      isInRange(dayjs(sortedRange[0]).subtract(1, 'day').format('YYYY-MM-DD'), sortedRange)
    ).toBe(false);
  });

  it('returns false for dates just before the sorted range', () => {
    expect(
      isInRange(
        dayjs(sortedRange[0]).startOf('day').subtract(1, 'ms').format('YYYY-MM-DD'),
        sortedRange
      )
    ).toBe(false);
  });

  it('returns true for dates at the start of the sorted range', () => {
    expect(isInRange(dayjs(sortedRange[0]).startOf('day').format('YYYY-MM-DD'), sortedRange)).toBe(
      true
    );
  });

  it('returns true for dates within the sorted range', () => {
    expect(isInRange(dayjs(sortedRange[0]).add(1, 'day').format('YYYY-MM-DD'), sortedRange)).toBe(
      true
    );
  });

  it('returns true for dates at the end of the sorted range', () => {
    expect(isInRange(dayjs(sortedRange[1]).endOf('day').format('YYYY-MM-DD'), sortedRange)).toBe(
      true
    );
  });

  it('returns false for dates just after the sorted range', () => {
    expect(
      isInRange(dayjs(sortedRange[1]).endOf('day').add(1, 'ms').format('YYYY-MM-DD'), sortedRange)
    ).toBe(false);
  });

  it('returns false for dates well after the sorted range', () => {
    expect(isInRange(dayjs(sortedRange[1]).add(1, 'day').format('YYYY-MM-DD'), sortedRange)).toBe(
      false
    );
  });

  // Unsorted range
  // These tests might be removed if sorting of dates would be extracted to a separate utility
  it('returns false for dates well before the unsorted range', () => {
    expect(
      isInRange(dayjs(sortedRange[0]).subtract(1, 'day').format('YYYY-MM-DD'), unsortedRange)
    ).toBe(false);
  });

  it('returns false for dates just before the unsorted range', () => {
    expect(
      isInRange(
        dayjs(sortedRange[0]).startOf('day').subtract(1, 'ms').format('YYYY-MM-DD'),
        unsortedRange
      )
    ).toBe(false);
  });

  it('returns true for dates at the start of the unsorted range', () => {
    expect(
      isInRange(dayjs(sortedRange[0]).startOf('day').format('YYYY-MM-DD'), unsortedRange)
    ).toBe(true);
  });

  it('returns true for dates within the unsorted range', () => {
    expect(isInRange(dayjs(sortedRange[0]).add(1, 'day').format('YYYY-MM-DD'), unsortedRange)).toBe(
      true
    );
  });

  it('returns true for dates at the end of the unsorted range', () => {
    expect(isInRange(dayjs(sortedRange[1]).endOf('day').format('YYYY-MM-DD'), unsortedRange)).toBe(
      true
    );
  });

  it('returns false for dates just after the unsorted range', () => {
    expect(
      isInRange(dayjs(sortedRange[1]).endOf('day').add(1, 'ms').format('YYYY-MM-DD'), unsortedRange)
    ).toBe(false);
  });

  it('returns false for dates well after the unsorted range', () => {
    expect(isInRange(dayjs(sortedRange[1]).add(1, 'day').format('YYYY-MM-DD'), unsortedRange)).toBe(
      false
    );
  });

  // Same date range
  it('returns false for dates well before the same date range', () => {
    expect(
      isInRange(dayjs(sameDateRange[0]).subtract(1, 'day').format('YYYY-MM-DD'), sameDateRange)
    ).toBe(false);
  });

  it('returns false for dates just before the same date range', () => {
    expect(
      isInRange(
        dayjs(sameDateRange[0]).startOf('day').subtract(1, 'ms').format('YYYY-MM-DD'),
        sameDateRange
      )
    ).toBe(false);
  });

  it('returns true for the date at the start same date range', () => {
    expect(
      isInRange(dayjs(sameDateRange[0]).startOf('day').format('YYYY-MM-DD'), sameDateRange)
    ).toBe(true);
  });

  it('returns false for dates just after the same date range', () => {
    expect(
      isInRange(
        dayjs(sameDateRange[1]).endOf('day').add(1, 'ms').format('YYYY-MM-DD'),
        sameDateRange
      )
    ).toBe(false);
  });

  it('returns false for dates well after the same date range', () => {
    expect(
      isInRange(dayjs(sameDateRange[1]).add(1, 'day').format('YYYY-MM-DD'), sameDateRange)
    ).toBe(false);
  });
});

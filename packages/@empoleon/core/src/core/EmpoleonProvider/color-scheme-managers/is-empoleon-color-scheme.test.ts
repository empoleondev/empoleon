import { isEmpoleonColorScheme } from './is-empoleon-color-scheme';

describe('@empoleon/core/EmpoleonProvider/is-empoleon-color-scheme', () => {
  it('returns true for valid color schemes', () => {
    expect(isEmpoleonColorScheme('auto')).toBe(true);
    expect(isEmpoleonColorScheme('dark')).toBe(true);
    expect(isEmpoleonColorScheme('light')).toBe(true);
  });

  it('returns false for invalid color schemes', () => {
    expect(isEmpoleonColorScheme('')).toBe(false);
    expect(isEmpoleonColorScheme('invalid')).toBe(false);
  });
});

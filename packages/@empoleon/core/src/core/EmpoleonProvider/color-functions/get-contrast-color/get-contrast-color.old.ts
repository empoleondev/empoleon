import { DEFAULT_THEME } from '../../default-theme';
import { getContrastColor } from './get-contrast-color';

describe('@empoleon/core/get-contrast-color', () => {
  it('returns correct contrast color', () => {
    expect(getContrastColor({ color: 'blue', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--empoleon-color-white)'
    );
    expect(getContrastColor({ color: 'red', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--empoleon-color-white)'
    );
    expect(getContrastColor({ color: 'yellow.4', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--empoleon-color-black)'
    );
    expect(getContrastColor({ color: 'blue.1', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--empoleon-color-black)'
    );
    expect(getContrastColor({ color: 'lime.5', theme: DEFAULT_THEME, autoContrast: true })).toBe(
      'var(--empoleon-color-black)'
    );
  });

  it('always returns white when autoContrast is false', () => {
    expect(getContrastColor({ color: 'blue', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--empoleon-color-white)'
    );
    expect(getContrastColor({ color: 'red', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--empoleon-color-white)'
    );
    expect(getContrastColor({ color: 'yellow.4', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--empoleon-color-white)'
    );
    expect(getContrastColor({ color: 'blue.1', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--empoleon-color-white)'
    );
    expect(getContrastColor({ color: 'lime.5', theme: DEFAULT_THEME, autoContrast: false })).toBe(
      'var(--empoleon-color-white)'
    );
  });
});

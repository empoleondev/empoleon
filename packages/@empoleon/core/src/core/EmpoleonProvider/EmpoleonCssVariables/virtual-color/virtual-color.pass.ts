import { DEFAULT_THEME } from '../../default-theme';
import { isVirtualColor, virtualColor } from './virtual-color';

describe('@empoleon/core/virtual-color', () => {
  it('creates virtual color object', () => {
    expect(virtualColor({ name: 'test', dark: 'dark', light: 'light' })).toStrictEqual([
      'var(--empoleon-color-test-0)',
      'var(--empoleon-color-test-1)',
      'var(--empoleon-color-test-2)',
      'var(--empoleon-color-test-3)',
      'var(--empoleon-color-test-4)',
      'var(--empoleon-color-test-5)',
      'var(--empoleon-color-test-6)',
      'var(--empoleon-color-test-7)',
      'var(--empoleon-color-test-8)',
      'var(--empoleon-color-test-9)',
    ]);

    expect(virtualColor({ name: 'test', dark: 'dark', light: 'light' })).toHaveProperty(
      'dark',
      'dark'
    );
    expect(virtualColor({ name: 'test', dark: 'dark', light: 'light' })).toHaveProperty(
      'light',
      'light'
    );
  });

  it('correctly detects virtual color object', () => {
    expect(isVirtualColor(virtualColor({ name: 'test', dark: 'dark', light: 'light' }))).toBe(true);
    expect(isVirtualColor(DEFAULT_THEME.colors.blue)).toBe(false);
  });
});

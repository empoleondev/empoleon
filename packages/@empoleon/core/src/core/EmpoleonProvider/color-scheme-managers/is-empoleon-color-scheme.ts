import type { EmpoleonColorScheme } from '../theme.types';

export function isEmpoleonColorScheme(value: unknown): value is EmpoleonColorScheme {
  return value === 'auto' || value === 'dark' || value === 'light';
}

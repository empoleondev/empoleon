import type { EmpoleonTheme } from '../../theme.types';
import { getPrimaryShade } from '../get-primary-shade/get-primary-shade';
import { parseThemeColor } from '../parse-theme-color/parse-theme-color';

interface GetContrastColorInput {
  color: string | null | undefined;
  theme: EmpoleonTheme;
  autoContrast?: boolean | undefined | null;
}

export function getContrastColor({ color, theme, autoContrast }: GetContrastColorInput) {
  const _autoContrast = typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast;

  if (!_autoContrast) {
    return 'var(--empoleon-color-white)';
  }

  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.isLight ? 'var(--empoleon-color-black)' : 'var(--empoleon-color-white)';
}

export function getPrimaryContrastColor(theme: EmpoleonTheme, colorScheme: 'light' | 'dark') {
  return getContrastColor({
    color: theme.colors[theme.primaryColor][getPrimaryShade(theme, colorScheme)],
    theme,
    autoContrast: null,
  });
}

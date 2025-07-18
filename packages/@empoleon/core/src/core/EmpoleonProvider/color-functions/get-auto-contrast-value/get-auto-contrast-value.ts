import type { EmpoleonTheme } from '../../theme.types';

export function getAutoContrastValue(autoContrast: boolean | undefined, theme: EmpoleonTheme) {
  return typeof autoContrast === 'boolean' ? autoContrast : theme.autoContrast;
}

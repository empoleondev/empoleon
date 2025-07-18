import type { EmpoleonColorScheme, EmpoleonTheme } from '../../theme.types';

export function getPrimaryShade(theme: EmpoleonTheme, colorScheme: EmpoleonColorScheme) {
  if (typeof theme.primaryShade === 'number') {
    return theme.primaryShade;
  }

  if (colorScheme === 'dark') {
    return theme.primaryShade.dark;
  }

  return theme.primaryShade.light;
}

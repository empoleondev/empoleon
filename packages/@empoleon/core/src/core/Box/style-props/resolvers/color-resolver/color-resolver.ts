import { EmpoleonTheme, parseThemeColor } from '../../../../EmpoleonProvider';

export function colorResolver(color: unknown, theme: EmpoleonTheme) {
  const parsedColor = parseThemeColor({ color, theme });

  if (parsedColor.color === 'dimmed') {
    return 'var(--empoleon-color-dimmed)';
  }

  if (parsedColor.color === 'bright') {
    return 'var(--empoleon-color-bright)';
  }
  return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}

export function textColorResolver(color: unknown, theme: EmpoleonTheme) {
  const parsedColor = parseThemeColor({ color, theme });

  if (parsedColor.isThemeColor && parsedColor.shade === undefined) {
    return `var(--empoleon-color-${parsedColor.color}-text)`;
  }

  return colorResolver(color, theme);
}

import { EmpoleonColor, EmpoleonTheme, parseThemeColor } from '../../core';

interface GetMarkColorInput {
  color: EmpoleonColor | string | undefined;
  theme: EmpoleonTheme;
  defaultShade: number;
}

export function getMarkColor({ color, theme, defaultShade }: GetMarkColorInput) {
  const parsed = parseThemeColor({ color, theme });

  if (!parsed.isThemeColor) {
    return color;
  }

  if (parsed.shade === undefined) {
    return `var(--empoleon-color-${parsed.color}-${defaultShade})`;
  }

  return `var(${parsed.variable})`;
}

import { EmpoleonColor, EmpoleonTheme, parseThemeColor } from '../../core';

interface GetMarkColorInput {
  color: EmpoleonColor | string | undefined;
  theme: EmpoleonTheme;
  defaultShade: number;
}

export function getMarkColor(props: GetMarkColorInput) {
  const parsed = parseThemeColor({ color: props.color, theme: props.theme });

  if (!parsed.isThemeColor) {
    return props.color;
  }

  if (parsed.shade === undefined) {
    return `var(--empoleon-color-${parsed.color}-${props.defaultShade})`;
  }

  return `var(${parsed.variable})`;
}

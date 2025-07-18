import { JSX } from 'solid-js';
import { EmpoleonStyleProp } from '../../../../Box';
import { EmpoleonTheme } from '../../../../EmpoleonProvider';

interface ResolveStyleInput {
  style: EmpoleonStyleProp | undefined;
  theme: EmpoleonTheme;
}

export function resolveStyle({ style, theme }: ResolveStyleInput): JSX.CSSProperties {
  if (Array.isArray(style)) {
    return [...style].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {}
    );
  }

  if (typeof style === 'function') {
    return style(theme);
  }

  if (style == null) {
    return {};
  }

  return style;
}

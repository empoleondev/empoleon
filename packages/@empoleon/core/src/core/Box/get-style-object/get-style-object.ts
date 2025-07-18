import { JSX } from 'solid-js';
import type { EmpoleonTheme } from '../../EmpoleonProvider';
import type { EmpoleonStyleProp } from '../Box.types';

export function getStyleObject(
  style: EmpoleonStyleProp | undefined,
  theme: EmpoleonTheme
): JSX.CSSProperties {
  if (Array.isArray(style)) {
    return [...style].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...getStyleObject(item, theme) }),
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

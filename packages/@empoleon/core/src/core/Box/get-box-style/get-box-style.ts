import { JSX } from 'solid-js';
import type { EmpoleonTheme } from '../../EmpoleonProvider';
import type { CssVarsProp, EmpoleonStyleProp } from '../Box.types';

interface GetBoxStyleOptions {
  theme: EmpoleonTheme;
  styleProps: JSX.CSSProperties;
  style?: EmpoleonStyleProp;
  vars?: CssVarsProp;
}

function mergeStyles(
  styles: EmpoleonStyleProp | CssVarsProp | undefined,
  theme: EmpoleonTheme
): JSX.CSSProperties {
  if (Array.isArray(styles)) {
    return [...styles].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...mergeStyles(item, theme) }),
      {}
    );
  }

  if (typeof styles === 'function') {
    return styles(theme);
  }

  if (styles == null) {
    return {};
  }

  return styles;
}

export function getBoxStyle({
  theme,
  style,
  vars,
  styleProps,
}: GetBoxStyleOptions): JSX.CSSProperties {
  const _style = mergeStyles(style, theme);
  const _vars = mergeStyles(vars, theme);
  return { ..._style, ..._vars, ...styleProps };
}

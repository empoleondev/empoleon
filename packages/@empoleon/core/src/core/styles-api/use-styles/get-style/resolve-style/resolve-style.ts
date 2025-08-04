import { JSX } from 'solid-js';
import { EmpoleonStyleProp } from '../../../../Box';
import { EmpoleonTheme } from '../../../../EmpoleonProvider';

interface ResolveStyleInput {
  style: EmpoleonStyleProp | undefined;
  theme: EmpoleonTheme;
}

export function resolveStyle(props: ResolveStyleInput): JSX.CSSProperties {
  if (Array.isArray(props.style)) {
    return [...props.style].reduce<Record<string, any>>(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme: props.theme }) }),
      {}
    );
  }

  if (typeof props.style === 'function') {
    return props.style(props.theme);
  }

  if (props.style == null) {
    return {};
  }

  return props.style;
}

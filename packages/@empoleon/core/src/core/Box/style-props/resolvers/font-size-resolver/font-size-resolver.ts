import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import { rem } from '../../../../utils';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export function fontSizeResolver(value: unknown, theme: EmpoleonTheme) {
  if (typeof value === 'string' && value in theme.fontSizes) {
    return `var(--empoleon-font-size-${value})`;
  }

  if (typeof value === 'string' && headings.includes(value)) {
    return `var(--empoleon-${value}-font-size)`;
  }

  if (typeof value === 'number') {
    return rem(value);
  }

  if (typeof value === 'string') {
    return rem(value);
  }

  return value;
}

import { EmpoleonTheme } from '../../../../EmpoleonProvider';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export function lineHeightResolver(value: unknown, theme: EmpoleonTheme) {
  if (typeof value === 'string' && value in theme.lineHeights) {
    return `var(--empoleon-line-height-${value})`;
  }

  if (typeof value === 'string' && headings.includes(value)) {
    return `var(--empoleon-${value}-line-height)`;
  }

  return value;
}

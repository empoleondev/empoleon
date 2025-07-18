import { rem } from '../../core';
import type { TitleOrder, TitleSize } from './Title';

const headings: unknown[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const sizes: unknown[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export interface GetTitleSizeResult {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

export function getTitleSize(order: TitleOrder, size?: TitleSize): GetTitleSizeResult {
  const titleSize = size !== undefined ? size : `h${order}`;

  if (headings.includes(titleSize)) {
    return {
      fontSize: `var(--empoleon-${titleSize}-font-size)`,
      fontWeight: `var(--empoleon-${titleSize}-font-weight)`,
      lineHeight: `var(--empoleon-${titleSize}-line-height)`,
    };
  } else if (sizes.includes(titleSize)) {
    return {
      fontSize: `var(--empoleon-font-size-${titleSize})`,
      fontWeight: `var(--empoleon-h${order}-font-weight)`,
      lineHeight: `var(--empoleon-h${order}-line-height)`,
    };
  }

  return {
    fontSize: rem(titleSize),
    fontWeight: `var(--empoleon-h${order}-font-weight)`,
    lineHeight: `var(--empoleon-h${order}-line-height)`,
  };
}

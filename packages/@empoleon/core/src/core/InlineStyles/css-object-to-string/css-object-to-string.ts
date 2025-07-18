import { JSX } from 'solid-js';
import { camelToKebabCase, keys } from '../../utils';

export function cssObjectToString(css: JSX.CSSProperties) {
  return keys(css)
    .reduce(
      (acc, rule) =>
        css[rule] !== undefined ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
      ''
    )
    .trim();
}

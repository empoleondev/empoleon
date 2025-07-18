import { JSX, splitProps } from 'solid-js';
import { cssObjectToString } from '../css-object-to-string/css-object-to-string';

export interface InlineStylesMediaQuery {
  query: string;
  styles: JSX.CSSProperties;
}

export interface InlineStylesInput {
  selector: string;
  styles?: JSX.CSSProperties;
  media?: InlineStylesMediaQuery[];
  container?: InlineStylesMediaQuery[];
}

export function stylesToString(props: InlineStylesInput) {
  const [local] = splitProps(props, [
    'selector',
    'styles',
    'media',
    'container'
  ]);

  const baseStyles = local.styles ? cssObjectToString(local.styles) : '';
  const mediaQueryStyles = !Array.isArray(local.media)
    ? []
    : local.media.map((item) => `@media${item.query}{${local.selector}{${cssObjectToString(item.styles)}}}`);

  const containerStyles = !Array.isArray(local.container)
    ? []
    : local.container.map(
        (item) => `@container ${item.query}{${local.selector}{${cssObjectToString(item.styles)}}}`
      );

  return `${baseStyles ? `${local.selector}{${baseStyles}}` : ''}${mediaQueryStyles.join('')}${containerStyles.join('')}`.trim();
}

import { For, splitProps, JSX } from 'solid-js';
import {
  EmpoleonColor,
  EmpoleonTheme,
  polymorphicFactory,
  PolymorphicFactory,
  useProps,
} from '../../core';
import { Mark } from '../Mark';
import { Text, TextProps, TextStylesNames, TextVariant } from '../Text';
import { highlighter } from './highlighter/highlighter';

export interface HighlightProps extends Omit<TextProps, 'color'> {
  /** Substring or an array of substrings to highlight in `children` */
  highlight: string | string[];

  /** Key of `theme.colors` or any valid CSS color, passed to `Mark` component `color` prop, `yellow` by default */
  color?: EmpoleonColor | string;

  /** Styles applied to `mark` elements */
  highlightStyles?: JSX.CSSProperties | ((theme: EmpoleonTheme) => JSX.CSSProperties);

  /** String parts of which must be highlighted */
  children: string;
}

export type HighlightFactory = PolymorphicFactory<{
  props: HighlightProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: TextStylesNames;
  variant: TextVariant;
}>;

const defaultProps: Partial<HighlightProps> = {};

export const Highlight = polymorphicFactory<HighlightFactory>(_props => {
  const props = useProps('Highlight', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'unstyled',
    'children',
    'highlight',
    'highlightStyles',
    'color',
    'ref'
  ]);

  const highlightChunks = highlighter(local.children, local.highlight);

  return (
    <Text unstyled={local.unstyled} ref={local.ref} {...others} __staticSelector="Highlight">
      <For each={highlightChunks}>
        {(item, i) =>
          item.highlighted ? (
            <Mark
              unstyled={local.unstyled}
              color={local.color}
              style={local.highlightStyles}
              data-highlight={item.chunk}
            >
              {item.chunk}
            </Mark>
          ) : (
            <span>{item.chunk}</span>
          )
        }
      </For>
    </Text>
  );
});

Highlight.classes = Text.classes;
Highlight.displayName = '@empoleon/core/Highlight';

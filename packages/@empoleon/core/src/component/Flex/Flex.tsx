import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  filterProps,
  InlineStyles,
  EmpoleonSpacing,
  parseStyleProps,
  polymorphicFactory,
  PolymorphicFactory,
  StyleProp,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useRandomClassName,
  useStyles,
} from '../../core';
import { FLEX_STYLE_PROPS_DATA } from './flex-props';
import classes from './Flex.module.css';

export type FlexStylesNames = 'root';

export interface FlexProps extends BoxProps, StylesApiProps<FlexFactory>, ElementProps<'div'> {
  /** `gap` CSS property */
  gap?: StyleProp<EmpoleonSpacing>;

  /** `row-gap` CSS property */
  rowGap?: StyleProp<EmpoleonSpacing>;

  /** `column-gap` CSS property */
  columnGap?: StyleProp<EmpoleonSpacing>;

  /** `align-items` CSS property */
  align?: StyleProp<JSX.CSSProperties['align-items']>;

  /** `justify-content` CSS property */
  justify?: StyleProp<JSX.CSSProperties['justify-content']>;

  /** `flex-wrap` CSS property */
  wrap?: StyleProp<JSX.CSSProperties['flex-wrap']>;

  /** `flex-direction` CSS property */
  direction?: StyleProp<JSX.CSSProperties['flex-direction']>;
}

export type FlexFactory = PolymorphicFactory<{
  props: FlexProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: FlexStylesNames;
}>;

const defaultProps: Partial<FlexProps> = {};

export const Flex = polymorphicFactory<FlexFactory>(_props => {
  const props = useProps('Flex', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'gap',
    'rowGap',
    'columnGap',
    'align',
    'justify',
    'wrap',
    'direction',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<FlexFactory>({
    name: 'Flex',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
  });

  const theme = useEmpoleonTheme();
  const responsiveClassName = useRandomClassName();
  const parsedStyleProps = () => parseStyleProps({
    styleProps: {
      gap: local.gap,
      rowGap: local.rowGap,
      columnGap: local.columnGap,
      align: local.align,
      justify: local.justify,
      wrap: local.wrap,
      direction: local.direction
    },
    theme,
    data: FLEX_STYLE_PROPS_DATA,
  });

  return (
    <>
      {parsedStyleProps().hasResponsiveStyles && (
        <InlineStyles
          selector={`.${responsiveClassName}`}
          styles={parsedStyleProps().styles}
          media={parsedStyleProps().media}
        />
      )}
      <Box
        ref={local.ref}
        {...getStyles('root', {
          className: responsiveClassName,
          style: filterProps(parsedStyleProps().inlineStyles),
        })}
        {...others}
      />
    </>
  );
});

Flex.classes = classes;
Flex.displayName = '@empoleon/core/Flex';

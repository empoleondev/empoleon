import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  EmpoleonFontSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { getTitleSize } from './get-title-size';
import classes from './Title.module.css';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = `h${TitleOrder}` | JSX.CSSProperties['font-size'] | EmpoleonFontSize;

export type TitleStylesNames = 'root';
export type TitleCssVariables = {
  root: '--title-fw' | '--title-lh' | '--title-fz' | '--title-line-clamp' | '--title-text-wrap';
};

export interface TitleProps
  extends BoxProps,
    StylesApiProps<TitleFactory>,
    ElementProps<'h1', 'color'> {
  /** Determines which tag will be used (h1-h6), controls `font-size` style if `size` prop is not set, `1` by default */
  order?: TitleOrder;

  /** Changes title size, if not set, then size is controlled by `order` prop */
  size?: TitleSize;

  /** Number of lines after which Text will be truncated */
  lineClamp?: number;

  /** Controls `text-wrap` property, `'wrap'` by default */
  textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty' | 'stable';
}

export type TitleFactory = Factory<{
  props: TitleProps;
  ref: HTMLHeadingElement;
  stylesNames: TitleStylesNames;
  vars: TitleCssVariables;
}>;

const defaultProps: Partial<TitleProps> = {
  order: 1,
};

const varsResolver = createVarsResolver<TitleFactory>((_, { order, size, lineClamp, textWrap }) => {
  const sizeVariables = getTitleSize(order!, size);
  return {
    root: {
      '--title-fw': sizeVariables.fontWeight,
      '--title-lh': sizeVariables.lineHeight,
      '--title-fz': sizeVariables.fontSize,
      '--title-line-clamp': typeof lineClamp === 'number' ? lineClamp.toString() : undefined,
      '--title-text-wrap': textWrap,
    },
  };
});

export const Title = factory<TitleFactory>(_props => {
  const props = useProps('Title', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'order',
    'vars',
    'size',
    'variant',
    'lineClamp',
    'textWrap',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<TitleFactory>({
    name: 'Title',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  if (![1, 2, 3, 4, 5, 6].includes(local.order!)) {
    return null;
  }

  return (
    <Box
      {...getStyles('root')}
      component={`h${local.order!}`}
      variant={local.variant}
      ref={local.ref}
      mod={[{ order: local.order, 'data-line-clamp': typeof local.lineClamp === 'number' }, local.mod]}
      size={local.size}
      {...others}
    />
  );
});

Title.classes = classes;
Title.displayName = '@empoleon/core/Title';

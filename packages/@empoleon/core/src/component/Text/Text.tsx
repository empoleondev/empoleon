import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getFontSize,
  getGradient,
  getLineHeight,
  getThemeColor,
  EmpoleonColor,
  EmpoleonFontSize,
  EmpoleonGradient,
  EmpoleonLineHeight,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Text.module.css';

type TextTruncate = 'end' | 'start' | boolean;

function getTextTruncate(truncate: TextTruncate | undefined) {
  if (truncate === 'start') {
    return 'start';
  }

  if (truncate === 'end' || truncate) {
    return 'end';
  }

  return undefined;
}

export type TextStylesNames = 'root';
export type TextVariant = 'text' | 'gradient';
export type TextCssVariables = {
  root: '--text-gradient' | '--text-line-clamp' | '--text-fz' | '--text-lh';
};

export interface TextProps extends BoxProps, StylesApiProps<TextFactory> {
  __staticSelector?: string;

  /** Controls `font-size` and `line-height`, `'md'` by default */
  size?: EmpoleonFontSize & EmpoleonLineHeight;

  /** Number of lines after which Text will be truncated */
  lineClamp?: number;

  /** Side on which Text must be truncated, if `true`, text is truncated from the start */
  truncate?: TextTruncate;

  /** Sets `line-height` to 1 for centering, `false` by default */
  inline?: boolean;

  /** Determines whether font properties should be inherited from the parent, `false` by default */
  inherit?: boolean;

  /** Gradient configuration, ignored when `variant` is not `gradient`, `theme.defaultGradient` by default */
  gradient?: EmpoleonGradient;

  /** Shorthand for `component="span"`, `false` by default, default root element is `p` */
  span?: boolean;

  /** @deprecated Use `c` prop instead */
  color?: EmpoleonColor;
}

export type TextFactory = PolymorphicFactory<{
  props: TextProps;
  defaultComponent: 'p';
  defaultRef: HTMLParagraphElement;
  stylesNames: TextStylesNames;
  vars: TextCssVariables;
  variant: TextVariant;
}>;

const defaultProps: Partial<TextProps> = {
  inherit: false,
};

const varsResolver = createVarsResolver<TextFactory>(
  (theme, props) => ({
    root: {
      '--text-fz': getFontSize(props.size),
      '--text-lh': getLineHeight(props.size),
      '--text-gradient': props.variant === 'gradient' ? getGradient(props.gradient, theme) : undefined,
      '--text-line-clamp': typeof props.lineClamp === 'number' ? props.lineClamp.toString() : undefined,
      '--text-color': props.color ? getThemeColor(props.color, theme) : undefined,
    },
  })
);

export const Text = polymorphicFactory<TextFactory>((_props) => {
  const props = useProps('Text', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'lineClamp',
    'truncate',
    'inline',
    'inherit',
    'gradient',
    'span',
    '__staticSelector',
    'vars',
    'className',
    'style',
    'classNames',
    'styles',
    'unstyled',
    'variant',
    'mod',
    'size',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<TextFactory>({
    name: ['Text', local.__staticSelector],
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  return (
    <Box
      {...getStyles('root', { focusable: true })}
      ref={local.ref}
      component={local.span ? 'span' : 'p'}
      variant={local.variant}
      mod={[
        {
          'data-truncate': getTextTruncate(local.truncate),
          'data-line-clamp': typeof local.lineClamp === 'number',
          'data-inline': local.inline,
          'data-inherit': local.inherit,
        },
        local.mod,
      ]}
      size={local.size}
      {...others}
    />
  );
});

Text.classes = classes;
Text.displayName = '@empoleon/core/Text';

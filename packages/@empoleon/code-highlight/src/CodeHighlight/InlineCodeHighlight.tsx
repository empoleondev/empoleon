import { splitProps } from 'solid-js';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonColor,
  EmpoleonRadius,
  factory,
  Factory,
  getRadius,
  getThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '@empoleon/core';
import { CodeHighlight } from './CodeHighlight';
import classes from '../CodeHighlight.module.css';

export type InlineCodeHighlightStylesNames = 'inlineCodeHighlight';
export type InlineCodeHighlightCssVariables = {
  inlineCodeHighlight: '--ch-background' | '--ch-radius';
};

export interface InlineCodeHighlightProps
  extends BoxProps,
    StylesApiProps<InlineCodeHighlightFactory>,
    ElementProps<'code'> {
  /** Code to highlight */
  code: string;

  /** Language of the code, used to determine syntax highlighting */
  language?: string;

  /** Controls background color of the code. By default, the value depends on color scheme. */
  background?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, `'sm'` by default */
  radius?: EmpoleonRadius;

  /** Determines whether the code should have a border, `false` by default */
  withBorder?: boolean;
}

export type InlineCodeHighlightFactory = Factory<{
  props: InlineCodeHighlightProps;
  ref: HTMLElement;
  stylesNames: InlineCodeHighlightStylesNames;
  vars: InlineCodeHighlightCssVariables;
}>;

const defaultProps: Partial<InlineCodeHighlightProps> = {};

const varsResolver = createVarsResolver<InlineCodeHighlightFactory>((theme, props) => ({
  inlineCodeHighlight: {
    '--ch-background': props.background ? getThemeColor(props.background, theme) : undefined,
    '--ch-radius': typeof props.radius !== 'undefined' ? getRadius(props.radius) : undefined,
  },
}));

export const InlineCodeHighlight = factory<InlineCodeHighlightFactory>((_props) => {
  const props = useProps('InlineCodeHighlight', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<InlineCodeHighlightFactory>({
    name: 'InlineCodeHighlight',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
    rootSelector: 'inlineCodeHighlight',
  });

  return (
    <CodeHighlight {...others} ref={local.ref} {...getStyles('inlineCodeHighlight')} __inline />
  );
});

InlineCodeHighlight.displayName = '@empoleon/code-highlight/InlineCodeHighlight';
InlineCodeHighlight.classes = classes;

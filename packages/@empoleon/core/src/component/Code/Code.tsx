import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getThemeColor,
  EmpoleonColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './Code.module.css';

export type CodeStylesNames = 'root';
export type CodeCssVariables = {
  root: '--code-bg';
};

export interface CodeProps extends BoxProps, StylesApiProps<CodeFactory>, ElementProps<'code'> {
  /** Key of `theme.colors` or any valid CSS color, controls `background-color` of the code, by default value is calculated based on color scheme */
  color?: EmpoleonColor;

  /** If set code will be rendered inside `pre`, `false` by default */
  block?: boolean;
}

export type CodeFactory = Factory<{
  props: CodeProps;
  ref: HTMLElement;
  stylesNames: CodeStylesNames;
  vars: CodeCssVariables;
}>;

const defaultProps: Partial<CodeProps> = {};

const varsResolver = createVarsResolver<CodeFactory>((theme, props) => ({
  root: {
    '--code-bg': props.color ? getThemeColor(props.color, theme) : undefined,
  },
}));

export const Code = factory<CodeFactory>(_props => {
  const props = useProps('Code', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'color',
    'block',
    'variant',
    'mod',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<CodeFactory>({
    name: 'Code',
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
      component={local.block ? 'pre' : 'code'}
      variant={local.variant}
      ref={local.ref}
      mod={[{ block: local.block }, local.mod]}
      {...getStyles('root')}
      {...others}
      dir="ltr"
    />
  );
});

Code.classes = classes;
Code.displayName = '@empoleon/core/Code';

import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  factory,
  Factory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import classes from '../Button.module.css';

export type ButtonGroupStylesNames = 'group';
export type ButtonGroupCssVariables = {
  group: '--button-border-width';
};

export interface ButtonGroupProps extends BoxProps, StylesApiProps<ButtonGroupFactory> {
  /** `Button` components */
  children?: JSX.Element;

  /** Orientation of the group, `horizontal` by default */
  orientation?: 'horizontal' | 'vertical';

  /** `border-width` of the child `Button` components. Numbers are converted to rem. Default value in `1`. */
  borderWidth?: number | string;
}

export type ButtonGroupFactory = Factory<{
  props: ButtonGroupProps;
  ref: HTMLDivElement;
  stylesNames: ButtonGroupStylesNames;
  vars: ButtonGroupCssVariables;
}>;

const defaultProps: Partial<ButtonGroupProps> = {
  orientation: 'horizontal',
};

const varsResolver = createVarsResolver<ButtonGroupFactory>((_, props) => ({
  group: { '--button-border-width': rem(props.borderWidth) },
}));

export const ButtonGroup = factory<ButtonGroupFactory>((_props) => {
  const props = useProps('ButtonGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'className',
    'style',
    'classNames',
    'styles',
    'unstyled',
    'orientation',
    'vars',
    'borderWidth',
    'variant',
    'mod',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<ButtonGroupFactory>({
    name: 'ButtonGroup',
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
    rootSelector: 'group',
  });

  return (
    <Box
      {...getStyles('group')}
      ref={local.ref}
      variant={local.variant}
      mod={[{ 'data-orientation': local.orientation }, local.mod]}
      role="group"
      {...others}
    />
  );
});

ButtonGroup.classes = classes;
ButtonGroup.displayName = '@empoleon/core/ButtonGroup';

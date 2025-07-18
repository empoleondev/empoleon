import { splitProps, JSX } from 'solid-js';
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
import classes from '../ActionIcon.module.css';

export type ActionIconGroupStylesNames = 'group';
export type ActionIconGroupCssVariables = {
  group: '--ai-border-width';
};

export interface ActionIconGroupProps extends BoxProps, StylesApiProps<ActionIconGroupFactory> {
  /** `ActionIcon` components only */
  children?: JSX.Element;

  /** Controls group orientation, `'horizontal'` by default */
  orientation?: 'horizontal' | 'vertical';

  /** `border-width` of the child `ActionIcon` components. Default value in `1` */
  borderWidth?: number | string;
}

export type ActionIconGroupFactory = Factory<{
  props: ActionIconGroupProps;
  ref: HTMLDivElement;
  stylesNames: ActionIconGroupStylesNames;
  vars: ActionIconGroupCssVariables;
}>;

const defaultProps: Partial<ActionIconGroupProps> = {
  orientation: 'horizontal',
};

const varsResolver = createVarsResolver<ActionIconGroupFactory>((_, { borderWidth }) => ({
  group: { '--ai-border-width': rem(borderWidth) },
}));

export const ActionIconGroup = factory<ActionIconGroupFactory>(_props => {
  const props = useProps('ActionIconGroup', defaultProps, _props);
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
    'ref'
  ]);

  const getStyles = useStyles<ActionIconGroupFactory>({
    name: 'ActionIconGroup',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
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

ActionIconGroup.classes = classes;
ActionIconGroup.displayName = '@empoleon/core/ActionIconGroup';

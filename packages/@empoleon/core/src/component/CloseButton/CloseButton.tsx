import { splitProps, JSX } from 'solid-js';
import {
  BoxProps,
  createVarsResolver,
  getRadius,
  getSize,
  EmpoleonRadius,
  EmpoleonSize,
  polymorphicFactory,
  PolymorphicFactory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { UnstyledButton } from '../UnstyledButton';
import { CloseIcon } from './CloseIcon';
import classes from './CloseButton.module.css';

export type CloseButtonVariant = 'subtle' | 'transparent';
export type CloseButtonStylesNames = 'root';
export type CloseButtonCssVariables = {
  root: '--cb-icon-size' | '--cb-size' | '--cb-radius';
};

export interface __CloseButtonProps {
  'data-disabled'?: boolean;

  /** Controls width and height of the button. Numbers are converted to rem. `'md'` by default. */
  size?: EmpoleonSize | (string & {}) | number;

  /** Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. `theme.defaultRadius` by default. */
  radius?: EmpoleonRadius;

  /** Sets `disabled` and `data-disabled` attributes on the button element */
  disabled?: boolean;

  /** `X` icon `width` and `height`, `80%` by default */
  iconSize?: number | string;

  /** Content rendered inside the button, for example `VisuallyHidden` with label for screen readers */
  children?: JSX.Element;

  /** Replaces default close icon. If set, `iconSize` prop is ignored. */
  icon?: JSX.Element;
}

export interface CloseButtonProps
  extends __CloseButtonProps,
    BoxProps,
    StylesApiProps<CloseButtonFactory> {
  __staticSelector?: string;
}

export type CloseButtonFactory = PolymorphicFactory<{
  props: CloseButtonProps;
  defaultComponent: 'button';
  defaultRef: HTMLButtonElement;
  stylesNames: CloseButtonStylesNames;
  variant: CloseButtonVariant;
  vars: CloseButtonCssVariables;
}>;

const defaultProps: Partial<CloseButtonProps> = {
  variant: 'subtle',
};

const varsResolver = createVarsResolver<CloseButtonFactory>((_, { size, radius, iconSize }) => ({
  root: {
    '--cb-size': getSize(size, 'cb-size'),
    '--cb-radius': radius === undefined ? undefined : getRadius(radius),
    '--cb-icon-size': rem(iconSize),
  },
}));

export const CloseButton = polymorphicFactory<CloseButtonFactory>(_props => {
  const props = useProps('CloseButton', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'iconSize',
    'children',
    'vars',
    'radius',
    'className',
    'classNames',
    'style',
    'styles',
    'unstyled',
    'data-disabled',
    'disabled',
    'variant',
    'icon',
    'mod',
    'attributes',
    '__staticSelector',
    'ref'
  ]);

  const getStyles = useStyles<CloseButtonFactory>({
    name: local.__staticSelector || 'CloseButton',
    props,
    className: local.className,
    style: local.style,
    classes,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  return (
    <UnstyledButton
      ref={local.ref}
      {...others}
      unstyled={local.unstyled}
      variant={local.variant}
      disabled={local.disabled}
      mod={[{ disabled: local.disabled || local["data-disabled"] }, local.mod]}
      {...getStyles('root', { variant: local.variant, active: !local.disabled && !local["data-disabled"] })}
    >
      {local.icon || <CloseIcon />}
      {local.children}
    </UnstyledButton>
  );
});

CloseButton.classes = classes;
CloseButton.displayName = '@empoleon/core/CloseButton';

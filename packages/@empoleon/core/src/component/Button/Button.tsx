import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getFontSize,
  getRadius,
  getSize,
  EmpoleonColor,
  EmpoleonGradient,
  EmpoleonRadius,
  EmpoleonSize,
  polymorphicFactory,
  PolymorphicFactory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { Loader, LoaderProps } from '../Loader';
import { EmpoleonTransition, Transition } from '../Transition';
import { UnstyledButton } from '../UnstyledButton';
import { ButtonGroup } from './ButtonGroup/ButtonGroup';
import { ButtonGroupSection } from './ButtonGroupSection/ButtonGroupSection';
import classes from './Button.module.css';

export type ButtonStylesNames = 'root' | 'inner' | 'loader' | 'section' | 'label';
export type ButtonVariant =
  | 'filled'
  | 'light'
  | 'outline'
  | 'transparent'
  | 'white'
  | 'subtle'
  | 'default'
  | 'gradient';

export type ButtonCssVariables = {
  root:
    | '--button-justify'
    | '--button-height'
    | '--button-padding-x'
    | '--button-fz'
    | '--button-radius'
    | '--button-bg'
    | '--button-hover'
    | '--button-hover-color'
    | '--button-color'
    | '--button-bd';
};

export interface ButtonProps extends BoxProps, StylesApiProps<ButtonFactory> {
  'data-disabled'?: boolean;

  /** Controls button `height`, `font-size` and horizontal `padding`, `'sm'` by default */
  size?: EmpoleonSize | `compact-${EmpoleonSize}` | (string & {});

  /** Key of `theme.colors` or any valid CSS color, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Sets `justify-content` of `inner` element, can be used to change distribution of sections and label, `'center'` by default */
  justify?: JSX.CSSProperties['justify-content'];

  /** Content displayed on the left side of the button label */
  leftSection?: JSX.Element;

  /** Content displayed on the right side of the button label */
  rightSection?: JSX.Element;

  /** Determines whether button should take 100% width of its parent container, `false` by default */
  fullWidth?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Gradient configuration used when `variant="gradient"`, default value is `theme.defaultGradient` */
  gradient?: EmpoleonGradient;

  /** Indicates disabled state */
  disabled?: boolean;

  /** Button content */
  children?: JSX.Element;

  /** Determines whether the `Loader` component should be displayed over the button */
  loading?: boolean;

  /** Props added to the `Loader` component (only visible when `loading` prop is set) */
  loaderProps?: LoaderProps;

  /** Determines whether button text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type ButtonFactory = PolymorphicFactory<{
  props: ButtonProps;
  defaultRef: HTMLButtonElement;
  defaultComponent: 'button';
  stylesNames: ButtonStylesNames;
  vars: ButtonCssVariables;
  variant: ButtonVariant;
  staticComponents: {
    Group: typeof ButtonGroup;
    GroupSection: typeof ButtonGroupSection;
  };
}>;

const loaderTransition: EmpoleonTransition = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${rem(1)}))` },
  out: { opacity: 0, transform: 'translate(-50%, -200%)' },
  common: { 'transform-origin': 'center' },
  transitionProperty: 'transform, opacity',
};

const defaultProps: Partial<ButtonProps> = {};

const varsResolver = createVarsResolver<ButtonFactory>(
  (theme, { radius, color, gradient, variant, size, justify, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || 'filled',
      autoContrast,
    });

    return {
      root: {
        '--button-justify': justify,
        '--button-height': getSize(size, 'button-height'),
        '--button-padding-x': getSize(size, 'button-padding-x'),
        '--button-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--button-radius': radius === undefined ? undefined : getRadius(radius),
        '--button-bg': color || variant ? colors.background : undefined,
        '--button-hover': color || variant ? colors.hover : undefined,
        '--button-color': colors.color,
        '--button-bd': color || variant ? colors.border : undefined,
        '--button-hover-color': color || variant ? colors.hoverColor : undefined,
      },
    };
  }
);

export const Button = polymorphicFactory<ButtonFactory>(_props => {
  const props = useProps('Button', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'style',
    'vars',
    'className',
    'color',
    'disabled',
    'children',
    'leftSection',
    'rightSection',
    'fullWidth',
    'variant',
    'radius',
    'loading',
    'loaderProps',
    'gradient',
    'classNames',
    'styles',
    'unstyled',
    'data-disabled',
    'autoContrast',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<ButtonFactory>({
    name: 'Button',
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

  const hasLeftSection = !!local.leftSection;
  const hasRightSection = !!local.rightSection;

  return (
    <UnstyledButton
      ref={local.ref}
      {...getStyles('root', { active: !local.disabled && !local.loading && !local["data-disabled"] })}
      unstyled={local.unstyled}
      variant={local.variant}
      disabled={local.disabled || local.loading}
      mod={[
        {
          disabled: local.disabled || local["data-disabled"],
          loading: local.loading,
          block: local.fullWidth,
          'with-left-section': hasLeftSection,
          'with-right-section': hasRightSection,
        },
        local.mod,
      ]}
      {...others}
    >
      <Transition mounted={!!local.loading} transition={loaderTransition} duration={150}>
        {(transitionStyles) => (
          <Box component="span" {...getStyles('loader', { style: transitionStyles })} aria-hidden>
            <Loader
              color="var(--button-color)"
              size="calc(var(--button-height) / 1.8)"
              {...local.loaderProps}
            />
          </Box>
        )}
      </Transition>

      <span {...getStyles('inner')}>
        {local.leftSection && (
          <Box component="span" {...getStyles('section')} mod={{ position: 'left' }}>
            {local.leftSection}
          </Box>
        )}

        <Box component="span" mod={{ loading: local.loading }} {...getStyles('label')}>
          {local.children}
        </Box>

        {local.rightSection && (
          <Box component="span" {...getStyles('section')} mod={{ position: 'right' }}>
            {local.rightSection}
          </Box>
        )}
      </span>
    </UnstyledButton>
  );
});

Button.classes = classes;
Button.displayName = '@empoleon/core/Button';
Button.Group = ButtonGroup;
Button.GroupSection = ButtonGroupSection;

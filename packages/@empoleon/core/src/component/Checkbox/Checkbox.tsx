import { Component, createEffect, splitProps, JSX } from 'solid-js';
import { useId } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  DataAttributes,
  ElementProps,
  extractStyleProps,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getRadius,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  parseThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { InlineInput, InlineInputClasses, InlineInputStylesNames } from '../../utils/InlineInput';
import { CheckboxCard } from './CheckboxCard/CheckboxCard';
import { useCheckboxGroupContext } from './CheckboxGroup.context';
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup';
import { CheckboxIndicator } from './CheckboxIndicator/CheckboxIndicator';
import { CheckboxIcon } from './CheckIcon';
import classes from './Checkbox.module.css';

export type CheckboxVariant = 'filled' | 'outline';
export type CheckboxStylesNames = 'icon' | 'inner' | 'input' | InlineInputStylesNames;
export type CheckboxCssVariables = {
  root: '--checkbox-size' | '--checkbox-radius' | '--checkbox-color' | '--checkbox-icon-color';
};

export interface CheckboxProps
  extends BoxProps,
    StylesApiProps<CheckboxFactory>,
    ElementProps<'input', 'size' | 'children'> {
  /** Id used to connect input with the label. If not set, unique id is generated instead. */
  id?: string;

  /** Content of the `label` associated with the checkbox */
  label?: JSX.Element;

  /** Key of `theme.colors` or any valid CSS color to set input background color in checked state, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls size of the component, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** Key of `theme.radius` or any valid CSS value to set `border-radius,` `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Props passed down to the root element */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Position of the label relative to the input, `'right'` by default */
  labelPosition?: 'left' | 'right';

  /** Description displayed below the label */
  description?: JSX.Element;

  /** Error message displayed below the label */
  error?: JSX.Element;

  /** Indeterminate state of the checkbox. If set, `checked` prop is ignored. */
  indeterminate?: boolean;

  /** Icon displayed when checkbox is in checked or indeterminate state */
  icon?: Component<{ indeterminate: boolean | undefined; className: string }>;

  /** Assigns ref of the root element */
  rootRef?: (el: HTMLDivElement | undefined) => void;

  /** Key of `theme.colors` or any valid CSS color to set icon color, by default value depends on `theme.autoContrast` */
  iconColor?: EmpoleonColor;

  /** Determines whether icon color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type CheckboxFactory = Factory<{
  props: CheckboxProps;
  ref: HTMLInputElement;
  stylesNames: CheckboxStylesNames;
  vars: CheckboxCssVariables;
  variant: CheckboxVariant;
  staticComponents: {
    Group: typeof CheckboxGroup;
    Indicator: typeof CheckboxIndicator;
    Card: typeof CheckboxCard;
  };
}>;

const defaultProps: Partial<CheckboxProps> = {
  labelPosition: 'right',
  icon: CheckboxIcon,
} satisfies Partial<CheckboxProps>;

const varsResolver = createVarsResolver<CheckboxFactory>(
  (theme, { radius, color, size, iconColor, variant, autoContrast }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor =
      parsedColor.isThemeColor && parsedColor.shade === undefined
        ? `var(--empoleon-color-${parsedColor.color}-outline)`
        : parsedColor.color;

    return {
      root: {
        '--checkbox-size': getSize(size, 'checkbox-size'),
        '--checkbox-radius': radius === undefined ? undefined : getRadius(radius),
        '--checkbox-color': variant === 'outline' ? outlineColor : getThemeColor(color, theme),
        '--checkbox-icon-color': iconColor
          ? getThemeColor(iconColor, theme)
          : getAutoContrastValue(autoContrast, theme)
            ? getContrastColor({ color, theme, autoContrast })
            : undefined,
      },
    };
  }
);

export const Checkbox = factory<CheckboxFactory>(_props => {
  const props = useProps('Checkbox', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'color',
    'label',
    'id',
    'size',
    'radius',
    'wrapperProps',
    'checked',
    'labelPosition',
    'description',
    'error',
    'disabled',
    'variant',
    'indeterminate',
    'icon',
    'rootRef',
    'iconColor',
    'onChange',
    'autoContrast',
    'mod',
    'attributes',
    'ref'
  ]);

  const ctx = useCheckboxGroupContext();
  const _size = local.size || ctx?.size;
  const Icon = local.icon!;

  const getStyles = useStyles<CheckboxFactory>({
    name: 'Checkbox',
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

  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(local.id);

  const contextProps = ctx
    ? {
        checked: ctx.value().includes(rest.value as string),
        onChange: (event: Event) => {
          ctx.onChange(event as any);
          if (typeof local.onChange === 'function') {
            local.onChange(event as any);
          }
        },
      }
    : {};

  const fallbackRef = null;
  const ref = local.ref || fallbackRef;

  let inputRef: HTMLInputElement | undefined;
  createEffect(() => {
    if (inputRef) inputRef.indeterminate = local.indeterminate || false;
  });

  return (
    <InlineInput
      {...getStyles('root')}
      __staticSelector="Checkbox"
      __stylesApiProps={props}
      id={uuid}
      size={_size}
      labelPosition={local.labelPosition}
      label={local.label}
      description={local.description}
      error={local.error}
      disabled={local.disabled}
      classNames={local.classNames}
      styles={local.styles}
      unstyled={local.unstyled}
      data-checked={contextProps.checked || local.checked || undefined}
      variant={local.variant}
      ref={local.rootRef}
      mod={local.mod}
      {...styleProps}
      {...local.wrapperProps as any}
    >
      <Box {...getStyles('inner')} mod={{ 'data-label-position': local.labelPosition }}>
        <Box
          component="input"
          id={uuid}
          ref={(el) => {
            inputRef = el;
            if (typeof ref === 'function') ref(el);
          }}
          checked={local.checked}
          disabled={local.disabled}
          mod={{ error: !!local.error, indeterminate: local.indeterminate }}
          {...getStyles('input', { focusable: true, variant: local.variant })}
          onChange={local.onChange}
          {...rest}
          {...contextProps}
          type="checkbox"
        />

        <Icon indeterminate={local.indeterminate} {...getStyles('icon')} />
      </Box>
    </InlineInput>
  );
});

Checkbox.classes = { ...classes, ...InlineInputClasses };
Checkbox.displayName = '@empoleon/core/Checkbox';
Checkbox.Group = CheckboxGroup;
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Card = CheckboxCard;

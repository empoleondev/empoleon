import { splitProps, JSX } from 'solid-js';
import { useId, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  DataAttributes,
  ElementProps,
  extractStyleProps,
  factory,
  Factory,
  getRadius,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { InlineInput, InlineInputClasses, InlineInputStylesNames } from '../InlineInput';
import { useSwitchGroupContext } from './SwitchGroup.context';
import { SwitchGroup } from './SwitchGroup/SwitchGroup';
import classes from './Switch.module.css';

export type SwitchStylesNames =
  | 'root'
  | 'track'
  | 'trackLabel'
  | 'thumb'
  | 'input'
  | InlineInputStylesNames;

export type SwitchCssVariables = {
  root:
    | '--switch-radius'
    | '--switch-height'
    | '--switch-width'
    | '--switch-thumb-size'
    | '--switch-label-font-size'
    | '--switch-track-label-padding'
    | '--switch-color';
};

export interface SwitchProps
  extends BoxProps,
    StylesApiProps<SwitchFactory>,
    ElementProps<'input', 'size' | 'children'> {
  /** Id used to bind input and label, if not passed, unique id will be generated instead */
  id?: string;

  /** Content of the `label` associated with the radio */
  label?: JSX.Element;

  /** Inner label when the `Switch` is in unchecked state */
  offLabel?: JSX.Element;

  /** Inner label when the `Switch` is in checked state */
  onLabel?: JSX.Element;

  /** Key of `theme.colors` or any valid CSS color to set input color in checked state, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls size of all elements */
  size?: EmpoleonSize | (string & {});

  /** Key of `theme.radius` or any valid CSS value to set `border-radius,` "xl" by default */
  radius?: EmpoleonRadius;

  /** Props passed down to the root element */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Icon inside the thumb of the switch */
  thumbIcon?: JSX.Element;

  /** Position of the label relative to the input, `'right'` by default */
  labelPosition?: 'left' | 'right';

  /** Description displayed below the label */
  description?: JSX.Element;

  /** Error displayed below the label */
  error?: JSX.Element;

  /** Assigns ref of the root element */
  rootRef?: (el: HTMLDivElement | undefined) => void;

  /** If set, the indicator will be displayed inside thumb, `true` by default */
  withThumbIndicator?: boolean;

  /** SolidJS addition - Checked state for controlled component */
  checked?: boolean;

  /** SolidJS addition - Default value for uncontrolled component */
  defaultChecked?: boolean;

  /** SolidJS addition - Called when checked state changes */
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>;
}

export type SwitchFactory = Factory<{
  props: SwitchProps;
  ref: HTMLInputElement;
  stylesNames: SwitchStylesNames;
  vars: SwitchCssVariables;
  staticComponents: {
    Group: typeof SwitchGroup;
  };
}>;

const defaultProps: Partial<SwitchProps> = {
  labelPosition: 'right',
  withThumbIndicator: true,
};

const varsResolver = createVarsResolver<SwitchFactory>((theme, { radius, color, size }) => ({
  root: {
    '--switch-radius': radius === undefined ? undefined : getRadius(radius),
    '--switch-height': getSize(size, 'switch-height'),
    '--switch-width': getSize(size, 'switch-width'),
    '--switch-thumb-size': getSize(size, 'switch-thumb-size'),
    '--switch-label-font-size': getSize(size, 'switch-label-font-size'),
    '--switch-track-label-padding': getSize(size, 'switch-track-label-padding'),
    '--switch-color': color ? getThemeColor(color, theme) : undefined,
  },
}));

export const Switch = factory<SwitchFactory>(_props => {
  const props = useProps('Switch', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'color',
    'label',
    'offLabel',
    'onLabel',
    'id',
    'size',
    'radius',
    'wrapperProps',
    'thumbIcon',
    'checked',
    'defaultChecked',
    'onChange',
    'labelPosition',
    'description',
    'error',
    'disabled',
    'variant',
    'rootRef',
    'mod',
    'withThumbIndicator',
    'ref'
  ]);

  const ctx = useSwitchGroupContext();
  const _size = local.size || ctx?.size;

  const getStyles = useStyles<SwitchFactory>({
    name: 'Switch',
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

  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(local.id);

  const contextProps = ctx
    ? {
        checked: ctx.value.includes(rest.value as string),
        onChange: ctx.onChange,
      }
    : {};

  const [_checked, handleChange] = useUncontrolled({
    value: () => contextProps.checked ?? local.checked,
    defaultValue: local.defaultChecked,
    finalValue: false,
  });

  return (
    <InlineInput
      {...getStyles('root')}
      __staticSelector="Switch"
      __stylesApiProps={props}
      id={uuid}
      size={_size}
      labelPosition={local.labelPosition}
      label={local.label}
      description={local.description}
      error={local.error}
      disabled={local.disabled}
      bodyElement="label"
      labelElement="span"
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
      <input
        {...rest}
        disabled={local.disabled}
        checked={_checked()}
        data-checked={contextProps.checked || local.checked || undefined}
        onChange={(event) => {
          ctx ? contextProps.onChange?.(event) : typeof local.onChange === "function" && local.onChange?.(event);
          handleChange(event.currentTarget.checked);
        }}
        id={uuid}
        ref={local.ref}
        type="checkbox"
        role="switch"
        {...getStyles('input')}
      />

      <Box
        aria-hidden="true"
        mod={{ error: local.error, 'label-position': local.labelPosition, 'without-labels': !local.onLabel && !local.offLabel }}
        {...getStyles('track')}
      >
        <Box
          component="span"
          mod={{ 'reduce-motion': true, 'with-thumb-indicator': local.withThumbIndicator && !local.thumbIcon }}
          {...getStyles('thumb')}
        >
          {local.thumbIcon}
        </Box>
        <span {...getStyles('trackLabel')}>{_checked() ? local.onLabel : local.offLabel}</span>
      </Box>
    </InlineInput>
  );
});

Switch.classes = { ...classes, ...InlineInputClasses };
Switch.displayName = '@empoleon/core/Switch';
Switch.Group = SwitchGroup;

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
  getFontSize,
  getRadius,
  getSize,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  EmpoleonStyleProps,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { CheckIcon } from '../Checkbox';
import { useChipGroupContext } from './ChipGroup.context';
import { ChipGroup } from './ChipGroup/ChipGroup';
import classes from './Chip.module.css';
import { createSignal, splitProps, JSX } from 'solid-js';

export type ChipStylesNames = 'root' | 'input' | 'iconWrapper' | 'checkIcon' | 'label';
export type ChipVariant = 'outline' | 'filled' | 'light';
export type ChipCssVariables = {
  root:
    | '--chip-fz'
    | '--chip-size'
    | '--chip-icon-size'
    | '--chip-padding'
    | '--chip-checked-padding'
    | '--chip-radius'
    | '--chip-bg'
    | '--chip-hover'
    | '--chip-color'
    | '--chip-bd'
    | '--chip-spacing';
};

export interface ChipProps
  extends BoxProps,
    StylesApiProps<ChipFactory>,
    ElementProps<'input', 'size' | 'onChange'> {
  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `'xl'` by default */
  radius?: EmpoleonRadius;

  /** Controls various properties related to component size, `'sm'` by default */
  size?: EmpoleonSize;

  /** Chip input type, `'checkbox'` by default */
  type?: 'radio' | 'checkbox';

  /** `label` element associated with the input */
  children: JSX.Element;

  /** Checked state for controlled component */
  checked?: boolean;

  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;

  /** Calls when checked state changes */
  onChange?: (checked: boolean) => void;

  /** Controls components colors based on `variant` prop. Key of `theme.colors` or any valid CSS color. `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Static id to connect input with the label, by default `id` is randomly generated */
  id?: string;

  /** Props passed down to the root element */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Any element or component to replace default icon */
  icon?: JSX.Element;

  /** Assigns ref of the root element */
  rootRef?: HTMLDivElement;

  /** Determines whether button text color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type ChipFactory = Factory<{
  props: ChipProps;
  ref: HTMLInputElement;
  stylesNames: ChipStylesNames;
  vars: ChipCssVariables;
  variant: ChipVariant;
  staticComponents: {
    Group: typeof ChipGroup;
  };
}>;

const defaultProps: Partial<ChipProps> = {
  type: 'checkbox',
};

const varsResolver = createVarsResolver<ChipFactory>(
  (theme, { size, radius, variant, color, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || 'filled',
      autoContrast,
    });

    return {
      root: {
        '--chip-fz': getFontSize(size),
        '--chip-size': getSize(size, 'chip-size'),
        '--chip-radius': radius === undefined ? undefined : getRadius(radius),
        '--chip-checked-padding': getSize(size, 'chip-checked-padding'),
        '--chip-padding': getSize(size, 'chip-padding'),
        '--chip-icon-size': getSize(size, 'chip-icon-size'),
        '--chip-bg': color || variant ? colors.background : undefined,
        '--chip-hover': color || variant ? colors.hover : undefined,
        '--chip-color': color || variant ? colors.color : undefined,
        '--chip-bd': color || variant ? colors.border : undefined,
        '--chip-spacing': getSize(size, 'chip-spacing'),
      },
    };
  }
);

export const Chip = factory<ChipFactory>(_props => {
  const props = useProps('Chip', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'id',
    'checked',
    'defaultChecked',
    'onChange',
    'value',
    'wrapperProps',
    'type',
    'disabled',
    'children',
    'size',
    'variant',
    'icon',
    'rootRef',
    'autoContrast',
    'mod',
    'ref'
  ]);

  const getStyles = useStyles<ChipFactory>({
    name: 'Chip',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const ctx = useChipGroupContext();
  const uuid = useId(local.id);
  const { styleProps, rest } = extractStyleProps(others);

  const [internalValue, setInternalValue] = createSignal(local.defaultChecked || false);
  const isControlled = () => local.checked !== undefined;
  const _value = () => isControlled() ? local.checked! : internalValue();

  const setValue = (value: boolean) => {
    if (!isControlled()) {
      setInternalValue(value);
    }
    local.onChange?.(value);
  };

  // Context props for ChipGroup integration
  const contextProps = () => ctx
    ? {
        checked: ctx.isChipSelected(local.value as string),
        onChange: (event: Event) => {
          const target = event.currentTarget as HTMLInputElement;
          ctx.onChange(event);
          local.onChange?.(target.checked);
        },
        type: ctx.multiple ? 'checkbox' : 'radio',
      }
    : {};

  const _checked = () => contextProps().checked || _value();
  const _type = () => contextProps().type || local.type;

  return (
    <Box
      size={local.size}
      variant={local.variant}
      ref={local.rootRef}
      mod={local.mod}
      {...getStyles('root')}
      {...styleProps}
      {...local.wrapperProps as EmpoleonStyleProps}
    >
      <input
        type={_type()}
        {...getStyles('input')}
        checked={_checked()}
        onChange={(event) => {
          const target = event.currentTarget as HTMLInputElement;
          setValue(target.checked);
          contextProps().onChange?.(event);
        }}
        id={uuid}
        disabled={local.disabled}
        ref={local.ref}
        value={local.value}
        {...contextProps}
        {...rest}
      />

      <label
        for={uuid}
        data-checked={_checked || undefined}
        data-disabled={local.disabled || undefined}
        {...getStyles('label', { variant: local.variant || 'filled' })}
      >
        {_checked() && (
          <span {...getStyles('iconWrapper')}>
            {local.icon || <CheckIcon {...getStyles('checkIcon')} />}
          </span>
        )}
        <span>{local.children}</span>
      </label>
    </Box>
  );
});

Chip.classes = classes;
Chip.displayName = '@empoleon/core/Chip';
Chip.Group = ChipGroup;

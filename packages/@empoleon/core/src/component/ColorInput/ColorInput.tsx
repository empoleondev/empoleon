import { createEffect, createSignal, JSX, splitProps } from 'solid-js';
import { useEyeDropper, useUncontrolled } from '@empoleon/hooks';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '../../core';
import { ActionIcon } from '../ActionIcon';
import {
  __ColorPickerProps,
  ColorPicker,
  ColorPickerStylesNames,
  convertHsvaTo,
  isColorValid,
  parseColor,
} from '../ColorPicker';
import { ColorSwatch } from '../ColorSwatch';
import { __BaseInputProps, __InputStylesNames, Input, InputVariant, useInputProps } from '../Input';
import { InputBase } from '../InputBase';
import { Popover, PopoverProps } from '../Popover';
import { EyeDropperIcon } from './EyeDropperIcon';
import classes from './ColorInput.module.css';

export type ColorInputStylesNames =
  | 'dropdown'
  | 'eyeDropperButton'
  | 'eyeDropperIcon'
  | 'colorPreview'
  | ColorPickerStylesNames
  | __InputStylesNames;

export type ColorInputCssVariables = {
  eyeDropperIcon: '--ci-eye-dropper-icon-size';
  colorPreview: '--ci-preview-size';
};

export interface ColorInputProps
  extends BoxProps,
    __BaseInputProps,
    __ColorPickerProps,
    StylesApiProps<ColorInputFactory>,
    ElementProps<'input', 'size' | 'onChange' | 'value' | 'defaultValue'> {
  /** If input is not allowed, the user can only pick value with color picker and swatches, `false` by default */
  disallowInput?: boolean;

  /** Determines whether the input value should be reset to the last known valid value when the input loses focus, `true` by default */
  fixOnBlur?: boolean;

  /** Props passed down to the `Popover` component */
  popoverProps?: PopoverProps;

  /** Determines whether the preview color swatch should be displayed in the left section of the input, `true` by default */
  withPreview?: boolean;

  /** Determines whether eye dropper button should be displayed in the right section, `true` by default */
  withEyeDropper?: boolean;

  /** An icon to replace the default eye dropper icon */
  eyeDropperIcon?: JSX.Element;

  /** Determines whether the dropdown should be closed when one of the color swatches is clicked, `false` by default */
  closeOnColorSwatchClick?: boolean;

  /** Props passed down to the eye dropper button */
  eyeDropperButtonProps?: Record<string, any>;
}

export type ColorInputFactory = Factory<{
  props: ColorInputProps;
  ref: HTMLInputElement;
  stylesNames: ColorInputStylesNames;
  vars: ColorInputCssVariables;
  variant: InputVariant;
}>;

const defaultProps: Partial<ColorInputProps> = {
  format: 'hex',
  fixOnBlur: true,
  withPreview: true,
  swatchesPerRow: 7,
  withPicker: true,
  popoverProps: { transitionProps: { transition: 'fade', duration: 0 } },
  withEyeDropper: true,
};

const varsResolver = createVarsResolver<ColorInputFactory>((_, { size }) => ({
  eyeDropperIcon: {
    '--ci-eye-dropper-icon-size': getSize(size, 'ci-eye-dropper-icon-size'),
  },

  colorPreview: {
    '--ci-preview-size': getSize(size, 'ci-preview-size'),
  },
}));

export const ColorInput = factory<ColorInputFactory>(__props => {
  const _props = useProps('ColorInput', defaultProps, __props);
  const props = useInputProps('ColorInput', defaultProps, _props);

  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'unstyled',
    'disallowInput',
    'fixOnBlur',
    'popoverProps',
    'withPreview',
    'withEyeDropper',
    'eyeDropperIcon',
    'closeOnColorSwatchClick',
    'eyeDropperButtonProps',
    'value',
    'defaultValue',
    'onChange',
    'onChangeEnd',
    'onClick',
    'onFocus',
    'onBlur',
    'inputProps',
    'format',
    'wrapperProps',
    'readOnly',
    'withPicker',
    'swatches',
    'disabled',
    'leftSection',
    'rightSection',
    'swatchesPerRow',
    'ref'
  ]);

  const getStyles = useStyles<ColorInputFactory>({
    name: 'ColorInput',
    props,
    classes,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'wrapper',
    vars: props.vars,
    varsResolver,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<ColorInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const [dropdownOpened, setDropdownOpened] = createSignal(false);
  const [lastValidValue, setLastValidValue] = createSignal('');
  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue,
    finalValue: '',
    onChange: local.onChange,
  });

  const eyeDropperFuncs = useEyeDropper();

  const eyeDropper = (
    <ActionIcon
      {...local.eyeDropperButtonProps}
      {...getStyles('eyeDropperButton', {
        className: local.eyeDropperButtonProps?.className,
        style: local.eyeDropperButtonProps?.style,
      })}
      variant="subtle"
      color="gray"
      size={local.inputProps.size}
      unstyled={local.unstyled}
      onClick={() =>
        eyeDropperFuncs.open()
          .then((payload: any) => {
            if (payload?.sRGBHex) {
              const color = convertHsvaTo(local.format!, parseColor(payload.sRGBHex));
              setValue(color);
              local.onChangeEnd?.(color);
            }
          })
          .catch(() => {})
      }
    >
      {local.eyeDropperIcon || <EyeDropperIcon {...getStyles('eyeDropperIcon')} />}
    </ActionIcon>
  );

  const handleInputFocus = (event: FocusEvent) => {
    local.onFocus?.(event);
    setDropdownOpened(true);
  };

  const handleInputBlur = (event: FocusEvent) => {
    local.fixOnBlur && setValue(lastValidValue());
    local.onBlur?.(event);
    setDropdownOpened(false);
  };

  const handleInputClick = (event: MouseEvent) => {
    local.onClick?.(event);
    setDropdownOpened(true);
  };

  createEffect(() => {
    if (isColorValid(_value()) || _value().trim() === '') {
      setLastValidValue(_value());
    }
  });

  createEffect(() => {
    if (isColorValid(_value())) {
      setValue(convertHsvaTo(local.format!, parseColor(_value())));
    }
  });

  return (
    <Input.Wrapper
      {...local.wrapperProps}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      __staticSelector="ColorInput"
    >
      <Popover
        __staticSelector="ColorInput"
        position="bottom-start"
        offset={5}
        opened={dropdownOpened()}
        {...local.popoverProps}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        withRoles={false}
        disabled={
          local.readOnly || (local.withPicker === false && (!Array.isArray(local.swatches) || local.swatches.length === 0))
        }
      >
        <Popover.Target>
          {(popoverProps) => (
            <div ref={popoverProps.ref}>
            <Input<'input'>
              auto-complete="off"
              {...others}
              {...local.inputProps}
              classNames={resolvedClassNames}
              styles={resolvedStyles}
              disabled={local.disabled}
              ref={local.ref}
              __staticSelector="ColorInput"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onClick={handleInputClick}
              spell-check={false}
              value={_value()}
              onChange={(event) => {
                const inputValue = event.currentTarget.value;
                setValue(inputValue);
                if (isColorValid(inputValue)) {
                  local.onChangeEnd?.(convertHsvaTo(local.format!, parseColor(inputValue)));
                }
              }}
              leftSection={
                local.leftSection ||
                (local.withPreview ? (
                  <ColorSwatch
                    color={isColorValid(_value()) ? _value() : '#fff'}
                    size="var(--ci-preview-size)"
                    {...getStyles('colorPreview')}
                  />
                ) : null)
              }
              readOnly={local.disallowInput || local.readOnly}
              pointer={local.disallowInput}
              unstyled={local.unstyled}
              rightSection={
                local.rightSection ||
                (local.withEyeDropper && !local.disabled && !local.readOnly && eyeDropperFuncs.supported() ? eyeDropper : null)
              }
            />
            </div>
          )}
        </Popover.Target>
        <Popover.Dropdown
          onMouseDown={(event) => event.preventDefault()}
          className={classes.dropdown}
        >
          <ColorPicker
            __staticSelector="ColorInput"
            value={_value()}
            onChange={setValue}
            onChangeEnd={local.onChangeEnd}
            format={local.format}
            swatches={local.swatches}
            swatchesPerRow={local.swatchesPerRow}
            withPicker={local.withPicker}
            size={local.inputProps.size}
            focusable={false}
            unstyled={local.unstyled}
            styles={resolvedStyles}
            classNames={resolvedClassNames}
            onColorSwatchClick={() => local.closeOnColorSwatchClick && setDropdownOpened(false)}
            attributes={local.wrapperProps.attributes}
          />
        </Popover.Dropdown>
      </Popover>
    </Input.Wrapper>
  );
});

ColorInput.classes = InputBase.classes;
ColorInput.displayName = '@empoleon/core/ColorInput';

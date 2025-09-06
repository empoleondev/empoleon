import cx from 'clsx';
import { NumberFormatValues, NumericFormat, OnValueChange } from '@empoleon/solid-number-format';
import { clamp, useMergedRef, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSize,
  noop,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '../../core';
import { __BaseInputProps, __InputStylesNames, InputVariant } from '../Input';
import { InputBase } from '../InputBase';
import { UnstyledButton } from '../UnstyledButton';
import { NumberInputChevron } from './NumberInputChevron';
import classes from './NumberInput.module.css';
import { createEffect, createSignal, Ref, splitProps } from 'solid-js';

// Re for negative -0, -0., -0.0, -0.00, -0.000 ... strings
// And for positive 0., 0.0, 0.00, 0.000 ... strings
const leadingDecimalZeroPattern = /^(0\.0*|-0(\.0*)?)$/;

// Re for 01, 006, 00.02, -0010, -000.293 ... and negative counterparts
const leadingZerosPattern = /^-?0\d+(\.\d+)?\.?$/;

export interface NumberInputHandlers {
  increment: () => void;
  decrement: () => void;
}

function isNumberString(value: unknown) {
  return typeof value === 'string' && value !== '' && !Number.isNaN(Number(value));
}

function canIncrement(value: number | string) {
  if (typeof value === 'number') {
    return value < Number.MAX_SAFE_INTEGER;
  }

  return value === '' || (isNumberString(value) && Number(value) < Number.MAX_SAFE_INTEGER);
}

function getDecimalPlaces(inputValue: string | number): number {
  // All digits must be counted, parseFloat precision depends
  // on the number of digits in the input, not only on the decimal scale
  return inputValue.toString().replace('.', '').length;
}

function isValidNumber(floatValue: number | undefined, value: string): floatValue is number {
  return (
    (typeof floatValue === 'number'
      ? floatValue < Number.MAX_SAFE_INTEGER
      : !Number.isNaN(Number(floatValue))) &&
    !Number.isNaN(floatValue) &&
    getDecimalPlaces(value) < 14 &&
    value !== ''
  );
}

function isInRange(value: number | undefined, min: number | undefined, max: number | undefined) {
  if (value === undefined) {
    return true;
  }

  const minValid = min === undefined || value >= min;
  const maxValid = max === undefined || value <= max;

  return minValid && maxValid;
}

export type NumberInputStylesNames = 'controls' | 'control' | __InputStylesNames;
export type NumberInputCssVariables = {
  controls: '--ni-chevron-size';
};

export interface NumberInputProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<NumberInputFactory>,
    ElementProps<'input', 'size' | 'type' | 'onChange'> {
  /** Controlled component value */
  value?: number | string;

  /** Uncontrolled component default value */
  defaultValue?: number | string;

  /** Called when value changes */
  onChange?: (value: number | string) => void;

  /** Called when value changes with `@empoleon/solid-number-format` payload */
  onValueChange?: OnValueChange;

  /** Determines whether leading zeros are allowed. If set to `false`, leading zeros are removed when the input value becomes a valid number. `true` by default */
  allowLeadingZeros?: boolean;

  /** Determines whether negative values are allowed, `true` by default */
  allowNegative?: boolean;

  /** Characters which when pressed result in a decimal separator, `['.']` by default */
  allowedDecimalSeparators?: string[];

  /** Limits the number of digits that can be entered after the decimal point */
  decimalScale?: number;

  /** Character used as a decimal separator, `'.'` by default */
  decimalSeparator?: string;

  /** If set, 0s are added after `decimalSeparator` to match given `decimalScale`. `false` by default */
  fixedDecimalScale?: boolean;

  /** Prefix added before the input value */
  prefix?: string;

  /** Suffix added after the input value */
  suffix?: string;

  /** Defines the thousand grouping style. */
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none';

  /** A function to validate the input value. If this function returns `false`, the `onChange` will not be called and the input value will not change. */
  isAllowed?: (values: NumberFormatValues) => boolean;

  /** If value is passed as string representation of numbers (unformatted) and number is used in any format props like in prefix or suffix in numeric format and format prop in pattern format then this should be passed as `true`. `false` by default. */
  valueIsNumericString?: boolean;

  /** Controls input `type` attribute, `'text'` by default */
  type?: 'text' | 'tel' | 'password';

  /** A character used to separate thousands */
  thousandSeparator?: string | boolean;

  /** Minimum possible value */
  min?: number;

  /** Maximum possible value */
  max?: number;

  /** Number by which value will be incremented/decremented with up/down controls and keyboard arrows, `1` by default */
  step?: number;

  /** Determines whether the up/down controls should be hidden, `false` by default */
  hideControls?: boolean;

  /** Controls how value is clamped, `strict` – user is not allowed to enter values that are not in `[min, max]` range, `blur` – user is allowed to enter any values, but the value is clamped when the input loses focus (default behavior), `none` – lifts all restrictions, `[min, max]` range is applied only for controls and up/down keys */
  clampBehavior?: 'strict' | 'blur' | 'none';

  /** Determines whether decimal values are allowed, `true` by default */
  allowDecimal?: boolean;

  /** Increment/decrement handlers */
  handlersRef?: Ref<NumberInputHandlers | undefined>;

  /** Value set to the input when increment/decrement buttons are clicked or up/down arrows pressed if the input is empty, `0` by default */
  startValue?: number;

  /** Delay before stepping the value. Can be a number of milliseconds or a function that receives the current step count and returns the delay in milliseconds. */
  stepHoldInterval?: number | ((stepCount: number) => number);

  /** Initial delay in milliseconds before stepping the value. */
  stepHoldDelay?: number;

  /** Determines whether up/down keyboard events should be handled to increment/decrement value, `true` by default */
  withKeyboardEvents?: boolean;

  /** Determines whether leading zeros (e.g. `00100` -> `100`) should be removed on blur, `true` by default */
  trimLeadingZeroesOnBlur?: boolean;
}

export type NumberInputFactory = Factory<{
  props: NumberInputProps;
  ref: HTMLInputElement;
  stylesNames: NumberInputStylesNames;
  vars: NumberInputCssVariables;
  variant: InputVariant;
}>;

const defaultProps = {
  step: 1,
  clampBehavior: 'blur',
  allowDecimal: true,
  allowNegative: true,
  withKeyboardEvents: true,
  allowLeadingZeros: true,
  trimLeadingZeroesOnBlur: true,
  startValue: 0,
} satisfies Partial<NumberInputProps>;

const varsResolver = createVarsResolver<NumberInputFactory>((_, { size }) => ({
  controls: {
    '--ni-chevron-size': getSize(size, 'ni-chevron-size'),
  },
}));

function clampAndSanitizeInput(sanitizedValue: string | number, max?: number, min?: number) {
  const replaced = sanitizedValue.toString().replace(/^0+/, '');
  const parsedValue = parseFloat(replaced);
  if (Number.isNaN(parsedValue)) {
    return replaced;
  } else if (parsedValue > Number.MAX_SAFE_INTEGER) {
    return max !== undefined ? String(max) : replaced;
  }
  return clamp(parsedValue, min, max);
}

export const NumberInput = factory<NumberInputFactory>(_props => {
  const props = useProps('NumberInput', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'className',
    'classNames',
    'styles',
    'unstyled',
    'vars',
    'onChange',
    'onValueChange',
    'value',
    'defaultValue',
    'max',
    'min',
    'step',
    'hideControls',
    'rightSection',
    'isAllowed',
    'clampBehavior',
    'onBlur',
    'allowDecimal',
    'decimalScale',
    'onKeyDown',
    // 'onKeyDownCapture',
    'handlersRef',
    'startValue',
    'disabled',
    'rightSectionPointerEvents',
    'allowNegative',
    'readOnly',
    'size',
    'rightSectionWidth',
    'stepHoldInterval',
    'stepHoldDelay',
    'allowLeadingZeros',
    'withKeyboardEvents',
    'trimLeadingZeroesOnBlur',
    'attributes',
    'ref'
  ])

  const getStyles = useStyles<NumberInputFactory>({
    name: 'NumberInput',
    classes,
    props,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<NumberInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props: props,
  });

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: '',
    onChange: local.onChange,
  });

  const shouldUseStepInterval = () => local.stepHoldDelay !== undefined && local.stepHoldInterval !== undefined;
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | undefined>(undefined);
  let onStepTimeoutRef: number | null = null;
  let stepCountRef = 0;

  const handleValueChange: OnValueChange = (payload, event) => {
    if (event.source === 'event') {
      const newValue = isValidNumber(payload.floatValue, payload.value) &&
        !leadingDecimalZeroPattern.test(payload.value) &&
        !(local.allowLeadingZeros ? leadingZerosPattern.test(payload.value) : false)
        ? payload.floatValue
        : payload.value;

      setValue(newValue);
    }
    local.onValueChange?.(payload, event);
  };

  const getDecimalPlaces = (inputValue: number | string): number => {
    const match = String(inputValue).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };

  const adjustCursor = (position?: number) => {
    if (inputRef && typeof position !== 'undefined') {
      inputRef()?.setSelectionRange(position, position);
    }
  };

  const increment = () => {
    if (!canIncrement(_value())) {
      return;
    }

    let val: number;
    const currentValuePrecision = getDecimalPlaces(_value());
    const stepPrecision = getDecimalPlaces(local.step!);
    const maxPrecision = Math.max(currentValuePrecision, stepPrecision);
    const factor = 10 ** maxPrecision;
    const currentValue = _value();

    if (!isNumberString(currentValue) && (typeof currentValue !== 'number' || Number.isNaN(currentValue))) {
      val = clamp(local.startValue!, local.min, local.max);
    } else if (local.max !== undefined) {
      const incrementedValue =
        (Math.round(Number(currentValue) * factor) + Math.round(local.step! * factor)) / factor;
      val = incrementedValue <= local.max ? incrementedValue : local.max;
    } else {
      val = (Math.round(Number(currentValue) * factor) + Math.round(local.step! * factor)) / factor;
    }

    const formattedValue = val.toFixed(maxPrecision);
    const finalValue = parseFloat(formattedValue);
    const currentNumericValue = typeof currentValue === 'number' ? currentValue : Number(currentValue);
    const valueChanged = finalValue !== currentNumericValue;

    setValue(finalValue);

    local.onValueChange?.(
      { floatValue: finalValue, formattedValue, value: formattedValue },
      { source: 'increment' as any }
    );

    if (!valueChanged && local.onChange) {
      local.onChange(finalValue);
    }

    setTimeout(() => adjustCursor(inputRef()?.value.length), 0);
  };

  const decrement = () => {
    if (!canIncrement(_value())) {
      return;
    }

    let val: number;
    const minValue = local.min !== undefined ? local.min : !local.allowNegative ? 0 : Number.MIN_SAFE_INTEGER;
    const currentValuePrecision = getDecimalPlaces(_value());
    const stepPrecision = getDecimalPlaces(local.step!);
    const maxPrecision = Math.max(currentValuePrecision, stepPrecision);
    const factor = 10 ** maxPrecision;
    const currentValue = _value();

    if ((!isNumberString(_value()) && typeof _value() !== 'number') || Number.isNaN(_value())) {
      val = clamp(local.startValue!, minValue, local.max);
    } else {
      const decrementedValue =
        (Math.round(Number(_value()) * factor) - Math.round(local.step! * factor)) / factor;
      val = minValue !== undefined && decrementedValue < minValue ? minValue : decrementedValue;
    }

    const formattedValue = val.toFixed(maxPrecision);
    const finalValue = parseFloat(formattedValue);
    const currentNumericValue = typeof currentValue === 'number' ? currentValue : Number(currentValue);
    const valueChanged = finalValue !== currentNumericValue;

    setValue(finalValue);

    local.onValueChange?.(
      { floatValue: finalValue, formattedValue, value: formattedValue },
      { source: 'decrement' as any }
    );

    // Add this missing logic that exists in the increment function
    if (!valueChanged && local.onChange) {
      local.onChange(finalValue);
    }

    setTimeout(() => adjustCursor(inputRef()?.value.length), 0);
  };

  createEffect(() => {
    if (typeof local.handlersRef === 'function') {
      local.handlersRef({ increment, decrement });
    } else if (local.handlersRef) {
      local.handlersRef = { increment, decrement };
    }
  });

  const handleKeyDown = (event: KeyboardEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    typeof local.onKeyDown == "function" && local.onKeyDown?.(event);

    if (local.readOnly || !local.withKeyboardEvents) {
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      increment();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      decrement();
    }
  };

  const handleBlur = (event: FocusEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
    let sanitizedValue = _value();

    if (local.clampBehavior === 'blur' && typeof sanitizedValue === 'number') {
      const clampedValue = clamp(sanitizedValue, local.min, local.max);
      sanitizedValue = clampedValue;
    }

    if (
      local.trimLeadingZeroesOnBlur &&
      typeof sanitizedValue === 'string' &&
      getDecimalPlaces(sanitizedValue) < 15
    ) {
      sanitizedValue = clampAndSanitizeInput(sanitizedValue, local.max, local.min);
    }

    if (_value() !== sanitizedValue) {
      setValue(sanitizedValue);
    }

    typeof local.onBlur == "function" && local.onBlur?.(event);
  };

  const onStepHandleChange = (isIncrement: boolean) => {
    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
    stepCountRef += 1;
  };

  const onStepLoop = (isIncrement: boolean) => {
    onStepHandleChange(isIncrement);

    if (shouldUseStepInterval()) {
      const interval =
        typeof local.stepHoldInterval === 'number'
          ? local.stepHoldInterval
          : local.stepHoldInterval && local.stepHoldInterval(stepCountRef);
      onStepTimeoutRef = window.setTimeout(() => onStepLoop(isIncrement), interval);
    }
  };

  const onStep = (
    event: MouseEvent | KeyboardEvent,
    isIncrement: boolean
  ) => {
    event.preventDefault();
    inputRef()?.focus();
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval()) {
      onStepTimeoutRef = window.setTimeout(() => onStepLoop(isIncrement), local.stepHoldDelay);
    }
  };

  const onStepDone = () => {
    if (onStepTimeoutRef) {
      window.clearTimeout(onStepTimeoutRef);
    }
    onStepTimeoutRef = null;
    stepCountRef = 0;
  };

  const controls = (
    <div {...getStyles('controls')}>
      <UnstyledButton
        {...getStyles('control')}
        tabIndex={-1}
        aria-hidden
        disabled={local.disabled || (typeof _value() === 'number' && local.max !== undefined && (_value() as number) >= local.max)}
        mod={{ direction: 'up' }}
        onMouseDown={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          onStep(event, true);
        }}
        onPointerUp={onStepDone}
        onPointerLeave={onStepDone}
      >
        <NumberInputChevron direction="up" />
      </UnstyledButton>
      <UnstyledButton
        {...getStyles('control')}
        tabIndex={-1}
        aria-hidden
        disabled={local.disabled || (typeof _value() === 'number' && local.min !== undefined && (_value() as number) <= local.min)}
        mod={{ direction: 'down' }}
        onMouseDown={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          onStep(event, false);
        }}
        onPointerUp={onStepDone}
        onPointerLeave={onStepDone}
      >
        <NumberInputChevron direction="down" />
      </UnstyledButton>
    </div>
  );

  return (
    <InputBase
      component={NumericFormat}
      {...others}
      allowNegative={local.allowNegative}
      className={cx(classes.root, local.className)}
      size={local.size}
      readOnly={local.readOnly}
      disabled={local.disabled}
      value={_value()}
      ref={useMergedRef(local.ref, setInputRef)}
      onValueChange={handleValueChange}
      rightSection={
        local.hideControls || local.readOnly || !canIncrement(_value()) ? local.rightSection : local.rightSection || controls
      }
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      unstyled={local.unstyled}
      __staticSelector="NumberInput"
      decimalScale={local.allowDecimal ? local.decimalScale : 0}
      onKeyDown={handleKeyDown}
      // onKeyDownCapture={handleKeyDownCapture}
      rightSectionPointerEvents={local.rightSectionPointerEvents ?? (local.disabled ? 'none' : undefined)}
      rightSectionWidth={local.rightSectionWidth ?? `var(--ni-right-section-width-${local.size || 'sm'})`}
      allowLeadingZeros={local.allowLeadingZeros}
      onBlur={handleBlur}
      attributes={local.attributes}
      isAllowed={(val: any) => {
        if (local.clampBehavior === 'strict') {
          if (local.isAllowed) {
            return local.isAllowed(val) && isInRange(val.floatValue, local.min, local.max);
          }

          return isInRange(val.floatValue, local.min, local.max);
        }

        return local.isAllowed ? local.isAllowed(val) : true;
      }}
    />
  );
});

NumberInput.classes = { ...InputBase.classes, ...classes };
NumberInput.displayName = '@empoleon/core/NumberInput';

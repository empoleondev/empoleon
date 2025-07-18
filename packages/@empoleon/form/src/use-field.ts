import { createMemo, createSignal, JSX } from 'solid-js';
import { getInputOnChange } from './get-input-on-change';
import { FormMode, GetInputPropsType } from './types';
import { shouldValidateOnChange } from './validate';

type UseFieldErrorResolver = (error: unknown) => JSX.Element;

export interface UseFieldInput<
  T,
  FieldType extends GetInputPropsType = 'input',
  Mode extends FormMode = 'controlled',
> {
  /** Field mode, controlled by default */
  mode?: Mode;

  /** Initial field value */
  initialValue: T;

  /** Initial touched value */
  initialTouched?: boolean;

  /** Initial field error message */
  initialError?: JSX.Element;

  /** Called with updated value when the field value changes */
  onValueChange?: (value: T) => void;

  /** Determines whether the field should be validated when value changes, false by default */
  validateOnChange?: boolean;

  /** Determines whether the field should be validated when it loses focus, false by default */
  validateOnBlur?: boolean;

  /** Determines whether the field should clear error message when value changes, true by default */
  clearErrorOnChange?: boolean;

  /** A function to validate field value, can be sync or async */
  validate?: (value: T) => JSX.Element | Promise<JSX.Element>;

  /** Field type, input by default */
  type?: FieldType;

  /** A function to resolve validation error from the result returned from validate function, should return react node */
  resolveValidationError?: UseFieldErrorResolver;
}

interface SetValueOptions {
  updateState?: boolean;
  updateKey?: boolean;
}

interface GetInputPropsOptions {
  withError?: boolean;
  withFocus?: boolean;
}

interface GetInputPropsSharedReturn {
  error?: JSX.Element;
  onFocus?: () => void;
  onBlur: () => void;
  onChange: (value: any) => void;
}

type GetInputPropsTypeValue<
  T,
  FieldType extends GetInputPropsType,
  Mode extends FormMode,
> = FieldType extends 'checkbox'
  ? Mode extends 'controlled'
    ? { checked: boolean }
    : { defaultChecked: boolean }
  : Mode extends 'controlled'
    ? { value: T }
    : { defaultValue: T };

type GetInputPropsReturnType<
  T,
  FieldType extends GetInputPropsType,
  Mode extends FormMode,
> = GetInputPropsSharedReturn & GetInputPropsTypeValue<T, FieldType, Mode>;

export interface UseFieldReturnType<
  T,
  FieldType extends GetInputPropsType = 'input',
  Mode extends FormMode = 'controlled',
> {
  /** Returns props to pass to the input element */
  getInputProps: (options?: GetInputPropsOptions) => GetInputPropsReturnType<T, FieldType, Mode>;

  /** Returns current input value */
  getValue: () => T;

  /** Sets input value to the given value */
  setValue: (value: T) => void;

  /** Resets field value to initial state, sets touched state to false, sets error to null */
  reset: () => void;

  /** Validates current input value when called */
  validate: () => Promise<JSX.Element | void>;

  /** Set to true when async validate function is called, stays true until the returned promise resolves */
  isValidating: boolean;

  /** Current error message */
  error: JSX.Element;

  /** Sets error message to the given react node */
  setError: (error: JSX.Element) => void;

  /** Returns true if the input has been focused at least once */
  isTouched: () => boolean;

  /** Returns true if input value is different from the initial value */
  isDirty: () => boolean;

  /** Resets touched state to false */
  resetTouched: () => void;

  /** Key that should be added to the input when mode is uncontrolled */
  key: number;
}

export function useField<
  T,
  Mode extends FormMode = 'controlled',
  FieldType extends GetInputPropsType = 'input',
>({
  mode = 'controlled' as Mode,
  clearErrorOnChange = true,
  initialValue,
  initialError = null,
  initialTouched = false,
  onValueChange,
  validateOnChange = false,
  validateOnBlur = false,
  validate,
  resolveValidationError,
  type = 'input' as FieldType,
}: UseFieldInput<T, FieldType, Mode>): UseFieldReturnType<T, FieldType, Mode> {
  const [valueState, setValueState] = createSignal(initialValue);
  let valueRef = initialValue;
  const [key, setKey] = createSignal(0);
  const [error, setError] = createSignal<JSX.Element>(initialError || null);
  let touchedRef = initialTouched || false;
  const [, setTouchedState] = createSignal(touchedRef);
  const [isValidating, setIsValidating] = createSignal(false);
  const errorResolver = () => resolveValidationError || ((err) => err as any);

  const setTouched = (val: boolean, { updateState = mode === 'controlled' } = {}) => {
    touchedRef = val;
    updateState && setTouchedState(val);
  };

  const setValue = (
      value: T,
      {
        updateKey = mode === 'uncontrolled',
        updateState = mode === 'controlled',
      }: SetValueOptions = {}
    ) => {
      if (valueRef === value) {
        return;
      }

      valueRef = value;

      onValueChange?.(value);

      if (clearErrorOnChange && error() !== null) {
        setError(null);
      }

      if (updateState) {
        setValueState(() => value);
      }

      if (updateKey) {
        setKey(key() + 1);
      }

      if (validateOnChange) {
        _validate();
      }
    };

  const reset = () => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
  };

  const getValue = () => valueRef;

  const isTouched = () => touchedRef;

  const isDirty = () => valueRef !== initialValue;

  const _validate = async () => {
    const validationResult = validate?.(valueRef);

    if (validationResult instanceof Promise) {
      setIsValidating(true);
      try {
        const result = await validationResult;
        setIsValidating(false);
        setError(result);
      } catch (err) {
        setIsValidating(false);
        const resolvedError = errorResolver()(err);
        setError(resolvedError());
        return resolvedError();
      }
    } else {
      setError(validationResult);
      return validationResult;
    }
  };

  const getInputProps = ({ withError = true, withFocus = true } = {}) => {
    const onChange = getInputOnChange<T>((val) => setValue(val as any, { updateKey: false }));

    const payload: any = { onChange };

    if (withError) {
      payload.error = error();
    }

    if (type === 'checkbox') {
      payload[mode === 'controlled' ? 'checked' : 'defaultChecked'] = valueRef;
    } else {
      payload[mode === 'controlled' ? 'value' : 'defaultValue'] = valueRef;
    }

    if (withFocus) {
      payload.onFocus = () => {
        setTouched(true);
      };

      payload.onBlur = () => {
        if (shouldValidateOnChange('', !!validateOnBlur)) {
          _validate();
        }
      };
    }

    return payload;
  };

  const resetTouched = () => setTouched(false);

  return {
    key: key(),
    getValue,
    setValue,
    reset,
    getInputProps,

    isValidating: isValidating(),
    validate: _validate,

    error: error(),
    setError,

    isTouched,
    isDirty,
    resetTouched,
  };
}

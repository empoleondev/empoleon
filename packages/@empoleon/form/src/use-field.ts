import { createMemo, createSignal, JSX, mergeProps } from 'solid-js';
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
  isValidating: () => boolean;

  /** Current error message */
  error: () => JSX.Element;

  /** Sets error message to the given react node */
  setError: (error: JSX.Element) => void;

  /** Returns true if the input has been focused at least once */
  isTouched: () => boolean;

  /** Returns true if input value is different from the initial value */
  isDirty: () => boolean;

  /** Resets touched state to false */
  resetTouched: () => void;

  /** Key that should be added to the input when mode is uncontrolled */
  key: () => number;
}

export function useField<
  T,
  Mode extends FormMode = 'controlled',
  FieldType extends GetInputPropsType = 'input',
>(input: UseFieldInput<T, FieldType, Mode>): UseFieldReturnType<T, FieldType, Mode> {
  const props = mergeProps(
    {
      mode: 'controlled' as Mode,
      clearErrorOnChange: true,
      initialError: null,
      initialTouched: false,
      validateOnChange: false,
      validateOnBlur: false,
      type: 'input' as FieldType,
    },
    input
  );
  const [valueState, setValueState] = createSignal(props.initialValue);
  const [key, setKey] = createSignal(0);
  const [error, setError] = createSignal<JSX.Element>(props.initialError || null);
  const [touchedState, setTouchedState] = createSignal(props.initialTouched || false);
  const [isValidating, setIsValidating] = createSignal(false);

  const errorResolver = createMemo(
    () => props.resolveValidationError || ((err: any) => err as JSX.Element)
  );

  const setTouched = (val: boolean, { updateState = props.mode === 'controlled' } = {}) => {
    if (updateState) {
      setTouchedState(val);
    }
  };

  const setValue = (
    value: T,
    {
      updateKey = props.mode === 'uncontrolled',
      updateState = props.mode === 'controlled',
    }: SetValueOptions = {}
  ) => {
    // For controlled mode, always update the signal
    // For uncontrolled mode, only update when explicitly requested
    const currentValue = props.mode === 'controlled' ? valueState() : valueState();

    if (currentValue === value) {
      return;
    }

    props.onValueChange?.(value);

    if (props.clearErrorOnChange && error() !== null) {
      setError(null);
    }

    if (updateState || props.mode === 'controlled') {
      setValueState(() => value);
    }

    if (updateKey) {
      setKey((prev) => prev + 1);
    }

    if (props.validateOnChange) {
      _validate();
    }
  };

  const reset = () => {
    setValue(props.initialValue);
    setError(null);
    setTouched(false);
  };

  const getValue = () => valueState();

  const isTouched = () => touchedState();

  const isDirty = () => valueState() !== props.initialValue;

  const _validate = async () => {
    const validationResult = props.validate?.(valueState());

    if (validationResult instanceof Promise) {
      setIsValidating(true);
      try {
        const result = await validationResult;
        setIsValidating(false);
        setError(result);
        return result;
      } catch (err) {
        setIsValidating(false);
        const resolvedError = errorResolver()(err);
        setError(resolvedError);
        return resolvedError;
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

    if (props.type === 'checkbox') {
      payload[props.mode === 'controlled' ? 'checked' : 'defaultChecked'] = valueState();
    } else {
      payload[props.mode === 'controlled' ? 'value' : 'defaultValue'] = valueState();
    }

    if (withFocus) {
      payload.onFocus = () => {
        setTouched(true);
      };

      payload.onBlur = () => {
        if (shouldValidateOnChange('', !!props.validateOnBlur)) {
          _validate();
        }
      };
    }

    return payload;
  };

  const resetTouched = () => setTouched(false);

  return {
    key,
    getValue,
    setValue,
    reset,
    getInputProps,

    isValidating,
    validate: _validate,

    error,
    setError,

    isTouched,
    isDirty,
    resetTouched,
  };
}

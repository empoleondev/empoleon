import { createSignal, mergeProps } from 'solid-js';
import { useFormActions } from './actions';
import { getInputOnChange } from './get-input-on-change';
import { useFormErrors } from './hooks/use-form-errors/use-form-errors';
import { useFormList } from './hooks/use-form-list/use-form-list';
import { useFormStatus } from './hooks/use-form-status/use-form-status';
import { useFormValues } from './hooks/use-form-values/use-form-values';
import { useFormWatch } from './hooks/use-form-watch/use-form-watch';
import { getDataPath, getPath } from './paths';
import {
  _TransformValues,
  GetInputNode,
  GetInputProps,
  GetTransformedValues,
  Initialize,
  IsValid,
  Key,
  OnReset,
  OnSubmit,
  Reset,
  SetFieldValue,
  SetValues,
  UseFormInput,
  UseFormReturnType,
  Validate,
  ValidateField,
} from './types';
import { shouldValidateOnChange, validateFieldValue, validateValues } from './validate';

export function useForm<
  Values extends Record<string, any> = Record<string, any>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(input: UseFormInput<Values, TransformValues> = {}): UseFormReturnType<Values, TransformValues> {
  // Use mergeProps to preserve reactivity
  const props = mergeProps(
    {
      mode: 'controlled' as const,
      initialErrors: {},
      initialDirty: {},
      initialTouched: {},
      clearInputErrorOnChange: true,
      validateInputOnChange: false,
      validateInputOnBlur: false,
      transformValues: ((values: Values) => values) as any,
      onSubmitPreventDefault: 'always' as const,
      touchTrigger: 'change' as const,
      cascadeUpdates: false,
    },
    input
  );

  const $errors = useFormErrors<Values>(props.initialErrors);
  const $values = useFormValues<Values>({
    initialValues: props.initialValues,
    onValuesChange: props.onValuesChange,
    mode: props.mode,
  });
  const $status = useFormStatus<Values>({
    initialDirty: props.initialDirty,
    initialTouched: props.initialTouched,
    $values,
    mode: props.mode,
  });
  const $list = useFormList<Values>({ $values, $errors, $status });
  const $watch = useFormWatch<Values>({ $status, cascadeUpdates: props.cascadeUpdates });
  const [formKey, setFormKey] = createSignal(0);
  const [fieldKeys, setFieldKeys] = createSignal<Record<string, number>>({});
  const [submitting, setSubmitting] = createSignal(false);
  const [externalUpdateTrigger, setExternalUpdateTrigger] = createSignal(0);

  const reset: Reset = () => {
    $values.resetValues();
    $errors.clearErrors();
    $status.resetDirty();
    $status.resetTouched();
    props.mode === 'uncontrolled' && setFormKey((key) => key + 1);
  };

  const handleValuesChanges = (previousValues: Values) => {
    props.clearInputErrorOnChange && $errors.clearErrors();
    props.mode === 'uncontrolled' && setFormKey((key) => key + 1);

    const subscribers = $watch.subscribers;
    if (subscribers) {
      Object.keys($watch.subscribers.current).forEach((path) => {
        const value = getPath(path, $values.refValues.current);
        const previousValue = getPath(path, previousValues);

        if (value !== previousValue) {
          $watch
            .getFieldSubscribers(path)
            .forEach((cb) => cb({ previousValues, updatedValues: $values.refValues.current }));
        }
      });
    }
  };

  const initialize: Initialize<Values> = (values) => {
    const previousValues = $values.refValues.current;
    $values.initialize(
      values,
      () => props.mode === 'uncontrolled' && setFormKey((prev) => prev + 1)
    );
    handleValuesChanges(previousValues);
  };

  const setFieldValue: SetFieldValue<Values> = (path, value, options) => {
    const shouldValidate = shouldValidateOnChange(path, props.validateInputOnChange);
    const resolvedValue =
      value instanceof Function ? value(getPath(path, $values.refValues.current) as any) : value;

    $status.setCalculatedFieldDirty(path, resolvedValue);
    props.touchTrigger === 'change' && $status.setFieldTouched(path, true);
    !shouldValidate && props.clearInputErrorOnChange && $errors.clearFieldError(path);

    $values.setFieldValue({
      path,
      value,
      updateState: props.mode === 'controlled',
      subscribers: [
        ...$watch.getFieldSubscribers(path),
        shouldValidate
          ? (payload) => {
              const validationResults = validateFieldValue(
                path,
                props.validate,
                payload.updatedValues
              );
              validationResults.hasError
                ? $errors.setFieldError(path, validationResults.error)
                : $errors.clearFieldError(path);
            }
          : null,
        options?.forceUpdate !== false && props.mode !== 'controlled'
          ? () =>
              setFieldKeys((prev) => ({
                ...prev,
                [path as string]: (prev[path as string] || 0) + 1,
              }))
          : null,
      ],
    });
  };

  const setValues: SetValues<Values> = (values) => {
    const previousValues = $values.refValues.current;
    $values.setValues({ values, updateState: false });
    setExternalUpdateTrigger((prev) => prev + 1);
    handleValuesChanges(previousValues);
  };

  const validate: Validate = () => {
    const results = validateValues(props.validate, $values.refValues.current);
    $errors.setErrors(results.errors);
    return results;
  };

  const validateField: ValidateField<Values> = (path) => {
    const results = validateFieldValue(path, props.validate, $values.refValues.current);
    results.hasError ? $errors.setFieldError(path, results.error) : $errors.clearFieldError(path);
    return results;
  };

  const getInputProps: GetInputProps<Values> = (path, options = {}) => {
    const { type = 'input', withError = true, withFocus = true, ...otherOptions } = options;

    const fieldValue = () => {
      externalUpdateTrigger();
      return getPath(path, $values.refValues.current);
    };

    const handler = getInputOnChange((value) =>
      setFieldValue(path, value as any, { forceUpdate: false })
    );

    const payload: any = { 'data-path': getDataPath(props.name, path) };
    payload.onInput = handler;
    payload.onChange = handler;

    if (withError) {
      payload.error = () => $errors.errorsState()[path];
    }

    if (type === 'checkbox') {
      payload[props.mode === 'controlled' ? 'checked' : 'defaultChecked'] = fieldValue();
    } else if (type === 'select') {
      const value = fieldValue();
      const selectValue = value === '' ? undefined : value;
      payload[props.mode === 'controlled' ? 'value' : 'defaultValue'] = selectValue;
    } else {
      payload[props.mode === 'controlled' ? 'value' : 'defaultValue'] = fieldValue();
    }

    if (withFocus) {
      payload.onFocus = () => $status.setFieldTouched(path, true);
      payload.onBlur = () => {
        if (shouldValidateOnChange(path, props.validateInputOnBlur)) {
          const validationResults = validateFieldValue(
            path,
            props.validate,
            $values.refValues.current
          );

          validationResults.hasError
            ? $errors.setFieldError(path, validationResults.error)
            : $errors.clearFieldError(path);
        }
      };
    }

    return Object.assign(
      payload,
      props.enhanceGetInputProps?.({
        inputProps: payload,
        field: path,
        options: { type, withError, withFocus, ...otherOptions },
        form,
      })
    );
  };

  const onSubmit: OnSubmit<Values, TransformValues> =
    (handleSubmit, handleValidationFailure) => (event) => {
      // Don't handle non-submit events
      if (event && event.type !== 'submit') {
        return;
      }

      if (props.onSubmitPreventDefault === 'always') {
        event?.preventDefault();
      }

      const results = validate();

      if (results.hasErrors) {
        if (props.onSubmitPreventDefault === 'validation-failed') {
          event?.preventDefault();
        }

        handleValidationFailure?.(results.errors, $values.refValues.current, event);
      } else {
        const submitResult = handleSubmit?.(
          props.transformValues($values.refValues.current) as any,
          event
        );

        if (submitResult instanceof Promise) {
          setSubmitting(true);
          submitResult.finally(() => setSubmitting(false));
        }
      }
    };

  const getTransformedValues: GetTransformedValues<Values, TransformValues> = (input) =>
    (props.transformValues as any)(input || $values.refValues.current);

  const onReset: OnReset = (event) => {
    event.preventDefault();
    reset();
  };

  const isValid: IsValid<Values> = (path) =>
    path
      ? !validateFieldValue(path, props.validate, $values.refValues.current).hasError
      : !validateValues(props.validate, $values.refValues.current).hasErrors;

  const key: Key<Values> = (path) =>
    `${formKey()}-${path as string}-${fieldKeys()[path as string] || 0}`;

  const getInputNode: GetInputNode<Values> = (path) =>
    document.querySelector(`[data-path="${getDataPath(props.name, path)}"]`);

  const form: UseFormReturnType<Values, TransformValues> = {
    watch: $watch.watch,

    get initialized() {
      return $values.initialized();
    },
    get values() {
      return $values.stateValues();
    },
    getValues: $values.getValues,
    getInitialValues: $values.getValuesSnapshot,
    setInitialValues: $values.setValuesSnapshot,
    initialize,
    setValues,
    setFieldValue,

    get submitting() {
      return submitting();
    },
    setSubmitting,

    get errors() {
      return $errors.errorsState();
    },
    setErrors: $errors.setErrors,
    setFieldError: $errors.setFieldError,
    clearFieldError: $errors.clearFieldError,
    clearErrors: $errors.clearErrors,

    resetDirty: $status.resetDirty,
    setTouched: $status.setTouched,
    setDirty: $status.setDirty,
    isTouched: $status.isTouched,
    resetTouched: $status.resetTouched,
    isDirty: $status.isDirty,
    getTouched: $status.getTouched,
    getDirty: $status.getDirty,

    reorderListItem: $list.reorderListItem,
    insertListItem: $list.insertListItem,
    removeListItem: $list.removeListItem,
    replaceListItem: $list.replaceListItem,

    reset,
    validate,
    validateField,
    getInputProps,
    onSubmit,
    onReset,
    isValid,
    getTransformedValues,
    key,

    getInputNode,
  };

  useFormActions(props.name, form);

  return form;
}

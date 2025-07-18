import { createSignal, createMemo } from 'solid-js';
import { getPath, setPath } from '../../paths';
import { FormMode } from '../../types';

export interface $FormValues<Values extends Record<PropertyKey, any>> {
  initialized: boolean;
  stateValues: () => Values;
  refValues: Values;
  valuesSnapshot: Values;
  setValues: (payload: SetValuesInput<Values>) => void;
  setFieldValue: (payload: SetFieldValueInput<Values>) => void;
  resetValues: () => void;
  setValuesSnapshot: (payload: Values) => void;
  initialize: (values: Values, onInitialize: () => void) => void;
  getValues: () => Values;
  getValuesSnapshot: () => Values;
}

export interface SetValuesSubscriberPayload<Values> {
  path?: PropertyKey;
  updatedValues: Values;
  previousValues: Values;
}

export interface SetValuesInput<Values> {
  values: Partial<Values> | ((values: Values) => Partial<Values>);
  mergeWithPreviousValues?: boolean;
  updateState?: boolean;
  subscribers?: (SetFieldValueSubscriber<Values> | null | undefined)[];
}

export type SetFieldValueSubscriber<Values> = (payload: SetValuesSubscriberPayload<Values>) => void;

export interface SetFieldValueInput<Values> {
  path: PropertyKey;
  value: any;
  updateState?: boolean;
  subscribers?: (SetFieldValueSubscriber<Values> | null | undefined)[];
}

interface UseFormValuesInput<Values extends Record<PropertyKey, any>> {
  initialValues: Values | undefined;
  mode: FormMode;
  onValuesChange?: ((values: Values, previousValues: Values) => void) | undefined;
}

export function useFormValues<Values extends Record<PropertyKey, any>>({
  initialValues,
  onValuesChange,
  mode,
}: UseFormValuesInput<Values>): $FormValues<Values> {
  let initialized = false;
  const [stateValues, setStateValues] = createSignal<Values>(initialValues || ({} as Values));
  let refValues = stateValues();
  let valuesSnapshot = stateValues();

  const setValues = ({
    values,
    subscribers,
    updateState = true,
    mergeWithPreviousValues = true,
  }: SetValuesInput<Values>) => {
    const previousValues = refValues.current;
    const resolvedValues = values instanceof Function ? values(refValues.current) : values;
    const updatedValues = mergeWithPreviousValues
      ? { ...previousValues, ...resolvedValues }
      : (resolvedValues as Values);
    refValues = updatedValues;
    updateState && setStateValues(updatedValues);
    onValuesChange?.(updatedValues, previousValues);
    subscribers
      ?.filter(Boolean)
      .forEach((subscriber) => subscriber!({ updatedValues, previousValues }));
  };

  const setFieldValue = (payload: SetFieldValueInput<Values>) => {
    const currentValue = getPath(payload.path, refValues.current);
    const updatedValue =
      payload.value instanceof Function ? payload.value(currentValue) : payload.value;

    if (currentValue !== updatedValue) {
      const previousValues = refValues.current;
      const updatedValues = setPath(payload.path, updatedValue, refValues.current);
      setValues({ values: updatedValues, updateState: payload.updateState });

      payload.subscribers
        ?.filter(Boolean)
        .forEach((subscriber) =>
          subscriber!({ path: payload.path, updatedValues, previousValues })
        );
    }
  };

  const setValuesSnapshot = (payload: Values) => {
    valuesSnapshot = payload;
  };

  const initialize = (values: Values, onInitialize: () => void) => {
    if (!initialized) {
      initialized = true;
      setValues({ values, updateState: mode === 'controlled' });
      setValuesSnapshot(values);
      onInitialize();
    }
  };

  const resetValues = () => {
    setValues({
      values: valuesSnapshot.current,
      updateState: true,
      mergeWithPreviousValues: false,
    });
  };

  const getValues = () => refValues;
  const getValuesSnapshot = () => valuesSnapshot.current;

  return {
    initialized,
    stateValues,
    refValues,
    valuesSnapshot,
    setValues,
    setFieldValue,
    resetValues,
    setValuesSnapshot,
    initialize,
    getValues,
    getValuesSnapshot,
  };
}

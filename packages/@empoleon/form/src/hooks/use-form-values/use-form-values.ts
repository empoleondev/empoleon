import { createSignal } from 'solid-js';
import { getPath, setPath } from '../../paths';
import { FormMode } from '../../types';

export interface $FormValues<Values extends Record<PropertyKey, any>> {
  initialized: () => boolean;
  stateValues: () => Values;
  refValues: { current: Values }; // Keep React-like interface for compatibility
  valuesSnapshot: { current: Values }; // Keep React-like interface for compatibility
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

export function useFormValues<Values extends Record<PropertyKey, any>>(props: UseFormValuesInput<Values>): $FormValues<Values> {
  const [initialized, setInitialized] = createSignal(false);
  const [stateValues, setStateValues] = createSignal<Values>(props.initialValues || ({} as Values));

  let refValuesData = stateValues();
  let valuesSnapshotData = stateValues();

  const [refValuesSignal, setRefValuesSignal] = createSignal(refValuesData);

  const refValues = {
    get current() { return refValuesData; },
    set current(value: Values) {
      refValuesData = value;
      setRefValuesSignal(() => value);
      setStateValues(() => value);
    }
  };


  const valuesSnapshot = {
    get current() { return valuesSnapshotData; },
    set current(value: Values) { valuesSnapshotData = value; }
  };

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

    refValues.current = updatedValues;

    if (updateState) {
      setStateValues(() => updatedValues);
    }

    props.onValuesChange?.(updatedValues, previousValues);

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
    valuesSnapshot.current = payload;
  };

  const initialize = (values: Values, onInitialize: () => void) => {
    if (!initialized()) {
      setInitialized(true);
      setValues({ values, updateState: true });
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

  const getValues = () => refValuesSignal();
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

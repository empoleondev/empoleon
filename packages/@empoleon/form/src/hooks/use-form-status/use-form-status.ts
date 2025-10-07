import isEqual from 'fast-deep-equal';
import { createMemo, createSignal } from 'solid-js';
import { getStatus } from '../../get-status';
import { clearListState } from '../../lists';
import { getPath } from '../../paths';
import {
  ClearFieldDirty,
  FormMode,
  FormStatus,
  GetFieldStatus,
  ResetDirty,
  ResetStatus,
  SetCalculatedFieldDirty,
  SetFieldDirty,
  SetFieldTouched,
} from '../../types';
import type { $FormValues } from '../use-form-values/use-form-values';

export interface $FormStatus<Values extends Record<string, any>> {
  touchedState: () => FormStatus;
  dirtyState: () => FormStatus;
  touchedRef: { current: FormStatus }; // Keep React-like interface
  dirtyRef: { current: FormStatus }; // Keep React-like interface
  setTouched: (value: FormStatus | ((current: FormStatus) => FormStatus)) => void;
  setDirty: (
    value: FormStatus | ((current: FormStatus) => FormStatus),
    forceUpdate?: boolean
  ) => void;
  resetDirty: ResetStatus;
  resetTouched: ResetStatus;
  isTouched: GetFieldStatus<Values>;
  setFieldTouched: SetFieldTouched<Values>;
  setFieldDirty: SetFieldDirty<Values>;
  setTouchedState: (value: FormStatus) => void;
  setDirtyState: (value: FormStatus) => void;
  clearFieldDirty: ClearFieldDirty;
  isDirty: GetFieldStatus<Values>;
  getDirty: () => FormStatus;
  getTouched: () => FormStatus;
  setCalculatedFieldDirty: SetCalculatedFieldDirty<Values>;
}

interface UseFormStatusInput<Values extends Record<string, any>> {
  initialDirty: FormStatus;
  initialTouched: FormStatus;
  mode: FormMode;
  $values: $FormValues<Values>;
}

export function useFormStatus<Values extends Record<string, any>>(
  props: UseFormStatusInput<Values>
): $FormStatus<Values> {
  const [touchedState, setTouchedState] = createSignal(props.initialTouched);
  const [dirtyState, setDirtyState] = createSignal(props.initialDirty);

  // Create reactive refs with React-like interface
  let touchedRefData = props.initialTouched;
  let dirtyRefData = props.initialDirty;

  const touchedRef = {
    get current() {
      return touchedRefData;
    },
    set current(value: FormStatus) {
      touchedRefData = value;
    },
  };

  const dirtyRef = {
    get current() {
      return dirtyRefData;
    },
    set current(value: FormStatus) {
      dirtyRefData = value;
    },
  };

  const setTouched = (values: FormStatus | ((current: FormStatus) => FormStatus)) => {
    const resolvedValues = typeof values === 'function' ? values(touchedRef.current) : values;
    touchedRef.current = resolvedValues;

    if (props.mode === 'controlled') {
      setTouchedState(resolvedValues);
    }
  };

  const setDirty = (
    values: FormStatus | ((current: FormStatus) => FormStatus),
    forceUpdate = false
  ) => {
    const resolvedValues = typeof values === 'function' ? values(dirtyRef.current) : values;
    dirtyRef.current = resolvedValues;

    if (props.mode === 'controlled' || forceUpdate) {
      setDirtyState(resolvedValues);
    }
  };

  const resetTouched: ResetStatus = () => setTouched({});

  const resetDirty: ResetDirty<Values> = (values) => {
    const newSnapshot = values
      ? { ...props.$values.refValues.current, ...values }
      : props.$values.refValues.current;
    props.$values.setValuesSnapshot(newSnapshot);
    setDirty({});
  };

  const setFieldTouched: SetFieldTouched<Values> = (path, touched) => {
    setTouched((currentTouched) => {
      if (getStatus(currentTouched, path) === touched) {
        return currentTouched;
      }

      return { ...currentTouched, [path]: touched };
    });
  };

  const setFieldDirty: SetFieldDirty<Values> = (path, dirty, forceUpdate) => {
    setDirty((currentDirty) => {
      if (getStatus(currentDirty, path) === dirty) {
        return currentDirty;
      }

      return { ...currentDirty, [path]: dirty };
    }, forceUpdate);
  };

  const setCalculatedFieldDirty: SetCalculatedFieldDirty<Values> = (path, value) => {
    const currentDirty = getStatus(dirtyRef.current, path);
    const dirty = !isEqual(getPath(path, props.$values.getValuesSnapshot()), value);
    const clearedState = clearListState(path, dirtyRef.current);
    clearedState[path as string] = dirty;
    setDirty(clearedState, currentDirty !== dirty);
  };

  const isTouched: GetFieldStatus<Values> = (path) => getStatus(touchedRef.current, path);

  const clearFieldDirty: ClearFieldDirty = (path) =>
    setDirty((current) => {
      if (typeof path !== 'string') {
        return current;
      }

      const result = clearListState(path, current);
      delete result[path];

      if (isEqual(result, current)) {
        return current;
      }

      return result;
    });

  const isDirty: GetFieldStatus<Values> = (path) => {
    // Access the existing dirtyState signal to establish reactivity
    dirtyState();

    if (path) {
      const overriddenValue = getPath(path, dirtyRef.current);

      if (typeof overriddenValue === 'boolean') {
        return overriddenValue;
      }

      const sliceOfValues = getPath(path, props.$values.getValues());
      const sliceOfInitialValues = getPath(path, props.$values.getValuesSnapshot());
      return !isEqual(sliceOfValues, sliceOfInitialValues);
    }

    const isOverridden = Object.keys(dirtyRef.current).length > 0;

    if (isOverridden) {
      return getStatus(dirtyRef.current);
    }

    const currentValues = props.$values.getValues();
    const snapshotValues = props.$values.getValuesSnapshot();
    return !isEqual(currentValues, snapshotValues);
  };

  const getDirty = () => dirtyRef.current;
  const getTouched = () => touchedRef.current;

  return {
    touchedState,
    dirtyState,
    touchedRef,
    dirtyRef,
    setTouched,
    setDirty,
    resetDirty,
    resetTouched,
    isTouched,
    setFieldTouched,
    setFieldDirty,
    setTouchedState,
    setDirtyState,
    clearFieldDirty,
    isDirty,
    getDirty,
    getTouched,
    setCalculatedFieldDirty,
  };
}

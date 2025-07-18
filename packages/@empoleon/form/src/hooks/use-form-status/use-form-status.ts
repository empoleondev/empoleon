import { createSignal, createMemo } from 'solid-js';
import isEqual from 'fast-deep-equal';
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
  touchedRef: FormStatus;
  dirtyRef: FormStatus;
  setTouched: (value: FormStatus | ((current: FormStatus) => FormStatus)) => void;
  setDirty: (value: FormStatus | ((current: FormStatus) => FormStatus), forceUpdate?: boolean) => void;
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

export function useFormStatus<Values extends Record<string, any>>({
  initialDirty,
  initialTouched,
  mode,
  $values,
}: UseFormStatusInput<Values>): $FormStatus<Values> {
  const [touchedState, setTouchedState] = createSignal(initialTouched);
  const [dirtyState, setDirtyState] = createSignal(initialDirty);

  let touchedRef = initialTouched;
  let dirtyRef = initialDirty;

  const setTouched = (values: FormStatus | ((current: FormStatus) => FormStatus)) => {
    const resolvedValues = typeof values === 'function' ? values(touchedRef) : values;
    touchedRef = resolvedValues;

    if (mode === 'controlled') {
      setTouchedState(resolvedValues);
    }
  };

  const setDirty = (values: FormStatus | ((current: FormStatus) => FormStatus), forceUpdate = false) => {
    const resolvedValues = typeof values === 'function' ? values(dirtyRef) : values;
    dirtyRef = resolvedValues;

    if (mode === 'controlled' || forceUpdate) {
      setDirtyState(resolvedValues);
    }
  };

  const resetTouched: ResetStatus = () => setTouched({});

  const resetDirty: ResetDirty<Values> = (values) => {
    const newSnapshot = values
      ? { ...$values.refValues.current, ...values }
      : $values.refValues.current;
    $values.setValuesSnapshot(newSnapshot);
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
    const currentDirty = getStatus(dirtyRef, path);
    const dirty = !isEqual(getPath(path, $values.getValuesSnapshot()), value);
    const clearedState = clearListState(path, dirtyRef);
    clearedState[path as string] = dirty;
    setDirty(clearedState, currentDirty !== dirty);
  };

  const isTouched: GetFieldStatus<Values> = (path) => getStatus(touchedRef, path);

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
    if (path) {
      const overriddenValue = getPath(path, dirtyRef.current);
      if (typeof overriddenValue === 'boolean') {
        return overriddenValue;
      }

      const sliceOfValues = getPath(path, $values.refValues.current);
      const sliceOfInitialValues = getPath(path, $values.valuesSnapshot.current);
      return !isEqual(sliceOfValues, sliceOfInitialValues);
    }

    const isOverridden = Object.keys(dirtyRef.current).length > 0;
    if (isOverridden) {
      return getStatus(dirtyRef);
    }

    return !isEqual($values.refValues.current, $values.valuesSnapshot.current);
  };

  const getDirty = () => dirtyRef;
  const getTouched = () => touchedRef;

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

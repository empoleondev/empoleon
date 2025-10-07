import { createEffect, onMount } from 'solid-js';
import type {
  _TransformValues,
  ClearErrors,
  ClearFieldError,
  InsertListItem,
  RemoveListItem,
  ReorderListItem,
  Reset,
  ResetDirty,
  ResetStatus,
  SetErrors,
  SetFieldError,
  SetFieldValue,
  SetFormStatus,
  SetInitialValues,
  SetValues,
  UseFormReturnType,
  ValidateField,
} from '../types';

function dispatchEvent(type: string, detail?: any): any {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

function validateFormName(name: string) {
  if (!/^[0-9a-zA-Z-]+$/.test(name)) {
    throw new Error(
      `[@empoleon/use-form] Form name "${name}" is invalid, it should contain only letters, numbers and dashes`
    );
  }
}

export const useIsomorphicEffect = typeof window !== 'undefined' ? onMount : createEffect;

export function createFormActions<FormValues extends Record<string, any> = Record<string, any>>(
  name: string
) {
  validateFormName(name);

  const setFieldValue: SetFieldValue<FormValues> = (path, value) =>
    dispatchEvent(`empoleon-form:${name}:set-field-value`, { path, value });

  const setValues: SetValues<FormValues> = (values) =>
    dispatchEvent(`empoleon-form:${name}:set-values`, values);

  const setInitialValues: SetInitialValues<FormValues> = (values) =>
    dispatchEvent(`empoleon-form:${name}:set-initial-values`, values);

  const setErrors: SetErrors = (errors) =>
    dispatchEvent(`empoleon-form:${name}:set-errors`, errors);

  const setFieldError: SetFieldError<FormValues> = (path, error) =>
    dispatchEvent(`empoleon-form:${name}:set-field-error`, { path, error });

  const clearFieldError: ClearFieldError = (path) =>
    dispatchEvent(`empoleon-form:${name}:clear-field-error`, path);

  const clearErrors: ClearErrors = () => dispatchEvent(`empoleon-form:${name}:clear-errors`);

  const reset: Reset = () => dispatchEvent(`empoleon-form:${name}:reset`);

  const validate: () => void = () => dispatchEvent(`empoleon-form:${name}:validate`);

  const validateField: ValidateField<FormValues> = (path) =>
    dispatchEvent(`empoleon-form:${name}:validate-field`, path);

  const reorderListItem: ReorderListItem<FormValues> = (path, payload) =>
    dispatchEvent(`empoleon-form:${name}:reorder-list-item`, { path, payload });

  const removeListItem: RemoveListItem<FormValues> = (path, index) =>
    dispatchEvent(`empoleon-form:${name}:remove-list-item`, { path, index });

  const insertListItem: InsertListItem<FormValues> = (path, item, index) =>
    dispatchEvent(`empoleon-form:${name}:insert-list-item`, { path, index, item });

  const setDirty: SetFormStatus = (value) =>
    dispatchEvent(`empoleon-form:${name}:set-dirty`, value);

  const setTouched: SetFormStatus = (value) =>
    dispatchEvent(`empoleon-form:${name}:set-touched`, value);

  const resetDirty: ResetDirty<FormValues> = (values) =>
    dispatchEvent(`empoleon-form:${name}:reset-dirty`, values);

  const resetTouched: ResetStatus = () => dispatchEvent(`empoleon-form:${name}:reset-touched`);

  return {
    setFieldValue,
    setValues,
    setInitialValues,
    setErrors,
    setFieldError,
    clearFieldError,
    clearErrors,
    reset,
    validate,
    validateField,
    reorderListItem,
    removeListItem,
    insertListItem,
    setDirty,
    setTouched,
    resetDirty,
    resetTouched,
  };
}

function useFormEvent(eventKey: string | undefined, handler: (event: any) => void) {
  createEffect(() => {
    if (eventKey) {
      window.addEventListener(eventKey, handler);
      return () => window.removeEventListener(eventKey, handler);
    }
    return undefined;
  });
}

export function useFormActions<
  Values = Record<string, unknown>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(name: string | undefined, form: UseFormReturnType<Values, TransformValues>) {
  if (name) {
    validateFormName(name);
  }

  useFormEvent(`empoleon-form:${name}:set-field-value`, (event: CustomEvent) =>
    form.setFieldValue(event.detail.path, event.detail.value)
  );

  useFormEvent(`empoleon-form:${name}:set-values`, (event: CustomEvent) =>
    form.setValues(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:set-initial-values`, (event: CustomEvent) =>
    form.setInitialValues(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:set-errors`, (event: CustomEvent) =>
    form.setErrors(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:set-field-error`, (event: CustomEvent) =>
    form.setFieldError(event.detail.path, event.detail.error)
  );

  useFormEvent(`empoleon-form:${name}:clear-field-error`, (event: CustomEvent) =>
    form.clearFieldError(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:clear-errors`, form.clearErrors);
  useFormEvent(`empoleon-form:${name}:reset`, form.reset);
  useFormEvent(`empoleon-form:${name}:validate`, form.validate);

  useFormEvent(`empoleon-form:${name}:validate-field`, (event: CustomEvent) =>
    form.validateField(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:reorder-list-item`, (event: CustomEvent) =>
    form.reorderListItem(event.detail.path, event.detail.payload)
  );

  useFormEvent(`empoleon-form:${name}:remove-list-item`, (event: CustomEvent) =>
    form.removeListItem(event.detail.path, event.detail.index)
  );

  useFormEvent(`empoleon-form:${name}:insert-list-item`, (event: CustomEvent) =>
    form.insertListItem(event.detail.path, event.detail.item, event.detail.index)
  );

  useFormEvent(`empoleon-form:${name}:set-dirty`, (event: CustomEvent) =>
    form.setDirty(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:set-touched`, (event: CustomEvent) =>
    form.setTouched(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:reset-dirty`, (event: CustomEvent) =>
    form.resetDirty(event.detail)
  );

  useFormEvent(`empoleon-form:${name}:reset-touched`, form.resetTouched);
}

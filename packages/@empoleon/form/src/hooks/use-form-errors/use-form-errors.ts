import { createSignal, createMemo } from 'solid-js';
import { ClearErrors, ClearFieldError, FormErrors, SetErrors, SetFieldError } from '../../types';
import { filterErrors } from './filter-errors/filter-errors';

export interface $FormErrors<Values extends Record<string, any>> {
  errorsState: () => FormErrors;
  setErrors: SetErrors;
  clearErrors: ClearErrors;
  setFieldError: SetFieldError<Values>;
  clearFieldError: ClearFieldError;
}

export function useFormErrors<Values extends Record<string, any>>(
  initialErrors: FormErrors
): $FormErrors<Values> {
  const [errorsState, setErrorsState] = createSignal(filterErrors(initialErrors));

  const setErrors: SetErrors = (errors) => {
    setErrorsState((current) => {
      const newErrors = filterErrors(typeof errors === 'function' ? errors(current) : errors);
      return newErrors;
    });
  };

  const clearErrors: ClearErrors = () => setErrors({});

  const clearFieldError: ClearFieldError = (path) => {
    const current = errorsState();
    if (current[path as string] === undefined) {
      return;
    }

    setErrors((current) => {
      const errors = { ...current };
      delete errors[path as string];
      return errors;
    });
  };

  const setFieldError: SetFieldError<Values> = (path, error) => {
    if (error == null || error === false) {
      clearFieldError(path);
    } else {
      const current = errorsState();
      if (current[path as string] !== error) {
        setErrors((current) => ({ ...current, [path]: error }));
      }
    }
  };

  return {
    errorsState,
    setErrors,
    clearErrors,
    setFieldError,
    clearFieldError,
  };
}

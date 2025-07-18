import { Accessor, createSignal } from 'solid-js';

export function useValidatedState<T>(
  initialValue: T,
  validation: (value: T) => boolean,
  initialValidationState?: boolean
): [
  {
    value: Accessor<T>;
    lastValidValue: Accessor<T | undefined>;
    valid: Accessor<boolean>;
  },
  (val: T) => void
] {
  const [value, setValue] = createSignal(initialValue);
  const [lastValidValue, setLastValidValue] = createSignal(
    validation(initialValue) ? initialValue : undefined
  );
  const [valid, setValid] = createSignal(
    typeof initialValidationState === 'boolean' ? initialValidationState : validation(initialValue)
  );

  const onChange = (val: T) => {
    if (validation(val)) {
      setLastValidValue(() => val);
      setValid(true);
    } else {
      setValid(false);
    }

    setLastValidValue(() => val);
  };

  return [{ value, lastValidValue, valid }, onChange];
}

import { createEffect, createSignal } from 'solid-js';
import { useThrottledCallbackWithClearTimeout } from '../use-throttled-callback/use-throttled-callback';

export function useThrottledValue<T>(value: T, wait: number) {
  const [throttledValue, setThrottledValue] = createSignal(value);
  let valueRef = value;

  const [throttledSetValue, clearTimeout] = useThrottledCallbackWithClearTimeout(
    (newValue: T) => setThrottledValue(() => newValue),
    wait
  );

  createEffect(() => {
    if (value !== valueRef) {
      valueRef = value;
      throttledSetValue()(value);
    }
  });

  createEffect(() => clearTimeout);

  return throttledValue;
}

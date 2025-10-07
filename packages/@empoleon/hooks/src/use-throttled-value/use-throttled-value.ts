import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';
import { useThrottledCallbackWithClearTimeout } from '../use-throttled-callback/use-throttled-callback';

export function useThrottledValue<T>(valueAccessor: Accessor<T>, wait: number) {
  const [throttledValue, setThrottledValue] = createSignal(valueAccessor());

  const [throttledSetValue, clearTimeout] = useThrottledCallbackWithClearTimeout((newValue: T) => {
    setThrottledValue(() => newValue);
  }, wait);

  createEffect(() => {
    const currentValue = valueAccessor();
    throttledSetValue()(currentValue);
  });

  onCleanup(() => {
    clearTimeout();
  });

  return throttledValue;
}

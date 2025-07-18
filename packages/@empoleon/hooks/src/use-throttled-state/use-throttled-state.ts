import { createSignal, onCleanup } from 'solid-js';
import { useThrottledCallbackWithClearTimeout } from '../use-throttled-callback/use-throttled-callback';

export function useThrottledState<T = any>(defaultValue: T, wait: number) {
  const [value, setValue] = createSignal(defaultValue);

  const [setThrottledValue, clearTimeout] = useThrottledCallbackWithClearTimeout(setValue, wait);

  onCleanup(() => clearTimeout());

  return [value, setThrottledValue] as const;
}

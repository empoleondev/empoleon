import { createSignal, onCleanup } from 'solid-js';

export function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options = { leading: false }
) {
  const [value, setValue] = createSignal(defaultValue);
  let timeoutRef: number | null = null;
  let leadingRef = true;

  const clearTimeout = () => window.clearTimeout(timeoutRef!);
  onCleanup(() => clearTimeout());

  const debouncedSetValue = (newValue: T | ((prev: T) => T)) => {
    clearTimeout();
    if (leadingRef && options.leading) {
      setValue(newValue as any);
    } else {
      timeoutRef = window.setTimeout(() => {
        leadingRef = true;
        setValue(newValue as any);
      }, wait);
    }
    leadingRef = false;
  };

  return [value, debouncedSetValue] as const;
}

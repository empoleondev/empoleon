import { createSignal, createEffect, onCleanup } from 'solid-js';

export function useDebouncedValue<T = any>(value: T, wait: number, options = { leading: false }) {
  const [_value, setValue] = createSignal(value);
  let mountedRef = false;
  let timeoutRef: number | null = null;
  let cooldownRef = false;

  const cancel = () => window.clearTimeout(timeoutRef!);

  createEffect(() => {
    if (mountedRef) {
      if (!cooldownRef && options.leading) {
        cooldownRef = true;
        setValue(() => value);
      } else {
        cancel();
        timeoutRef = window.setTimeout(() => {
          cooldownRef = false;
          setValue(() => value);
        }, wait);
      }
    }
  });

  // Mount effect
  createEffect(() => {
    mountedRef = true;
  });

  onCleanup(cancel);

  return [_value, cancel] as const;
}

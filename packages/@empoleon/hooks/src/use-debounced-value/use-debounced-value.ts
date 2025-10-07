import { Accessor, createEffect, createSignal, onCleanup } from 'solid-js';

export function useDebouncedValue<T = any>(
  valueAccessor: Accessor<T>,
  wait: number,
  options = { leading: false }
) {
  const [_value, setValue] = createSignal(valueAccessor());
  let timeoutRef: number | null = null;
  let cooldownRef = false;

  const cancel = () => {
    if (timeoutRef !== null) {
      window.clearTimeout(timeoutRef);
      timeoutRef = null;
    }
  };

  createEffect(() => {
    const value = valueAccessor();

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
  });

  onCleanup(cancel);

  return [_value, cancel] as const;
}

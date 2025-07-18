import { createDebounce } from "@solid-primitives/debounce";
import { onCleanup } from "solid-js";

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  options: number | { delay: number; flushOnUnmount?: boolean }
): T & { flush: () => void } {
  const delay = typeof options === "number" ? options : options.delay;
  const flushOnUnmount = typeof options === "number" ? false : options.flushOnUnmount;
  let lastArgs: any[] = [];

  // createDebounce returns a debounced fn with .clear()
  const debouncedFn = createDebounce((...args: any[]) => {
    callback(...args);
  }, delay);

  const wrapped = ((...args: any[]) => {
    lastArgs = args;
    debouncedFn(...args);
  }) as T & { flush: () => void };

  // flush method: cancel pending and invoke immediately
  wrapped.flush = () => {
    debouncedFn.clear();
    if (lastArgs.length) callback(...lastArgs);
  };

  // cleanup on unmount
  onCleanup(() => {
    debouncedFn.clear();
    if (flushOnUnmount) wrapped.flush();
  });

  return wrapped;
}

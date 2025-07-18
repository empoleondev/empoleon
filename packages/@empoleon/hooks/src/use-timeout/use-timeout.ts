import { onMount, onCleanup } from 'solid-js';

export function useTimeout(
  callback: (...args: any[]) => void,
  delay: number,
  options: { autoInvoke?: boolean } = { autoInvoke: false }
) {
  let timerId: number | null = null;

  const start = (...params: any[]) => {
    if (timerId == null) {
      timerId = window.setTimeout(() => {
        callback(...params);
        timerId = null;
      }, delay);
    }
  };

  const clear = () => {
    if (timerId != null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  onMount(() => {
    if (options.autoInvoke) start();
  });

  onCleanup(() => clear());

  return { start, clear };
}

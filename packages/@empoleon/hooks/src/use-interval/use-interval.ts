import { createSignal, createEffect, onCleanup } from 'solid-js';

interface UseIntervalOptions {
  /** If set, the interval will start automatically when the component is mounted, `false` by default */
  autoInvoke?: boolean;
}

export function useInterval(
  fn: () => void,
  interval: number,
  { autoInvoke = false }: UseIntervalOptions = {}
) {
  const [active, setActive] = createSignal(false);
  let intervalRef: number | null = null;
  let fnRef: (() => void) | null = null;

  const start = () => {
    setActive((old) => {
      if (!old && (!intervalRef || intervalRef === -1)) {
        intervalRef = window.setInterval(fnRef!, interval);
      }
      return true;
    });
  };

  const stop = () => {
    setActive(false);
    window.clearInterval(intervalRef || -1);
    intervalRef = -1;
  };

  const toggle = () => {
    if (active()) {
      stop();
    } else {
      start();
    }
  };

  createEffect(() => {
    fnRef = fn;
    if (active()) {
      start();
    }
  });

  createEffect(() => {
    if (autoInvoke) {
      start();
    }
  });

  onCleanup(() => {
    stop();
  });

  return { start, stop, toggle, active };
}

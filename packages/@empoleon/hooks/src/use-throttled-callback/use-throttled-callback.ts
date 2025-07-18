import { createEffect, createMemo } from 'solid-js';
import { useCallbackRef } from "../use-callback-ref/use-callback-ref";

export function useThrottledCallbackWithClearTimeout<T extends (...args: any[]) => any>(
  callback: T,
  wait: number
) {
  const handleCallback = useCallbackRef(callback);
  let latestInArgsRef: Parameters<T> | null = null;
  let latestOutArgsRef: Parameters<T> | null = null;
  let active = true;
  let waitRef = wait;
  let timeoutRef = -1;

  const clearTimeout = () => window.clearTimeout(timeoutRef);

  const callThrottledCallback = createMemo(() =>
    (...args: Parameters<T>) => {
      handleCallback(...(args as any));
      latestInArgsRef = args;
      latestOutArgsRef = args;
      active = false;
    }
  );

  const timerCallback = createMemo(() => () => {
    if (latestInArgsRef && latestInArgsRef !== latestOutArgsRef) {
      callThrottledCallback().apply(null, latestInArgsRef);

      timeoutRef = window.setTimeout(timerCallback(), waitRef);
    } else {
      active = true;
    }
  });

  const throttled = createMemo(() =>
    (...args: Parameters<T>) => {
      if (active) {
        callThrottledCallback().apply(null, args);
        timeoutRef = window.setTimeout(timerCallback(), waitRef);
      } else {
        latestInArgsRef = args;
      }
    }
  );

  createEffect(() => {
    waitRef = wait;
  });

  return [throttled, clearTimeout] as const;
}

export function useThrottledCallback<T extends (...args: any[]) => any>(callback: T, wait: number) {
  return useThrottledCallbackWithClearTimeout(callback, wait)[0];
}

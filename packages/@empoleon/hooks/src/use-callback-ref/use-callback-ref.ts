import { createEffect, createMemo } from 'solid-js';

export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  let callbackRef = callback;

  createEffect(() => {
    callbackRef = callback;
  });

  return ((...args) => callbackRef?.(...args)) as T;
}

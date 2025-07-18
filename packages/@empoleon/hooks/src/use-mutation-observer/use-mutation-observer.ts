import { createEffect, onCleanup } from 'solid-js';

export function useMutationObserver<T extends HTMLElement = any>(
  callback: MutationCallback,
  options: MutationObserverInit,
  target?: HTMLElement | (() => HTMLElement) | null
) {
  let observer: MutationObserver | null = null;
  let ref: T | null = null;

  createEffect(() => {
    const targetElement = typeof target === 'function' ? target() : target;

    if (targetElement || ref) {
      observer = new MutationObserver(callback);
      observer.observe(targetElement || ref!, options);
    }

    onCleanup(() => {
      observer?.disconnect();
    });
  });

  return (el: T) => ref = el;
}

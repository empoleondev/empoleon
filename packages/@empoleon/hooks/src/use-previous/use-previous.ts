import { Accessor, createEffect, createSignal, on } from 'solid-js';

/**
 * Tracks the previous value of a reactive accessor.
 * @param value The reactive accessor to track.
 * @returns An accessor for the previous value.
 */
export function usePrevious<T>(value: Accessor<T>): Accessor<T | undefined> {
  const [prev, setPrev] = createSignal<T | undefined>();

  createEffect(
    on(value, (_, prevValue) => {
      setPrev(() => prevValue);
    })
  );

  return prev;
}

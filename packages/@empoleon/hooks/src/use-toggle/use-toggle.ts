import { createSignal } from 'solid-js';

export function useToggle<T = boolean>(options: readonly T[] = [false, true] as any) {
  const [state, setState] = createSignal<T[]>(options as T[]);

  const toggle = (action?: T | ((current: T) => T)) => {
    setState(prevState => {
      if (action === undefined) {
        return prevState.slice(1).concat(prevState[0]);
      }

      const value = typeof action === 'function'
        ? (action as (current: T) => T)(prevState[0])
        : action;

      const index = prevState.indexOf(value);
      if (index === -1) return prevState;

      return prevState.slice(index).concat(prevState.slice(0, index));
    });
  };

  return [() => state()[0], toggle] as const;
}

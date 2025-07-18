import { createSignal } from 'solid-js';

export function useSetState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = createSignal(initialState);

  const _setState = (statePartial: Partial<T> | ((currentState: T) => Partial<T>)) =>
    setState((current) => ({
      ...current,
      ...(typeof statePartial === 'function' ? statePartial(current) : statePartial),
    }));

  return [state, _setState] as const;
}

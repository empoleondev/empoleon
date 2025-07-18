import { createSignal, createMemo, Accessor } from 'solid-js';

export interface StateHistory<T> {
  history: T[];
  current: number;
}

export interface UseStateHistoryHandlers<T> {
  set: (value: T) => void;
  back: (steps?: number) => void;
  forward: (steps?: number) => void;
  reset: () => void;
}

export function useStateHistory<T>(
  initialValue: T
): [Accessor<T>, Accessor<UseStateHistoryHandlers<T>>, Accessor<StateHistory<T>>] {
  const [state, setState] = createSignal({
    history: [initialValue],
    current: 0,
  });

  const set = (val: T) =>
    setState((currentState) => {
      const nextState = [...currentState.history.slice(0, currentState.current + 1), val];
      return {
        history: nextState,
        current: nextState.length - 1,
      };
    });

  const back = (steps = 1) =>
    setState((currentState) => ({
      history: currentState.history,
      current: Math.max(0, currentState.current - steps),
    }));

  const forward = (steps = 1) =>
    setState((currentState) => ({
      history: currentState.history,
      current: Math.min(currentState.history.length - 1, currentState.current + steps),
    }));

  const reset = () => {
    setState({ history: [initialValue], current: 0 });
  };

  const handlers = createMemo(() => ({ back, forward, reset, set }));

  return [() => state().history[state().current], handlers, state];
}

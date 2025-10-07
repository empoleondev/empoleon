import { createEffect, createSignal, onCleanup } from 'solid-js';

export type EmpoleonStoreSubscriber<Value> = (value: Value) => void;
type SetStateCallback<Value> = (value: Value) => Value;

export interface EmpoleonStore<Value> {
  getState: () => Value;
  setState: (value: Value | SetStateCallback<Value>) => void;
  updateState: (value: Value | SetStateCallback<Value>) => void;
  initialize: (value: Value) => void;
  subscribe: (callback: EmpoleonStoreSubscriber<Value>) => () => void;
}

export type EmpoleonStoreValue<Store extends EmpoleonStore<any>> = ReturnType<Store['getState']>;

export function createStore<Value extends Record<string, any>>(
  initialState: Value
): EmpoleonStore<Value> {
  let state = initialState;
  let initialized = false;
  const listeners = new Set<EmpoleonStoreSubscriber<Value>>();

  return {
    getState() {
      return state;
    },

    updateState(value) {
      state = typeof value === 'function' ? value(state) : value;
    },

    setState(value) {
      this.updateState(value);
      listeners.forEach((listener) => listener(state));
    },

    initialize(value) {
      if (!initialized) {
        state = value;
        initialized = true;
      }
    },

    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
}

export function useStore<Store extends EmpoleonStore<any>>(store: Store) {
  const [state, setState] = createSignal(store.getState());

  createEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(() => newState);
    });

    onCleanup(unsubscribe);
  });

  return state;
}

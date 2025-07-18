import { createContext, JSX, useContext } from 'solid-js';

export function createOptionalContext<ContextValue>(initialValue: ContextValue | null = null) {
  const Context = createContext<ContextValue | null>(initialValue);

  const useOptionalContext = () => useContext(Context);

  const Provider = (props: { value: ContextValue; children: JSX.Element }) => (
    <Context.Provider value={props.value}>{props.children}</Context.Provider>
  );

  return [Provider, useOptionalContext] as const;
}

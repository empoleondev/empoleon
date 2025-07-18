import { createSignal, JSX } from 'solid-js';
import { createOptionalContext, getDefaultZIndex } from '../../core';

interface DrawerStackContext {
  stack: string[];
  addModal: (id: string, zIndex: number | string) => void;
  removeModal: (id: string) => void;
  getZIndex: (id: string) => string;
  currentId: string;
  maxZIndex: string | number;
}

const [DrawerStackProvider, useDrawerStackContext] = createOptionalContext<DrawerStackContext>();

export { useDrawerStackContext };

export interface DrawerStackProps {
  children: JSX.Element;
}

export function DrawerStack(props: DrawerStackProps) {
  const [stack, setStack] = createSignal<string[]>([]);
  const [maxZIndex, setMaxZIndex] = createSignal<number | string>(getDefaultZIndex('modal'));

  return (
    <DrawerStackProvider
      value={{
        stack: stack(),
        addModal: (id, zIndex) => {
          setStack((current) => [...new Set([...current, id])]);
          setMaxZIndex((current) =>
            typeof zIndex === 'number' && typeof current === 'number'
              ? Math.max(current, zIndex)
              : current
          );
        },
        removeModal: (id) => setStack((current) => current.filter((currentId) => currentId !== id)),
        getZIndex: (id) => `calc(${maxZIndex} + ${stack().indexOf(id)} + 1)`,
        currentId: stack()[stack().length - 1],
        maxZIndex: maxZIndex(),
      }}
    >
      {props.children}
    </DrawerStackProvider>
  );
}

DrawerStack.displayName = '@empoleon/core/DrawerStack';

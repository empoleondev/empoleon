import { createSignal, JSX, splitProps } from 'solid-js';
import { createOptionalContext, getDefaultZIndex } from '../../core';

interface ModalStackContext {
  stack: string[];
  addModal: (id: string, zIndex: number | string) => void;
  removeModal: (id: string) => void;
  getZIndex: (id: string) => string;
  currentId: string;
  maxZIndex: string | number;
}

const [ModalStackProvider, useModalStackContext] = createOptionalContext<ModalStackContext>();

export { useModalStackContext };

export interface ModalStackProps {
  children: JSX.Element;
}

export function ModalStack(props: ModalStackProps) {
  const [local] = splitProps(props, ['children']);
  const [stack, setStack] = createSignal<string[]>([]);
  const [maxZIndex, setMaxZIndex] = createSignal<number | string>(getDefaultZIndex('modal'));

  return (
    <ModalStackProvider
      value={{
        get stack() { return stack(); },
        addModal: (id, zIndex) => {
          setStack((current) => [...new Set([...current, id])]);
          setMaxZIndex((current) =>
            typeof zIndex === 'number' && typeof current === 'number'
              ? Math.max(current, zIndex)
              : current
          );
        },
        removeModal: (id) => setStack((current) => current.filter((currentId) => currentId !== id)),
        getZIndex: (id) => `calc(${maxZIndex()} + ${stack().indexOf(id)} + 1)`,
        get currentId() { return stack()[stack().length - 1]; },
        get maxZIndex() { return maxZIndex(); },
      }}
    >
      {local.children}
    </ModalStackProvider>
  );
}

ModalStack.displayName = '@empoleon/core/ModalStack';

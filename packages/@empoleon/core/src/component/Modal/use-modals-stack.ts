import { createMemo, createSignal } from "solid-js";

interface ModalStackReturnType<T extends string> {
  state: () => Record<T, boolean>;
  open: (id: T) => void;
  close: (id: T) => void;
  toggle: (id: T) => void;
  closeAll: () => void;
  register: (id: T) => { opened: () => boolean; onClose: () => void; stackId: T };
}

export function useModalsStack<const T extends string>(modals: T[]): ModalStackReturnType<T> {
  const initialState = modals.reduce(
    (acc, modal) => ({ ...acc, [modal]: false }),
    {} as Record<T, boolean>
  );

  const [state, setState] = createSignal(initialState);

  const openedMemos = modals.reduce((acc, modal) => {
    acc[modal] = createMemo(() => state()[modal]);
    return acc;
  }, {} as Record<T, () => boolean>);

  const open = (modal: T) => {
    setState((current) => ({ ...current, [modal]: true }));
  };

  const close = (modal: T) => setState((current) => ({ ...current, [modal]: false }));

  const toggle = (modal: T) => setState((current) => ({ ...current, [modal]: !current[modal] }));

  const closeAll = () => setState(() => initialState);

  const register = (modal: T) => ({
    opened: openedMemos[modal],
    onClose: () => close(modal),
    stackId: modal,
  });

  return { state, open, close, closeAll, toggle, register };
}

export const useDrawersStack = useModalsStack;

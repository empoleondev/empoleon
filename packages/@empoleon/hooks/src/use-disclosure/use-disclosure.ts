import { createSignal } from 'solid-js';

export function useDisclosure(
  initialState = false,
  callbacks?: { onOpen?: () => void; onClose?: () => void }
) {
  const { onOpen, onClose } = callbacks || {};
  const [opened, setOpened] = createSignal(initialState);

  const open = () => {
    if (!opened()) {
      onOpen?.();
      setOpened(true);
    }
  };

  const close = () => {
    if (opened()) {
      onClose?.();
      setOpened(false);
    }
  };

  const toggle = () => {
    opened() ? close() : open();
  };

  return [opened, { open, close, toggle }] as const;
}

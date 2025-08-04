import { onCleanup } from "solid-js";

export interface UseDelayedHoverInput {
  open: () => void;
  close: () => void;
  openDelay?: number;
  closeDelay?: number;
}

export function useDelayedHover(props: UseDelayedHoverInput) {
  let openTimeout: number;
  let closeTimeout: number;

  const clearTimeouts = () => {
    clearTimeout(openTimeout);
    clearTimeout(closeTimeout);
  };

  const openDropdown = () => {
    clearTimeouts();
    const { open, openDelay } = props;
    if (openDelay === 0 || openDelay == null) {
      open();
    } else {
      openTimeout = window.setTimeout(open, openDelay);
    }
  };

  const closeDropdown = () => {
    clearTimeouts();
    const { close, closeDelay } = props;
    if (closeDelay === 0 || closeDelay == null) {
      close();
    } else {
      closeTimeout = window.setTimeout(close, closeDelay);
    }
  };

  // Ensure timers are cleared when the component using this hook is unmounted
  onCleanup(clearTimeouts);

  return { openDropdown, closeDropdown };
}

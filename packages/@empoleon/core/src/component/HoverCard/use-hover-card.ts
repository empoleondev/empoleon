import { createSignal, createMemo, onCleanup, Accessor } from 'solid-js';
import {
  useDelayGroup,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  autoUpdate,
} from '@empoleon/solid-floating-ui';
import { useId } from '@empoleon/hooks';
import { useHoverCardGroupContext } from './HoverCardGroup/HoverCardGroup.context';

interface UseHoverCard {
  openDelay?: number;
  closeDelay?: number;
  opened?: Accessor<boolean>;
  defaultOpened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useHoverCard(settings: UseHoverCard) {
  const [uncontrolledOpened, setUncontrolledOpened] = createSignal(settings.defaultOpened || false);
  const controlled = typeof settings.opened === 'function';
  const withinGroup = useHoverCardGroupContext();
  const uid = useId();

  const opened = createMemo<boolean>(() =>
    controlled ? (settings.opened ? settings.opened() : false) : uncontrolledOpened()
  );

  let openTimeout: number = -1;
  let closeTimeout: number = -1;

  const clearTimeouts = () => {
    window.clearTimeout(openTimeout);
    window.clearTimeout(closeTimeout);
  };

  const onChange = (_opened: boolean) => {
    if (!controlled) {
      setUncontrolledOpened(_opened);
    }

    if (_opened) {
      delayGroup.setCurrentId(uid);
      settings.onOpen?.();
    } else {
      settings.onClose?.();
    }
  };

  const [referenceElement, setReferenceElement] = createSignal<HTMLElement | undefined>(undefined);
  const [floatingElement, setFloatingElement] = createSignal<HTMLElement | undefined>(undefined);

  const floating = useFloating({
    open: () => opened(),
    onOpenChange: onChange,
    elements: () => ({
      reference: referenceElement(),
      floating: floatingElement(),
    }),
    whileElementsMounted: autoUpdate,
  });

  const delayGroup = useDelayGroup(() => floating.context, { id: uid });

  const interactions = useInteractions([
    useHover(() => floating.context, () => ({
      enabled: true,
      delay: withinGroup ? delayGroup.delay : { open: settings.openDelay, close: settings.closeDelay },
    }))(),

    useRole(floating.context, { role: 'dialog' }),

    useDismiss(() => floating.context, {
      enabled: typeof settings.opened === 'undefined',
    }),
  ]);

  const openDropdown = () => {
    if (withinGroup) {
      return;
    }

    clearTimeouts();
    if (settings.openDelay === 0 || settings.openDelay === undefined) {
      onChange(true);
    } else {
      openTimeout = window.setTimeout(() => onChange(true), settings.openDelay);
    }
  };

  const closeDropdown = () => {
    if (withinGroup) {
      return;
    }

    clearTimeouts();
    if (settings.closeDelay === 0 || settings.closeDelay === undefined) {
      onChange(false);
    } else {
      closeTimeout = window.setTimeout(() => onChange(false), settings.closeDelay);
    }
  };

  onCleanup(() => clearTimeouts());

  return {
    opened,
    reference: setReferenceElement,
    floating: setFloatingElement,
    getReferenceProps: interactions.getReferenceProps,
    getFloatingProps: interactions.getFloatingProps,
    openDropdown,
    closeDropdown,
    x: () => floating.x,
    y: () => floating.y,
  };
}

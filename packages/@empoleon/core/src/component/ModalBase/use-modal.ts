import { useFocusReturn, useId, useWindowEvent } from '@empoleon/hooks';
import { TransitionOverride } from '../Transition';
import { useLockScroll } from './use-lock-scroll';
import { createSignal } from 'solid-js';

interface UseModalInput {
  opened: () => boolean;
  onClose: () => void;
  id: string | undefined;
  transitionProps: TransitionOverride | undefined;
  trapFocus: () => boolean | undefined;
  closeOnEscape: () => boolean | undefined;
  returnFocus: () => boolean | undefined;
}

export function useModal(props: UseModalInput) {
  const _id = useId(props.id);
  const [titleMounted, setTitleMounted] = createSignal(false);
  const [bodyMounted, setBodyMounted] = createSignal(false);

  const transitionDuration =
    typeof props.transitionProps?.duration === 'number' ? props.transitionProps?.duration : 200;

  const shouldLockScroll = useLockScroll({ opened: () => props.opened(), transitionDuration });

  useWindowEvent(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && props.closeOnEscape() && !event.isComposing && props.opened()) {
        const shouldTrigger =
          (event.target as HTMLElement)?.getAttribute('data-empoleon-stop-propagation') !== 'true';
        shouldTrigger && props.onClose();
      }
    },
    { capture: true }
  );

  useFocusReturn({ opened: () => props.opened(), shouldReturnFocus: () => !!(props.trapFocus() && props.returnFocus()) });

  return {
    _id,
    titleMounted,
    bodyMounted,
    shouldLockScroll,
    setTitleMounted,
    setBodyMounted,
  };
}

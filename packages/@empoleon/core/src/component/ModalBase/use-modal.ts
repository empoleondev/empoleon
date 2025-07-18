import { useFocusReturn, useId, useWindowEvent } from '@empoleon/hooks';
import { TransitionOverride } from '../Transition';
import { useLockScroll } from './use-lock-scroll';
import { createEffect, createSignal, splitProps } from 'solid-js';

interface UseModalInput {
  opened: () => boolean;
  onClose: () => void;
  id: string | undefined;
  transitionProps: TransitionOverride | undefined;
  trapFocus: boolean | undefined;
  closeOnEscape: boolean | undefined;
  returnFocus: boolean | undefined;
}

export function useModal(props: UseModalInput) {
  const [local] = splitProps(props, [
    'id',
    'transitionProps',
    'opened',
    'trapFocus',
    'closeOnEscape',
    'onClose',
    'returnFocus',
  ])

  const _id = useId(local.id);
  const [titleMounted, setTitleMounted] = createSignal(false);
  const [bodyMounted, setBodyMounted] = createSignal(false);

  const transitionDuration =
    typeof local.transitionProps?.duration === 'number' ? local.transitionProps?.duration : 200;

  const shouldLockScroll = useLockScroll({ opened: () => local.opened(), transitionDuration });

  useWindowEvent(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && local.closeOnEscape && !event.isComposing && local.opened()) {
        const shouldTrigger =
          (event.target as HTMLElement)?.getAttribute('data-empoleon-stop-propagation') !== 'true';
        shouldTrigger && local.onClose();
      }
    },
    { capture: true }
  );

  useFocusReturn({ opened: () => local.opened(), shouldReturnFocus: () => !!(local.trapFocus && local.returnFocus) });

  createEffect(() => {
    console.log('useModal opened:', local.opened);
    console.log('useModal shouldLockScroll:', shouldLockScroll());
  })

  return {
    _id,
    titleMounted,
    bodyMounted,
    shouldLockScroll,
    setTitleMounted,
    setBodyMounted,
  };
}

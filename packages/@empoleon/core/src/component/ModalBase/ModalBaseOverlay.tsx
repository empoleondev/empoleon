import { ElementProps } from '../../core';
import { Overlay, OverlayProps } from '../Overlay';
import { Transition, TransitionOverride } from '../Transition';
import { useModalBaseContext } from './ModalBase.context';
import { useModalTransition } from './use-modal-transition';
import { splitProps } from 'solid-js';

export interface ModalBaseOverlayProps
  extends Omit<OverlayProps, 'styles' | 'classNames' | 'variant' | 'vars'>,
    ElementProps<'div', 'color'> {
  /** Props passed down to the `Transition` component */
  transitionProps?: TransitionOverride;

  /** Determines whether the overlay should be visible. By default, has the same value as `opened` state. */
  visible?: boolean;
}

export function ModalBaseOverlay(props: ModalBaseOverlayProps) {
  const [local, others] = splitProps(props, [
    'onClick',
    'transitionProps',
    'style',
    'visible',
    'ref'
  ]);

  const ctx = useModalBaseContext();
  const transition = useModalTransition(local.transitionProps);

  return (
    <Transition
      mounted={local.visible !== undefined ? local.visible : ctx.opened()}
      {...transition}
      transition="fade"
    >
      {(transitionStyles) => (
        <Overlay
          ref={local.ref}
          fixed
          style={[local.style, transitionStyles]}
          zIndex={ctx.zIndex}
          unstyled={ctx.unstyled}
          onClick={(event) => {
            typeof local.onClick === "function" && local.onClick?.(event);
            ctx.closeOnClickOutside() && ctx.onClose();
          }}
          {...others}
        />
      )}
    </Transition>
  );
}

ModalBaseOverlay.displayName = '@empoleon/core/ModalBaseOverlay';

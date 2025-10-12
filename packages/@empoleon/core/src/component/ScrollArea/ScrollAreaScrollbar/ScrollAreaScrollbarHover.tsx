import { createEffect, createSignal, onCleanup, Show, splitProps } from 'solid-js';
import { useScrollAreaContext } from '../ScrollArea.context';
import { ScrollAreaScrollbarAuto, ScrollAreaScrollbarAutoProps } from './ScrollAreaScrollbarAuto';

export interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: true;
}

export function ScrollAreaScrollbarHover(props: ScrollAreaScrollbarHoverProps) {
  const [local, others] = splitProps(props, ['forceMount', 'ref', 'orientation']);
  const ctx = useScrollAreaContext();
  const [visible, setVisible] = createSignal(false);

  createEffect(() => {
    const el = ctx.scrollArea;
    if (!el) {
      return;
    }

    let hideTimer: number = 0;

    const handlePointerEnter = () => {
      window.clearTimeout(hideTimer);
      setVisible(true);
    };

    const handlePointerLeave = () => {
      hideTimer = window.setTimeout(() => setVisible(false), ctx.scrollHideDelay);
    };

    el.addEventListener('pointerenter', handlePointerEnter);
    el.addEventListener('pointerleave', handlePointerLeave);

    onCleanup(() => {
      window.clearTimeout(hideTimer);
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointerleave', handlePointerLeave);
    });
  });

  return (
    <Show when={local.forceMount || visible()} fallback={null}>
      <ScrollAreaScrollbarAuto
        data-state={visible() ? 'visible' : 'hidden'}
        orientation={local.orientation}
        {...others}
        ref={local.ref}
      />
    </Show>
  );
}

ScrollAreaScrollbarHover.displayName = '@empoleon/core/ScrollAreaScrollbarHover';

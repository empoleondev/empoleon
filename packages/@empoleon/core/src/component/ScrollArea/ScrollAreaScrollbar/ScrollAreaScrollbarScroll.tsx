import {
  createSignal,
  createEffect,
  onCleanup,
  splitProps,
  Show,
} from 'solid-js';
import { useDebouncedCallback } from '@empoleon/hooks';
import { useScrollAreaContext } from '../ScrollArea.context';
import { composeEventHandlers } from '../utils';
import {
  ScrollAreaScrollbarVisible,
  ScrollAreaScrollbarVisibleProps,
} from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarScrollProps
  extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export function ScrollAreaScrollbarScroll(props: ScrollAreaScrollbarScrollProps) {
  const [local, others] = splitProps(props, ['forceMount', 'ref', 'orientation']);
  const ctx = useScrollAreaContext();
  const [state, setState] = createSignal<'hidden' | 'idle' | 'interacting' | 'scrolling'>('hidden');
  const debounceScrollEnd = useDebouncedCallback(() => setState('idle'), 100);

  createEffect(() => {
    if (state() === 'idle') {
      const hideTimer = window.setTimeout(() => setState('hidden'), ctx.scrollHideDelay);
      onCleanup(() => window.clearTimeout(hideTimer));
    }
  });

  createEffect(() => {
    const el = ctx.viewport;
    if (!el) return;
    let prev = el[local.orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop'];
    const handleScroll = () => {
      const pos = el[local.orientation === 'horizontal' ? 'scrollLeft' : 'scrollTop'];
      if (pos !== prev) {
        setState('scrolling');
        debounceScrollEnd();
        prev = pos;
      }
    };
    el.addEventListener('scroll', handleScroll);
    onCleanup(() => el.removeEventListener('scroll', handleScroll));
  });

  return (
    <Show when={local.forceMount || state() !== 'hidden'} fallback={null}>
      <ScrollAreaScrollbarVisible
        data-state={state() === 'hidden' ? 'hidden' : 'visible'}
        {...others}
        ref={local.ref}
        onPointerEnter={composeEventHandlers(props.onPointerEnter, () => setState('interacting'))}
        onPointerLeave={composeEventHandlers(props.onPointerLeave, () => setState('idle'))}
      />
    </Show>
  );
}

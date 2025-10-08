import { createEffect, onCleanup, Show, splitProps } from 'solid-js';
import { useScrollAreaContext } from '../ScrollArea.context';
import { ScrollAreaScrollbarAuto } from './ScrollAreaScrollbarAuto';
import { ScrollAreaScrollbarHover } from './ScrollAreaScrollbarHover';
import { ScrollAreaScrollbarScroll } from './ScrollAreaScrollbarScroll';
import {
  ScrollAreaScrollbarVisible,
  ScrollAreaScrollbarVisibleProps,
} from './ScrollAreaScrollbarVisible';

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true;
}

export function ScrollAreaScrollbar(props: ScrollAreaScrollbarProps) {
  const [local, others] = splitProps(props, ['forceMount', 'ref']);

  const ctx = useScrollAreaContext();
  const isHorizontal = () => props.orientation === 'horizontal';

  createEffect(() => {
    if (isHorizontal()) {ctx.onScrollbarXEnabledChange(true)}
    else {ctx.onScrollbarYEnabledChange(true)};

    onCleanup(() => {
      if (isHorizontal()) {ctx.onScrollbarXEnabledChange(false)}
      else {ctx.onScrollbarYEnabledChange(false);}
    });
  });

  return (
    <>
      <Show when={ctx.type === 'hover'}>
        <ScrollAreaScrollbarHover {...others} ref={local.ref} forceMount={local.forceMount} />
      </Show>
      <Show when={ctx.type === 'scroll'}>
        <ScrollAreaScrollbarScroll {...others} ref={local.ref} forceMount={local.forceMount} />
      </Show>
      <Show when={ctx.type === 'auto'}>
        <ScrollAreaScrollbarAuto {...others} ref={local.ref} forceMount={local.forceMount} />
      </Show>
      <Show when={ctx.type === 'always'}>
        <ScrollAreaScrollbarVisible {...others} ref={local.ref} />
      </Show>
    </>
  );
}

ScrollAreaScrollbar.displayName = '@empoleon/core/ScrollAreaScrollbar';

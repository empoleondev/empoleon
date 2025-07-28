import { createSignal, createEffect, onCleanup } from 'solid-js';
import type { Accessor, JSX } from 'solid-js';

function getAutoHeightDuration(height: number | string) {
  if (!height || typeof height === 'string') return 0;
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function getElementHeight(el?: HTMLElement | null) {
  return el ? el.scrollHeight : 'auto';
}

interface UseCollapse {
  opened: Accessor<boolean>;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  onTransitionEnd?: () => void;
}

export function useCollapse(props: UseCollapse) {
  const [el, setEl] = createSignal<HTMLElement | null>(null);
  const [height, setHeight] = createSignal<string>(props.opened() ? 'auto' : '0px');
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  let initial = true;

  const triggerAnimation = (opened: boolean, node: HTMLElement) => {
    setIsTransitioning(true);

    if (opened) {
      setHeight('0px');
      node.offsetHeight;

      requestAnimationFrame(() => {
        const fullHeight = `${node.scrollHeight}px`;
        setHeight(fullHeight);
      });
    } else {
      const currentHeight = `${node.scrollHeight}px`;
      setHeight(currentHeight);

      node.offsetHeight;

      requestAnimationFrame(() => {
        setHeight('0px');
      });
    }
  };

  createEffect(() => {
    const opened = props.opened();
    const node = el();

    if (initial) {
      if (node) {
        setHeight(opened ? 'auto' : '0px');
      }
      initial = false;
      return;
    }

    if (node) {
      triggerAnimation(opened, node);
    } else {
      setHeight(opened ? 'auto' : '0px');
    }
  });

  function handleTransitionEnd(e: TransitionEvent) {
    const node = el();

    if (e.target !== node || e.propertyName !== 'height') return;

    setIsTransitioning(false);

    if (props.opened()) {
      setHeight('auto');
    }

    props.onTransitionEnd?.();
  }

  function getCollapseProps(): JSX.HTMLAttributes<HTMLDivElement> {
    const opened = props.opened();
    const node = el();
    const currentHeight = height();
    const transitioning = isTransitioning();

    const duration = props.transitionDuration ?? getAutoHeightDuration(node?.scrollHeight || 0);
    const timing = props.transitionTimingFunction || 'ease';
    const shouldDisplay = opened || transitioning || currentHeight !== '0px';

    return {
      ref: setEl,
      'aria-hidden': !opened,
      onTransitionEnd: handleTransitionEnd as any,
      style: {
        height: currentHeight,
        overflow: 'hidden',
        transition: `height ${duration}ms ${timing}`,
        display: 'block',
        opacity: shouldDisplay ? 1 : 0,
      },
    };
  }

  return getCollapseProps;
}

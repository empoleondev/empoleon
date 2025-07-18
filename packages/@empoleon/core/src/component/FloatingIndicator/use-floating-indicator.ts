import { onMount, onCleanup, createSignal, createEffect } from 'solid-js';
import { getEnv } from '../../core';
import { toInt } from '../ScrollArea/utils';
import { useTimeout } from '@empoleon/hooks';

function isParent(
  parentElement: HTMLElement | EventTarget | null,
  childElement: HTMLElement | null
) {
  if (!childElement || !parentElement) return false;

  let parent = childElement.parentNode;
  while (parent) {
    if (parent === parentElement) return true;
    parent = parent.parentNode;
  }
  return false;
}

interface UseFloatingIndicatorInput {
  target: (() => HTMLElement | null | undefined) | HTMLElement | null | undefined;
  parent: (() => HTMLElement | null | undefined) | HTMLElement | null | undefined;
  ref: () => HTMLDivElement | undefined;
  displayAfterTransitionEnd?: boolean;
}

export function useFloatingIndicator({ target, parent, ref, displayAfterTransitionEnd }: UseFloatingIndicatorInput) {
  let transitionTimeout: number;
  const [initialized, setInitialized] = createSignal(false);
  const [hidden, setHidden] = createSignal(
    typeof displayAfterTransitionEnd === 'boolean' ? displayAfterTransitionEnd : false
  );

  const getTarget = () => typeof target === 'function' ? target() : target;
  const getParent = () => typeof parent === 'function' ? parent() : parent;

  const updatePosition = () => {
    const currentTarget = getTarget();
    const currentParent = getParent();
    const el = ref();
    if (!currentTarget || !currentParent || !el) return;

    const targetRect = currentTarget.getBoundingClientRect();
    const parentRect = currentParent.getBoundingClientRect();
    const targetStyle = window.getComputedStyle(currentTarget);
    const parentStyle = window.getComputedStyle(currentParent);

    const borderTop = toInt(targetStyle.borderTopWidth) + toInt(parentStyle.borderTopWidth);
    const borderLeft = toInt(targetStyle.borderLeftWidth) + toInt(parentStyle.borderLeftWidth);

    const top = targetRect.top - parentRect.top - borderTop;
    const left = targetRect.left - parentRect.left - borderLeft;

    el.style.transform = `translateY(${top}px) translateX(${left}px)`;
    el.style.width = `${targetRect.width}px`;
    el.style.height = `${targetRect.height}px`;
  };

  const updatePositionWithoutAnimation = () => {
    clearTimeout(transitionTimeout);
    const el = ref();
    if (el) el.style.transitionDuration = '0ms';
    updatePosition();
    transitionTimeout = window.setTimeout(() => {
      const el2 = ref();
      if (el2) el2.style.transitionDuration = '';
    }, 30);
  };

  onMount(() => {
    updatePosition();

    let targetObserver: ResizeObserver | null = null;
    let parentObserver: ResizeObserver | null = null;

    const currentTarget = getTarget();
    const currentParent = getParent();

    if (currentTarget) {
      targetObserver = new ResizeObserver(updatePositionWithoutAnimation);
      targetObserver.observe(currentTarget);
    }

    if (currentParent) {
      parentObserver = new ResizeObserver(updatePositionWithoutAnimation);
      parentObserver.observe(currentParent);

      const handleTransitionEnd = (event: TransitionEvent) => {
        if (isParent(event.target, currentParent)) {
          updatePositionWithoutAnimation();
          setHidden(false);
        }
      };

      currentParent.addEventListener('transitionend', handleTransitionEnd);
      onCleanup(() => currentParent.removeEventListener('transitionend', handleTransitionEnd));
    }

    onCleanup(() => {
      targetObserver?.disconnect();
      parentObserver?.disconnect();
    });

    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'dir') {
          updatePositionWithoutAnimation();
        }
      }
    });
    mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    onCleanup(() => mutationObserver.disconnect());
  });

  createEffect(() => {
    if (target && parent) {
      updatePosition();
    }
  });

  const { start } = useTimeout(() => {
    if (getEnv() !== 'test') setInitialized(true);
  }, 20, { autoInvoke: true });

  return { initialized: () => initialized(), hidden: () => hidden() };
}

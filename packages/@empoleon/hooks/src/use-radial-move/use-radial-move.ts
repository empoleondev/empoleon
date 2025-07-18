import { createSignal, onMount, onCleanup } from 'solid-js';
import { Ref } from '@solid-primitives/refs';
import { clamp } from '../utils';

function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

function getElementCenter(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return [rect.left + rect.width / 2, rect.top + rect.height / 2] as [number, number];
}

function getAngle(coordinates: [number, number], element: HTMLElement) {
  const [cx, cy] = getElementCenter(element);
  const x = coordinates[0] - cx;
  const y = coordinates[1] - cy;
  const deg = radiansToDegrees(Math.atan2(x, y)) + 180;
  return 360 - deg;
}

function toFixed(value: number, digits: number) {
  return parseFloat(value.toFixed(digits));
}

function getDigitsAfterDot(value: number) {
  return value.toString().split('.')[1]?.length || 0;
}

export function normalizeRadialValue(degree: number, step: number) {
  const clamped = clamp(degree, 0, 360);
  const high = Math.ceil(clamped / step);
  const low = Math.round(clamped / step);
  const result =
    high >= clamped / step
      ? high * step === 360
        ? 0
        : high * step
      : low * step;
  return toFixed(result, getDigitsAfterDot(step));
}

export interface UseRadialMoveOptions {
  step?: number;
  onChangeEnd?: (value: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
}

export function useRadialMove<T extends HTMLElement = any>(
  onChange: (v: number) => void,
  options: UseRadialMoveOptions = {}
) {
  const { step = 0.01, onChangeEnd, onScrubStart, onScrubEnd } = options;

  // 1️⃣ element signal + setter as Ref<T>
  const [node, setNode] = createSignal<T>();
  const ref: Ref<T> = setNode;

  // 2️⃣ active state
  const [active, setActive] = createSignal(false);

  let cleanup = () => {};

  onMount(() => {
    const el = node();
    if (!el) return;

    // event handlers
    const update = (x: number, y: number, done = false) => {
      el.style.userSelect = 'none';
      const deg = getAngle([x, y], el);
      const newValue = normalizeRadialValue(deg, step);
      onChange(newValue);
      if (done) onChangeEnd?.(newValue);
    };

    let onMouseMove: (e: MouseEvent) => void;
    let onMouseUp: (e: MouseEvent) => void;
    let onTouchMove: (e: TouchEvent) => void;
    let onTouchEnd: (e: TouchEvent) => void;

    const begin = () => {
      onScrubStart?.();
      setActive(true);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    };

    const end = () => {
      onScrubEnd?.();
      setActive(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    const onMouseDown = (e: MouseEvent) => { begin(); update(e.clientX, e.clientY); };
    onMouseMove = (e: MouseEvent) => update(e.clientX, e.clientY);
    onMouseUp = (e: MouseEvent) => { update(e.clientX, e.clientY, true); end(); };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault(); begin();
      update(e.touches[0].clientX, e.touches[0].clientY);
    };
    onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      update(e.touches[0].clientX, e.touches[0].clientY);
    };
    onTouchEnd = (e: TouchEvent) => {
      update(e.changedTouches[0].clientX, e.changedTouches[0].clientY, true);
      end();
    };

    // attach to element
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onTouchStart, { passive: false });

    // cleanup on unmount
    cleanup = () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onTouchStart);
      end();
    };
  });

  onCleanup(() => cleanup());

  return { ref, active };
}

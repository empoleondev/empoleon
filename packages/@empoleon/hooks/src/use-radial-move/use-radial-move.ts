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
  const center = getElementCenter(element);
  const x = coordinates[0] - center[0];
  const y = coordinates[1] - center[1];
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
  return toFixed(
    high >= clamped / step ? (high * step === 360 ? 0 : high * step) : low * step,
    getDigitsAfterDot(step)
  );
}

export interface UseRadialMoveOptions {
  /** Number by which value is incremented/decremented with mouse and touch events, `0.01` by default */
  step?: number;

  /** Called in `onMouseUp` and `onTouchEnd` events with the current value */
  onChangeEnd?: (value: number) => void;

  /** Called in `onMouseDown` and `onTouchStart` events */
  onScrubStart?: () => void;

  /** Called in `onMouseUp` and `onTouchEnd` events */
  onScrubEnd?: () => void;
}

export interface UseRadialMoveReturnValue<T extends HTMLElement = any> {
  /** Ref to be passed to the element that should be used for radial move */
  ref: Ref<T>;

  /** Indicates whether the radial move is active */
  active: () => boolean;
}

export function useRadialMove<T extends HTMLElement = any>(
  onChange: (value: number) => void,
  { step = 0.01, onChangeEnd, onScrubStart, onScrubEnd }: UseRadialMoveOptions = {}
): UseRadialMoveReturnValue<T> {
  const [node, setNode] = createSignal<T | null>(null);
  const [active, setActive] = createSignal(false);

  let mounted = false;
  let cleanup = () => {};

  onMount(() => {
    mounted = true;
  });

  const ref: Ref<T> = (element: T | null) => {
    cleanup();
    setNode(() => element)

    if (!element) return;

    const update = (event: MouseEvent | Touch, done = false) => {
      if (element) {
        element.style.userSelect = 'none';
        const deg = getAngle([event.clientX, event.clientY], element);
        const newValue = normalizeRadialValue(deg, step || 1);

        onChange(newValue);
        done && onChangeEnd?.(newValue);
      }
    };

    const beginTracking = () => {
      onScrubStart?.();
      setActive(true);
      document.addEventListener('mousemove', handleMouseMove, false);
      document.addEventListener('mouseup', handleMouseUp, false);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, false);
    };

    const endTracking = () => {
      onScrubEnd?.();
      setActive(false);
      document.removeEventListener('mousemove', handleMouseMove, false);
      document.removeEventListener('mouseup', handleMouseUp, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
      document.removeEventListener('touchend', handleTouchEnd, false);
    };

    const onMouseDown = (event: MouseEvent) => {
      beginTracking();
      update(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
      update(event);
    };

    const handleMouseUp = (event: MouseEvent) => {
      update(event, true);
      endTracking();
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      update(event.touches[0]);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      update(event.changedTouches[0], true);
      endTracking();
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      beginTracking();
      update(event.touches[0]);
    };

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', handleTouchStart, { passive: false });

    cleanup = () => {
      if (element) {
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('touchstart', handleTouchStart);
      }
      endTracking();
    };
  };

  onCleanup(() => cleanup());

  return { ref, active };
}

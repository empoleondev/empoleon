import { createMemo, onCleanup } from 'solid-js';

export interface UseLongPressOptions {
  /** Time in milliseconds to trigger the long press, default is 400ms */
  threshold?: number;

  /** Callback triggered when the long press starts */
  onStart?: (event: MouseEvent | TouchEvent) => void;

  /** Callback triggered when the long press finishes */
  onFinish?: (event: MouseEvent | TouchEvent) => void;

  /** Callback triggered when the long press is canceled */
  onCancel?: (event: MouseEvent | TouchEvent) => void;
}

export interface UseLongPressReturnValue {
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}

export function useLongPress(
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  options: UseLongPressOptions = {}
): UseLongPressReturnValue {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  let isLongPressActive = false;
  let isPressed = false;
  let timeout: number = -1;

  onCleanup(() => window.clearTimeout(timeout));

  return createMemo(() => {
    if (typeof onLongPress !== 'function') {
      return {} as UseLongPressReturnValue;
    }

    const start = (event: MouseEvent | TouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) {
        return;
      }

      if (onStart) {
        onStart(event);
      }

      isPressed = true;
      timeout = window.setTimeout(() => {
        onLongPress(event);
        isLongPressActive = true;
      }, threshold);
    };

    const cancel = (event: MouseEvent | TouchEvent) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) {
        return;
      }

      if (isLongPressActive) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed) {
        if (onCancel) {
          onCancel(event);
        }
      }

      isLongPressActive = false;
      isPressed = false;

      if (timeout) {
        window.clearTimeout(timeout);
      }
    };

    return {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchEnd: cancel,
    };
  })();
}

function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return window.TouchEvent ? event instanceof TouchEvent : 'touches' in event;
}

function isMouseEvent(event: MouseEvent | TouchEvent): event is MouseEvent {
  return event instanceof MouseEvent;
}

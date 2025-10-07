import { createEffect, createSignal, onCleanup } from 'solid-js';

function getFullscreenElement(): HTMLElement | null {
  const _document = window.document as any;

  const fullscreenElement =
    _document.fullscreenElement ||
    _document.webkitFullscreenElement ||
    _document.mozFullScreenElement ||
    _document.msFullscreenElement;

  return fullscreenElement;
}

function exitFullscreen() {
  const _document = window.document as any;

  if (typeof _document.exitFullscreen === 'function') {
    return _document.exitFullscreen();
  }
  if (typeof _document.msExitFullscreen === 'function') {
    return _document.msExitFullscreen();
  }
  if (typeof _document.webkitExitFullscreen === 'function') {
    return _document.webkitExitFullscreen();
  }
  if (typeof _document.mozCancelFullScreen === 'function') {
    return _document.mozCancelFullScreen();
  }

  return null;
}

function enterFullScreen(element: HTMLElement) {
  const _element = element as any;

  return (
    _element.requestFullscreen?.() ||
    _element.msRequestFullscreen?.() ||
    _element.webkitEnterFullscreen?.() ||
    _element.webkitRequestFullscreen?.() ||
    _element.mozRequestFullscreen?.()
  );
}

const prefixes = ['', 'webkit', 'moz', 'ms'];

function addEvents(
  element: HTMLElement,
  {
    onFullScreen,
    onError,
  }: { onFullScreen: (event: Event) => void; onError: (event: Event) => void }
) {
  prefixes.forEach((prefix) => {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.addEventListener(`${prefix}fullscreenerror`, onError);
  });

  return () => {
    prefixes.forEach((prefix) => {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
      element.removeEventListener(`${prefix}fullscreenerror`, onError);
    });
  };
}

export function useFullscreen<T extends HTMLElement = any>() {
  const [fullscreen, setFullscreen] = createSignal<boolean>(false);
  let _ref: T | null = null;

  const handleFullscreenChange = (event: Event) => {
    setFullscreen(event.target === getFullscreenElement());
  };

  const handleFullscreenError = (event: Event) => {
    setFullscreen(false);
    // eslint-disable-next-line no-console
    console.error(
      `[@empoleon/hooks] use-fullscreen: Error attempting full-screen mode method: ${event} (${event.target})`
    );
  };

  const toggle = async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen(_ref!);
    } else {
      await exitFullscreen();
    }
  };

  const ref = (element: T | null) => {
    if (element === null) {
      _ref = window.document.documentElement as T;
    } else {
      _ref = element;
    }
  };

  createEffect(() => {
    if (!_ref && window.document) {
      _ref = window.document.documentElement as T;
    }

    if (_ref) {
      const cleanup = addEvents(_ref, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError,
      });

      onCleanup(cleanup);
    }
  });

  return { ref, toggle, fullscreen } as const;
}

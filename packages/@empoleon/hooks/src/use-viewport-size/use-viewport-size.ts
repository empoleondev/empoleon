import { createSignal, onMount } from 'solid-js';
import { useWindowEvent } from '../use-window-event/use-window-event';

const eventListerOptions = {
  passive: true,
};

export function useViewportSize() {
  const [windowSize, setWindowSize] = createSignal({
    width: 0,
    height: 0,
  });

  const setSize = () => {
    setWindowSize({ width: window.innerWidth || 0, height: window.innerHeight || 0 });
  };

  useWindowEvent('resize', setSize, eventListerOptions);
  useWindowEvent('orientationchange', setSize, eventListerOptions);
  onMount(setSize);

  return windowSize;
}

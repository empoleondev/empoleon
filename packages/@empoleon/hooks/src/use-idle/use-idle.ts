import { createSignal, onCleanup, onMount } from 'solid-js';

const DEFAULT_EVENTS: (keyof DocumentEventMap)[] = [
  'keydown',
  'mousemove',
  'touchmove',
  'click',
  'scroll',
  'wheel',
];
const DEFAULT_OPTIONS = {
  events: DEFAULT_EVENTS,
  initialState: true,
};

export function useIdle(
  timeout: number,
  options?: Partial<{ events: (keyof DocumentEventMap)[]; initialState: boolean }>
) {
  const { events, initialState } = { ...DEFAULT_OPTIONS, ...options };
  const [idle, setIdle] = createSignal<boolean>(initialState);
  let timer: number = -1;

  onMount(() => {
    const handleEvents = () => {
      setIdle(false);

      if (timer) {
        window.clearTimeout(timer);
      }

      timer = window.setTimeout(() => {
        setIdle(true);
      }, timeout);
    };

    events.forEach((event) => document.addEventListener(event, handleEvents));

    // Start the timer immediately instead of waiting for the first event to happen
    timer = window.setTimeout(() => {
      setIdle(true);
    }, timeout);

    onCleanup(() => {
      events.forEach((event) => document.removeEventListener(event, handleEvents));
    });
  });

  return idle;
}

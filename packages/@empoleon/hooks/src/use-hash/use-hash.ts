import { createSignal, onMount } from 'solid-js';
import { useWindowEvent } from '../use-window-event/use-window-event';

interface UseHashOptions {
  getInitialValueInEffect?: boolean;
}

export function useHash({ getInitialValueInEffect = true }: UseHashOptions = {}) {
  const [hash, setHash] = createSignal<string>(
    getInitialValueInEffect ? '' : window.location.hash || ''
  );

  const setHashHandler = (value: string) => {
    const valueWithHash = value.startsWith('#') ? value : `#${value}`;
    window.location.hash = valueWithHash;
    setHash(valueWithHash);
  };

  useWindowEvent('hashchange', () => {
    const newHash = window.location.hash;
    if (hash() !== newHash) {
      setHash(newHash);
    }
  });

  onMount(() => {
    if (getInitialValueInEffect) {
      setHash(window.location.hash);
    }
  });

  return [hash, setHashHandler] as const;
}

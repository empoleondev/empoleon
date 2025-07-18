import { createSignal, onCleanup, onMount } from 'solid-js';

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

/**
 * Older versions of Safari (shipped with Catalina and before) do not support addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
function attachMediaListener(query: MediaQueryList, callback: MediaQueryCallback) {
  try {
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === 'boolean') {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

export function useMediaQuery(
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true,
  }
) {
  const [matches, setMatches] = createSignal(
    getInitialValueInEffect ? initialValue : getInitialValue(query, initialValue)
  );

  let queryRef: MediaQueryList | null = null;

  onMount(() => {
    if ('matchMedia' in window) {
      queryRef = window.matchMedia(query);
      setMatches(queryRef.matches);

      const cleanupFn = attachMediaListener(queryRef, (event) => setMatches(event.matches));
      onCleanup(() => cleanupFn());
    }
  });

  return matches;
}

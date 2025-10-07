import { onCleanup, onMount } from 'solid-js';

export function usePageLeave(onPageLeave: () => void) {
  onMount(() => {
    document.documentElement.addEventListener('mouseleave', onPageLeave);
    onCleanup(() => document.documentElement.removeEventListener('mouseleave', onPageLeave));
  });
}

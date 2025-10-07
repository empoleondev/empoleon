import { createEffect, onCleanup, onMount } from 'solid-js';

export function useLogger(componentName: string, props: () => any[]) {
  onMount(() => {
    console.log(`${componentName} mounted`, ...props());
    onCleanup(() => console.log(`${componentName} unmounted`));
  });

  createEffect(() => {
    console.log(`${componentName} updated`, ...props());
  });

  return null;
}

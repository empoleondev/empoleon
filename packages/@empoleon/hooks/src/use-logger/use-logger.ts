import { createEffect, onCleanup, onMount } from 'solid-js';

export function useLogger(componentName: string, props: () => any[]) {
  onMount(() => {
    /* eslint-disable no-console */
    console.log(`${componentName} mounted`, ...props());
    onCleanup(() => console.log(`${componentName} unmounted`));
    /* eslint-enable no-console */
  });

  createEffect(() => {
    /* eslint-disable no-console */
    console.log(`${componentName} updated`, ...props());
    /* eslint-enable no-console */
  });

  return null;
}

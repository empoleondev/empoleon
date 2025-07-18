/* eslint-disable no-console */
import { onMount, onCleanup, createEffect, on } from 'solid-js';

export function useLogger(componentName: string, props: any[]) {
  onMount(() => {
    console.log(`${componentName} mounted`, ...props);
    onCleanup(() => console.log(`${componentName} unmounted`));
  });

  createEffect(
    on(
      () => props,
      () => {
        console.log(`${componentName} updated`, ...props);
      },
      { defer: true }
    )
  );

  return null;
}

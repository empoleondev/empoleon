import { createUniqueId } from 'solid-js';

export function useReactId() {
  const id = createUniqueId();
  return id ? `empoleon-${id.replace(/:/g, '')}` : '';
}

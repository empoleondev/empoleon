import { createUniqueId } from 'solid-js';

export function useRandomClassName() {
  const id = createUniqueId().replace(/:/g, '');
  return `__m__-${id}`;
}

import { createSignal } from 'solid-js';

type ReactiveMap<T, V> = Omit<Map<T, V>, 'entries'> & {
  entries: () => [T, V][]
};

export function useMap<T, V>(initialState?: [T, V][]): ReactiveMap<T, V> {
  const mapRef = new Map<T, V>(initialState);

  // Save original method before overriding
  const originalEntries = mapRef.entries.bind(mapRef);

  const [entries, setEntries] = createSignal(Array.from(originalEntries()));

  const updateEntries = () => {
    setEntries(Array.from(originalEntries()));
  };

  mapRef.set = function(...args) {
    Map.prototype.set.apply(mapRef, args);
    updateEntries();
    return mapRef;
  };

  mapRef.clear = function(...args) {
    Map.prototype.clear.apply(mapRef, args);
    updateEntries();
  };

  mapRef.delete = function(...args) {
    const res = Map.prototype.delete.apply(mapRef, args);
    updateEntries();
    return res;
  };

  return Object.assign(mapRef, { entries: () => entries() });
}

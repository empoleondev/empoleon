import { createSignal } from 'solid-js';

export function useMap<T, V>(initialState?: [T, V][]): Map<T, V> {
  const mapRef = new Map<T, V>(initialState);
  const [, setUpdate] = createSignal(0);

  const forceUpdate = () => setUpdate(prev => prev + 1);

  mapRef.set = (...args) => {
    Map.prototype.set.apply(mapRef, args);
    forceUpdate();
    return mapRef;
  };

  mapRef.clear = (...args) => {
    Map.prototype.clear.apply(mapRef, args);
    forceUpdate();
  };

  mapRef.delete = (...args) => {
    const res = Map.prototype.delete.apply(mapRef, args);
    forceUpdate();

    return res;
  };

  return mapRef;
}

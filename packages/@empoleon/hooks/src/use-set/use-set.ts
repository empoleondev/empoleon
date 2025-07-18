import { createSignal } from 'solid-js';

export function useSet<T>(values?: T[]): Set<T> {
  const [, setTrigger] = createSignal(0);
  const set = new Set(values);

  const forceUpdate = () => {
    setTrigger(prev => prev + 1);
  };

  set.add = (...args) => {
    const res = Set.prototype.add.apply(set, args);
    forceUpdate();
    return res;
  };

  set.clear = (...args) => {
    Set.prototype.clear.apply(set, args);
    forceUpdate();
  };

  set.delete = (...args) => {
    const res = Set.prototype.delete.apply(set, args);
    forceUpdate();
    return res;
  };

  return set;
}

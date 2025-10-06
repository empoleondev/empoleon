import { createSignal } from 'solid-js';

export function useSet<T>(values?: T[]): Set<T> {
  const [trigger, setTrigger] = createSignal(0);
  const internalSet = new Set(values);

  const mutatingMethods = ['add', 'delete', 'clear'];
  const readMethods = ['size', 'has', 'values', 'keys', 'entries', Symbol.iterator];

  return new Proxy(internalSet, {
    get(target, prop) {
      if (readMethods.includes(prop as any)) {
        trigger();
      }

      if (mutatingMethods.includes(prop as string)) {
        return (...args: any[]) => {
          const result = (target as any)[prop](...args);
          setTrigger(prev => prev + 1);
          return result;
        };
      }

      const value = (target as any)[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    }
  });
}

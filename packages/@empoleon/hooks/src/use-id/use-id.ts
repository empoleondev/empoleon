import { createEffect, createSignal } from 'solid-js';
import { randomId } from '../utils';
import { useReactId } from './use-react-id';

export function useId(staticId?: string) {
  const reactId = useReactId();
  const [uuid, setUuid] = createSignal(reactId);

  createEffect(() => {
    setUuid(randomId());
  }, []);

  if (typeof staticId === 'string') {
    return staticId;
  }

  if (typeof window === 'undefined') {
    return reactId;
  }

  return uuid();
}

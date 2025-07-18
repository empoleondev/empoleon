import { useContext } from 'solid-js';
import { ModalsContext } from '../context';

export function useModals() {
  const ctx = useContext(ModalsContext);

  if (!ctx) {
    throw new Error(
      '[@empoleon/modals] useModals hook was called outside of context, wrap your app with ModalsProvider component'
    );
  }

  return ctx;
}

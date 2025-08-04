import { createMemo, onCleanup, useContext } from 'solid-js';
import { useColorScheme } from '@empoleon/hooks';
import { noop } from '../../utils';
import { EmpoleonContext, useEmpoleonStyleNonce } from '../Empoleon.context';
import { EmpoleonColorScheme } from '../theme.types';

function disableTransition(nonce: string | undefined) {
  const style = document.createElement('style');
  style.setAttribute('data-empoleon-styles', 'inline');
  style.innerHTML = '*, *::before, *::after {transition: none !important;}';
  style.setAttribute('data-empoleon-disable-transition', 'true');
  nonce && style.setAttribute('nonce', nonce);

  document.head.appendChild(style);
  const clear = () =>
    document
      .querySelectorAll('[data-empoleon-disable-transition]')
      .forEach((element) => element.remove());
  return clear;
}

export function useEmpoleonColorScheme(props: { keepTransitions?: boolean } = {}) {
  let clearStylesRef = noop;
  let timeoutRef = -1;
  const ctx = useContext(EmpoleonContext);
  const nonce = useEmpoleonStyleNonce();
  const nonceValue = nonce?.();

  if (!ctx) {
    throw new Error('[@empoleon/core] EmpoleonProvider was not found in tree');
  }

  const setColorScheme = (value: EmpoleonColorScheme) => {
    ctx.setColorScheme(value);
    clearStylesRef = props.keepTransitions ? () => {} : disableTransition(nonceValue);
    window.clearTimeout(timeoutRef);
    timeoutRef = window.setTimeout(() => {
      clearStylesRef?.();
    }, 10);
  };

  const clearColorScheme = () => {
    ctx.clearColorScheme();
    clearStylesRef = props.keepTransitions ? () => {} : disableTransition(nonceValue);
    window.clearTimeout(timeoutRef);
    timeoutRef = window.setTimeout(() => {
      clearStylesRef?.();
    }, 10);
  };

  const osColorScheme = useColorScheme('light', { getInitialValueInEffect: false });
  const computedColorScheme = ctx.colorScheme === 'auto' ? osColorScheme : ctx.colorScheme;

  const toggleColorScheme = createMemo(
    () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light'),
    [setColorScheme, computedColorScheme]
  );

  onCleanup(() => {
    clearStylesRef?.();
    window.clearTimeout(timeoutRef);
  });

  return {
    colorScheme: ctx.colorScheme,
    setColorScheme,
    clearColorScheme,
    toggleColorScheme,
  };
}

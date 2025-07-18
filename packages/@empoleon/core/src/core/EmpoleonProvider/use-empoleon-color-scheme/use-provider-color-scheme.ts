import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import type { EmpoleonColorSchemeManager } from '../color-scheme-managers';
import type { EmpoleonColorScheme } from '../theme.types';

function setColorSchemeAttribute(
  colorScheme: EmpoleonColorScheme,
  getRootElement: () => HTMLElement | undefined
) {
  const hasDarkColorScheme =
    typeof window !== 'undefined' &&
    'matchMedia' in window &&
    window.matchMedia('(prefers-color-scheme: dark)')?.matches;

  const computedColorScheme =
    colorScheme !== 'auto' ? colorScheme : hasDarkColorScheme ? 'dark' : 'light';
  getRootElement()?.setAttribute('data-empoleon-color-scheme', computedColorScheme);
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

interface UseProviderColorSchemeOptions {
  manager: EmpoleonColorSchemeManager;
  defaultColorScheme: EmpoleonColorScheme;
  forceColorScheme: 'light' | 'dark' | undefined;
  getRootElement: () => HTMLElement | undefined;
}

export function useProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement,
  forceColorScheme,
}: UseProviderColorSchemeOptions) {
  let media: MediaQueryList | null = null;
  const [value, setValue] = createSignal(manager.get(defaultColorScheme));
  const colorSchemeValue = () => forceColorScheme || value();

  const setColorScheme = (colorScheme: EmpoleonColorScheme) => {
    if (!forceColorScheme) {
      setColorSchemeAttribute(colorScheme, getRootElement);
      setValue(colorScheme);
      manager.set(colorScheme);
    }
  };

  const clearColorScheme = () => {
    setValue(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement);
    manager.clear();
  };

  createEffect(() => {
    manager.subscribe(setColorScheme);
    onCleanup(() => manager.unsubscribe());
  });

  onMount(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement);
  });

  createEffect(() => {
    if (forceColorScheme) {
      setColorSchemeAttribute(forceColorScheme, getRootElement);
      return;
    }

    if (forceColorScheme === undefined) {
      setColorSchemeAttribute(value(), getRootElement);
    }

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      media = window.matchMedia('(prefers-color-scheme: dark)');
    }

    const listener: MediaQueryCallback = (event) => {
      if (value() === 'auto') {
        setColorSchemeAttribute(event.matches ? 'dark' : 'light', getRootElement);
      }
    };

    media?.addEventListener('change', listener);
    onCleanup(() => media?.removeEventListener('change', listener));
  });

  return {
    colorScheme: colorSchemeValue(),
    setColorScheme,
    clearColorScheme,
  };
}

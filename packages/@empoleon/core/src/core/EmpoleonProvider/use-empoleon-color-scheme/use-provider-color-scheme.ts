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

export function useProviderColorScheme(props: UseProviderColorSchemeOptions) {
  let media: MediaQueryList | null = null;
  const [value, setValue] = createSignal(props.manager.get(props.defaultColorScheme));
  const colorSchemeValue = () => props.forceColorScheme || value();

  const setColorScheme = (colorScheme: EmpoleonColorScheme) => {
    if (!props.forceColorScheme) {
      setColorSchemeAttribute(colorScheme, props.getRootElement);
      setValue(colorScheme);
      props.manager.set(colorScheme);
    }
  };

  const clearColorScheme = () => {
    setValue(props.defaultColorScheme);
    setColorSchemeAttribute(props.defaultColorScheme, props.getRootElement);
    props.manager.clear();
  };

  createEffect(() => {
    props.manager.subscribe(setColorScheme);
    onCleanup(() => props.manager.unsubscribe());
  });

  onMount(() => {
    setColorSchemeAttribute(props.manager.get(props.defaultColorScheme), props.getRootElement);
  });

  createEffect(() => {
    if (props.forceColorScheme) {
      setColorSchemeAttribute(props.forceColorScheme, props.getRootElement);
      return;
    }

    if (props.forceColorScheme === undefined) {
      setColorSchemeAttribute(value(), props.getRootElement);
    }

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      media = window.matchMedia('(prefers-color-scheme: dark)');
    }

    const listener: MediaQueryCallback = (event) => {
      if (value() === 'auto') {
        setColorSchemeAttribute(event.matches ? 'dark' : 'light', props.getRootElement);
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

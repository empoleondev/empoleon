import { createContext, createMemo, JSX, splitProps, useContext } from 'solid-js';
import { DEFAULT_THEME } from '../default-theme';
import { mergeEmpoleonTheme } from '../merge-empoleon-theme';
import { EmpoleonTheme, EmpoleonThemeOverride } from '../theme.types';

export const EmpoleonThemeContext = createContext<EmpoleonTheme | null>(null);

export const useSafeEmpoleonTheme = () => useContext(EmpoleonThemeContext) || DEFAULT_THEME;

export function useEmpoleonTheme() {
  const ctx = useContext(EmpoleonThemeContext);

  if (!ctx) {
    throw new Error(
      '@empoleon/core: EmpoleonProvider was not found in component tree, make sure you have it in your app'
    );
  }

  return ctx;
}

export interface EmpoleonThemeProviderProps {
  /** Determines whether theme should be inherited from parent EmpoleonProvider, `true` by default */
  inherit?: boolean;

  /** Theme override object */
  theme?: EmpoleonThemeOverride;

  /** Your application or part of the application that requires different theme */
  children?: JSX.Element;
}

// Don't destructure props, otherwise they lose their reactivity
export function EmpoleonThemeProvider(props: EmpoleonThemeProviderProps) {
  const [local] = splitProps(props, [
    'theme',
    'inherit',
  ]);

  const inherit = local.inherit ?? true;

  const parentTheme = useSafeEmpoleonTheme();
  const mergedTheme = createMemo(() =>
    mergeEmpoleonTheme(inherit ? parentTheme : DEFAULT_THEME, local.theme)
  );

  return (
    <EmpoleonThemeContext.Provider value={mergedTheme()}>{props.children}</EmpoleonThemeContext.Provider>
  );
}

EmpoleonThemeProvider.displayName = '@empoleon/core/EmpoleonThemeProvider';

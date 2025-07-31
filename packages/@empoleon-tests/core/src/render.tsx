import { render as testingLibraryRender } from '@solidjs/testing-library';
import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
import { JSX, createSignal } from 'solid-js';

type RenderResult = ReturnType<typeof testingLibraryRender>;

export function render(
  component: () => JSX.Element,
  themeOverride?: EmpoleonThemeOverride,
  providerProps?: Omit<EmpoleonProviderProps, 'theme'>
): {
  container: Element;
  rerender: (newComponent: () => JSX.Element) => RenderResult;
} {
  const [currentComponent, setCurrentComponent] = createSignal(component);

  const finalTheme = themeOverride || {};

  const result = testingLibraryRender(() => (
    <EmpoleonProvider theme={finalTheme} env="test" {...providerProps}>
      {currentComponent()()}
    </EmpoleonProvider>
  ));

  return {
    container: result.container,
    rerender: (newComponent: () => JSX.Element): RenderResult => {
      setCurrentComponent(() => newComponent);
      return result;
    }
  };
}


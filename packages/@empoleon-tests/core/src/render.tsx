import { render as testingLibraryRender } from '@solidjs/testing-library';
import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
import { JSX } from 'solid-js';

type RenderResult = ReturnType<typeof testingLibraryRender>;

// Provide a render function that matches the signature expected by your tests
export function renderComponent(
  component: () => JSX.Element,
  themeOverride?: EmpoleonThemeOverride,
  providerProps?: Omit<EmpoleonProviderProps, 'theme'>
): {
  container: Element;
  rerender: (newComponent: () => JSX.Element) => RenderResult;
} {
  const localRender = (componentFn: () => JSX.Element) => {
    return testingLibraryRender(() => (
      <EmpoleonProvider theme={themeOverride || {}} env="test" {...providerProps}>
        {componentFn()}
      </EmpoleonProvider>
    ));
  };

  const result = localRender(component);

  return {
    container: result.container,
    rerender: (newComponent: () => JSX.Element): RenderResult => {
      result.unmount();
      const newResult = localRender(newComponent);
      return newResult;
    }
  };
}

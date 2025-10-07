import { render as testingLibraryRender } from '@solidjs/testing-library';
import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider, EmpoleonProviderProps, EmpoleonThemeOverride } from '@empoleon/core';
import * as EmpoleonCore from '@empoleon/core';

type RenderResult = ReturnType<typeof testingLibraryRender>;

const contextComponents = new Map();

Object.keys(EmpoleonCore).forEach((key) => {
  const component = (EmpoleonCore as any)[key];
  if (typeof component === 'function') {
    contextComponents.set(key, component);

    // Also register common patterns
    const baseName = key.replace(/Provider|Context|Wrapper$/, '');
    if (baseName !== key) {
      contextComponents.set(baseName, component);
    }
  }
});

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
      {(() => {
        try {
          return currentComponent()();
        } catch (error) {
          // @ts-ignore
          const errorMessage = error?.message || '';
          const match = errorMessage.match(/(\w+) component was not found in tree/);
          if (match) {
            const componentName = match[1];
            const ContextComponent = contextComponents.get(componentName);
            if (ContextComponent) {
              return <ContextComponent>{currentComponent()()}</ContextComponent>;
            }
          }
          throw error;
        }
      })()}
    </EmpoleonProvider>
  ));

  return {
    container: result.container,
    rerender: (newComponent: () => JSX.Element): RenderResult => {
      setCurrentComponent(() => newComponent);
      return result;
    },
  };
}

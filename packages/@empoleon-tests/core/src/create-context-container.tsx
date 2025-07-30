import { JSX } from 'solid-js';

export function createContextContainer<T extends JSX.IntrinsicAttributes>(
  Component: (props: T) => JSX.Element,
  Provider: (props: any) => JSX.Element,
  providerProps?: Record<string, any>
) {
  const Container = (props: T) => (
    <Provider {...providerProps}>
      <Component {...props} />
    </Provider>
  );

  // Copy over any additional properties from the original component
  (Container as any).displayName = (Component as any).displayName;
  (Container as any).extend = (Component as any).extend;
  (Container as any).classes = (Component as any).classes;
  (Container as any).withProps = (Component as any).withProps;

  return Container;
}

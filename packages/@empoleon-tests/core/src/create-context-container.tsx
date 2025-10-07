import { JSX } from 'solid-js';

export function createContextContainer<P>(
  Component: (props: P) => JSX.Element,
  Provider: (props: any) => JSX.Element,
  providerProps?: Record<string, any>
): (props: P) => JSX.Element {
  const Container = (props: any) => (
    <Provider {...providerProps}>
      <Component {...props} />
    </Provider>
  );

  (Container as any).displayName = (Component as any).displayName;
  (Container as any).extend = (Component as any).extend;
  (Container as any).classes = (Component as any).classes;
  (Container as any).withProps = (Component as any).withProps;

  // But cast the whole thing back to the proper signature
  return Container as (props: P) => JSX.Element;
}

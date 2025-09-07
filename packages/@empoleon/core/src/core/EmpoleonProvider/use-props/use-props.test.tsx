import { renderHook } from '@solidjs/testing-library';
import { EmpoleonProvider } from '../EmpoleonProvider';
import { useProps } from './use-props';
import { JSX } from 'solid-js';

function Wrapper(props: { children: JSX.Element }) {
  return (
    <EmpoleonProvider
      theme={{
        components: {
          TestComponent: {
            defaultProps: {
              test: 'theme-default-prop',
            },
          },
        },
      }}
    >
      {props.children}
    </EmpoleonProvider>
  );
}

describe('@empoleon/core/use-component-default-props', () => {
  it('returns default props from EmpoleonProvider context', () => {
    const { result } = renderHook(() => useProps<{ test?: string }>('TestComponent', {}, {}), {
      wrapper: Wrapper,
    });
    expect(result.test).toBe('theme-default-prop');
  });

  it('overrides theme default props with props passed to hook', () => {
    const { result } = renderHook(
      () => useProps<{ test?: string }>('TestComponent', {}, { test: 'direct-prop' }),
      { wrapper: Wrapper }
    );
    expect(result.test).toBe('direct-prop');
  });

  it('overrides component default props with props passed to hook', () => {
    const { result } = renderHook(
      () =>
        useProps<{ test?: string }>(
          'TestComponent',
          { test: 'component-prop' },
          { test: 'direct-prop' }
        ),
      { wrapper: EmpoleonProvider }
    );
    expect(result.test).toBe('direct-prop');
  });
});

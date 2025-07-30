import { renderHook } from '@testing-library/react';
import { EmpoleonProvider } from '../EmpoleonProvider';
import { useProps } from './use-props';

function Wrapper({ children }: { children: React.ReactNode }) {
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
      {children}
    </EmpoleonProvider>
  );
}

describe('@empoleon/core/use-component-default-props', () => {
  it('returns default props from EmpoleonProvider context', () => {
    const { result } = renderHook(() => useProps<{ test?: string }>('TestComponent', {}, {}), {
      wrapper: Wrapper,
    });
    expect(result.current.test).toBe('theme-default-prop');
  });

  it('overrides theme default props with props passed to hook', () => {
    const { result } = renderHook(
      () => useProps<{ test?: string }>('TestComponent', {}, { test: 'direct-prop' }),
      { wrapper: Wrapper }
    );
    expect(result.current.test).toBe('direct-prop');
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
    expect(result.current.test).toBe('direct-prop');
  });
});

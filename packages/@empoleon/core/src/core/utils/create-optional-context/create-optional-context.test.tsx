import { render, renderHook } from '@solidjs/testing-library';
import { JSX } from 'solid-js';
import { createOptionalContext } from './create-optional-context';

interface ContextType {
  value: number;
  onChange: (value: number) => void;
}

describe('@empoleon/core/create-optional-context', () => {
  it('returns context value when used inside Provider', () => {
    const fn = vi.fn();
    const [Provider, useContext] = createOptionalContext<ContextType>();

    let ctxValue: ContextType | null = null;
    function Consumer() {
      ctxValue = useContext();
      return null;
    }

    render(() => (
      <Provider value={{ value: 100, onChange: fn }}>
        <Consumer />
      </Provider>
    ));

    expect(ctxValue).toEqual({ value: 100, onChange: fn });
  });

  it('returns null when useSafeContext hook was called without Provider', () => {
    const [, useContext] = createOptionalContext<ContextType>();
    const wrapper = ({ children }: { children: JSX.Element }) => children;

    const view = renderHook(() => useContext(), { wrapper });
    expect(view.result).toBe(null);
  });
});

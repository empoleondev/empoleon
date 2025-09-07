import { renderHook, render } from '@solidjs/testing-library';
import { patchConsoleError } from '@empoleon-tests/core';
import { createSafeContext } from './create-safe-context';
import { JSX } from 'solid-js';

interface ContextType {
  value: number;
  onChange: (value: number) => void;
}

describe('@empoleon/core/create-safe-context', () => {
  it('throws error if useSafeContext hook was called without Provider', () => {
    patchConsoleError();
    const [, useContext] = createSafeContext<ContextType>('test-error');
    expect(() => renderHook(() => useContext())).toThrow(new Error('test-error'));
    patchConsoleError.release();
  });

  it('returns context value when used inside Provider', () => {
    const fn = vi.fn();
    const [Provider, useContext] = createSafeContext<ContextType>('test-error');

    let ctxValue: ContextType | undefined;
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
});

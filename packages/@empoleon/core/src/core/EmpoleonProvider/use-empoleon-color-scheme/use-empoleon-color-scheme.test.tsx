import { renderHook } from '@solidjs/testing-library';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../EmpoleonProvider';
import { useEmpoleonColorScheme } from './use-empoleon-color-scheme';

function Wrapper(props: { children: JSX.Element }) {
  return <EmpoleonProvider defaultColorScheme="dark">{props.children}</EmpoleonProvider>;
}

describe('@empoleon/core/EmpoleonProvider/use-empoleon-color-scheme', () => {
  it('returns color scheme from EmpoleonProvider context', () => {
    const { result } = renderHook(() => useEmpoleonColorScheme(), { wrapper: Wrapper });
    expect(result.colorScheme).toBe('dark');
  });

  describe('with default values', () => {
    function DefaultWrapper(props: { children: JSX.Element }) {
      return <EmpoleonProvider>{props.children}</EmpoleonProvider>;
    }

    it('returns the correct color schema based on prefers-color-scheme', () => {
      const { result } = renderHook(() => useEmpoleonColorScheme(), { wrapper: DefaultWrapper });
      expect(result.colorScheme).toBe('light');
    });
  });
});

import { renderHook } from '@testing-library/react';
import { EmpoleonProvider } from '../EmpoleonProvider';
import { useEmpoleonColorScheme } from './use-empoleon-color-scheme';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <EmpoleonProvider defaultColorScheme="dark">{children}</EmpoleonProvider>;
}

describe('@empoleon/core/EmpoleonProvider/use-empoleon-color-scheme', () => {
  it('returns color scheme from EmpoleonProvider context', () => {
    const { result } = renderHook(() => useEmpoleonColorScheme(), { wrapper: Wrapper });
    expect(result.current.colorScheme).toBe('dark');
  });

  describe('with default values', () => {
    function DefaultWrapper({ children }: { children: React.ReactNode }) {
      return <EmpoleonProvider>{children}</EmpoleonProvider>;
    }

    it('returns the correct color schema based on prefers-color-scheme', () => {
      const { result } = renderHook(() => useEmpoleonColorScheme(), { wrapper: DefaultWrapper });
      expect(result.current.colorScheme).toBe('light');
    });
  });
});

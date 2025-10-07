import { render } from '@solidjs/testing-library';
import { createEffect } from 'solid-js';
import { useColorScheme } from './use-color-scheme';

describe('@empoleon/hooks/use-color-scheme', () => {
  // @ts-ignore
  let trace = vi.fn<(colorScheme: string) => void, string[]>();
  const mockMatchMedia = vi.fn().mockImplementation(() => ({
    matches: true,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
  const retainMatchMedia = window.matchMedia;
  beforeEach(() => {
    trace = vi.fn();
    window.matchMedia = retainMatchMedia;
  });

  function WrapperComponent({
    initialValue,
    getInitialValueInEffect = true,
  }: {
    initialValue?: 'light' | 'dark';
    getInitialValueInEffect?: boolean;
  }) {
    const colorScheme = useColorScheme(initialValue, {
      getInitialValueInEffect,
    });

    // Always trace the initial value
    const initialColorScheme = colorScheme();
    trace(initialColorScheme);

    // Only create effect if getInitialValueInEffect is true
    if (getInitialValueInEffect) {
      createEffect(() => {
        const current = colorScheme();
        // Only trace if the value actually changed from the initial value
        if (current !== initialColorScheme) {
          trace(current);
        }
      });
    }

    return colorScheme();
  }

  it('correctly returns initial dark state state without useEffect', () => {
    window.matchMedia = mockMatchMedia;
    render(() => <WrapperComponent initialValue="dark" getInitialValueInEffect={false} />);
    expect(trace).toHaveBeenCalledTimes(1);
    expect(trace.mock.calls[0][0]).toBe('dark');
  });

  it('correctly returns initial light state with useEffect', () => {
    render(() => <WrapperComponent initialValue="dark" getInitialValueInEffect />);
    expect(trace).toHaveBeenCalledTimes(2);
    expect(trace.mock.calls[0][0]).toBe('dark');
    expect(trace.mock.calls[1][0]).toBe('light');
  });

  it('correctly returns initial dark state with useEffect', () => {
    window.matchMedia = mockMatchMedia;
    render(() => <WrapperComponent initialValue="dark" getInitialValueInEffect />);
    expect(trace).toHaveBeenCalledTimes(1);
    expect(trace.mock.calls[0][0]).toBe('dark');
  });
  it('correctly returns initial light state with default props', () => {
    render(() => <WrapperComponent />);
    expect(trace).toHaveBeenCalledTimes(1);
    expect(trace.mock.calls[0][0]).toBe('light');
  });
  it('correctly returns initial dark state with default props', () => {
    window.matchMedia = mockMatchMedia;
    render(() => <WrapperComponent />);
    expect(trace).toHaveBeenCalledTimes(2);
    expect(trace.mock.calls[0][0]).toBe('light');
    expect(trace.mock.calls[1][0]).toBe('dark');
  });
});

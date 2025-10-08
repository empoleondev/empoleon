import { renderHook, cleanup } from '@solidjs/testing-library';
import { useElementSize, useResizeObserver } from './use-resize-observer';

class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

let mockObserverInstance: MockResizeObserver;

const originalResizeObserver = global.ResizeObserver;
const originalRAF = window.requestAnimationFrame;
const originalCAF = window.cancelAnimationFrame;

describe('@mantine/hooks/use-resize-observer', () => {
  beforeEach(() => {
    global.ResizeObserver = vi.fn().mockImplementation(() => {
      mockObserverInstance = new MockResizeObserver();
      return mockObserverInstance;
    }) as any;

    window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0) as any;
    window.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
    window.requestAnimationFrame = originalRAF;
    window.cancelAnimationFrame = originalCAF;
  });

  it('returns reference and default dimensions', () => {
    const { result } = renderHook(() => useResizeObserver());
    const [ref, rect] = result;

    expect(typeof ref).toBe('function');
    expect(rect()).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });
  });

  it('calls observe on mount and disconnect on unmount', () => {
    renderHook(() => useResizeObserver());

    expect(global.ResizeObserver).toHaveBeenCalled();

    cleanup();

    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });
});

describe('@mantine/hooks/use-element-size', () => {
  beforeEach(() => {
    global.ResizeObserver = vi.fn().mockImplementation(() => {
      mockObserverInstance = new MockResizeObserver();
      return mockObserverInstance;
    }) as any;

    window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
    window.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
    window.requestAnimationFrame = originalRAF;
    window.cancelAnimationFrame = originalCAF;
  });

  it('returns reference and default dimensions', () => {
    const { result } = renderHook(() => useElementSize());

    expect(typeof result.ref).toBe('function');
    expect(result.width()).toBe(0);
    expect(result.height()).toBe(0);
  });
});

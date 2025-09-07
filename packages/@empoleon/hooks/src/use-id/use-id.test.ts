import { renderHook } from '@solidjs/testing-library';
import { useId } from './use-id';

describe('use-id', () => {
  it('returns static id', () => {
    const view = renderHook(() => useId('test-id'));
    expect(view.result).toBe('test-id');
  });

  it('returns random id if static id is not provided', () => {
    const view = renderHook(() => useId());
    expect(typeof view.result).toBe('string');
    expect(view.result.includes('empoleon')).toBe(true);
    expect(view.result !== renderHook(() => useId()).result).toBe(true);
  });
});

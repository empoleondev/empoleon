import { renderHook } from '@solidjs/testing-library';
import { useRandomClassName } from './use-random-classname';

describe('@empoleon/core/Box/use-random-classname', () => {
  it('returns random classname', () => {
    const { result } = renderHook(() => useRandomClassName());
    expect(result).toMatch(/^__m__-cl-0$/);
  });
});

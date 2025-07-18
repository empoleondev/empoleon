import { getBaseSize } from './get-base-size';

describe('@empoleon/core/AppShell/get-base-size', () => {
  it('returns base size from number', () => {
    expect(getBaseSize(10)).toBe(10);
  });

  it('returns base size from object', () => {
    expect(getBaseSize({ base: 10 })).toBe(10);
  });
});

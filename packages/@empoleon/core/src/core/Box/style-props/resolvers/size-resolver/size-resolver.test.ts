import { sizeResolver } from './size-resolver';

describe('@empoleon/core/Box/size-resolver', () => {
  it('resolves number correctly', () => {
    expect(sizeResolver(10)).toBe('calc(0.625rem * var(--empoleon-scale))');
    expect(sizeResolver(-10)).toBe('calc(-0.625rem * var(--empoleon-scale))');
    expect(sizeResolver(1.5)).toBe('calc(0.09375rem * var(--empoleon-scale))');
    expect(sizeResolver(0)).toBe('0rem');
  });

  it('resolves string correctly', () => {
    expect(sizeResolver('10px')).toBe('10px');
    expect(sizeResolver('-10px')).toBe('-10px');
  });
});

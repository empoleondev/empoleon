import { DEFAULT_THEME } from '../../../../EmpoleonProvider';
import { lineHeightResolver } from './line-height-resolver';

describe('@empoleon/core/Box/line-height-resolver', () => {
  it('resolves theme line height', () => {
    expect(lineHeightResolver('xs', DEFAULT_THEME)).toBe('var(--empoleon-line-height-xs)');
    expect(lineHeightResolver('sm', DEFAULT_THEME)).toBe('var(--empoleon-line-height-sm)');
    expect(lineHeightResolver('md', DEFAULT_THEME)).toBe('var(--empoleon-line-height-md)');
    expect(lineHeightResolver('lg', DEFAULT_THEME)).toBe('var(--empoleon-line-height-lg)');
    expect(lineHeightResolver('xl', DEFAULT_THEME)).toBe('var(--empoleon-line-height-xl)');
  });

  it('resolves number line height', () => {
    expect(lineHeightResolver(12, DEFAULT_THEME)).toBe(12);
    expect(lineHeightResolver(1.55, DEFAULT_THEME)).toBe(1.55);
  });

  it('resolves string line height', () => {
    expect(lineHeightResolver('12px', DEFAULT_THEME)).toBe('12px');
    expect(lineHeightResolver('1em', DEFAULT_THEME)).toBe('1em');
  });
});

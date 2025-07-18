import { fontFamilyResolver } from './font-family-resolver';

describe('@empoleon/core/Box/font-family-resolver', () => {
  it('resolves theme font family', () => {
    expect(fontFamilyResolver('text')).toBe('var(--empoleon-font-family)');
    expect(fontFamilyResolver('mono')).toBe('var(--empoleon-font-family-monospace)');
    expect(fontFamilyResolver('heading')).toBe('var(--empoleon-font-family-headings)');
  });

  it('resolves non theme font family', () => {
    expect(fontFamilyResolver('Arial')).toBe('Arial');
  });
});

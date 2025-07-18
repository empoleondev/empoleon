const values = {
  text: 'var(--empoleon-font-family)',
  mono: 'var(--empoleon-font-family-monospace)',
  monospace: 'var(--empoleon-font-family-monospace)',
  heading: 'var(--empoleon-font-family-headings)',
  headings: 'var(--empoleon-font-family-headings)',
};

export function fontFamilyResolver(fontFamily: unknown) {
  if (typeof fontFamily === 'string' && fontFamily in values) {
    return values[fontFamily as keyof typeof values];
  }

  return fontFamily;
}

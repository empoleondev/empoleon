import { DEFAULT_THEME } from '../../../../EmpoleonProvider';
import { rem } from '../../../../utils';
import { borderResolver } from './border-resolver';

describe('@empoleon/core/Box/border-resolver', () => {
  it('correctly resolves border with width only', () => {
    expect(borderResolver(1, DEFAULT_THEME)).toBe(rem(1));
    expect(borderResolver('1rem', DEFAULT_THEME)).toBe(rem('1rem'));
  });

  it('correctly resolves border with width and style', () => {
    expect(borderResolver('1px solid', DEFAULT_THEME)).toBe(`${rem('1px')} solid`);
    expect(borderResolver('1rem solid', DEFAULT_THEME)).toBe(`${rem('1rem')} solid`);
  });

  it('correctly resolves border with width, style and color', () => {
    expect(borderResolver('1px solid red', DEFAULT_THEME)).toBe(
      `${rem('1px')} solid var(--empoleon-color-red-filled)`
    );
    expect(borderResolver('1rem solid red.8', DEFAULT_THEME)).toBe(
      `${rem('1rem')} solid var(--empoleon-color-red-8)`
    );
    expect(borderResolver('1rem solid #000', DEFAULT_THEME)).toBe(`${rem('1rem')} solid #000`);

    expect(borderResolver('1rem solid rgba(0, 0, 0, .12)', DEFAULT_THEME)).toBe(
      `${rem('1rem')} solid rgba(0, 0, 0, .12)`
    );

    expect(borderResolver('1px     solid    red   ', DEFAULT_THEME)).toBe(
      `${rem('1px')} solid var(--empoleon-color-red-filled)`
    );
  });
});

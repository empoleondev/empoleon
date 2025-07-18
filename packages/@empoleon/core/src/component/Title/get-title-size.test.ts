import { getTitleSize } from './get-title-size';

describe('@empoleon/core/Title/get-title-size', () => {
  it('returns correct font size for h1-h6 based on order/size', () => {
    expect(getTitleSize(1, undefined)).toStrictEqual({
      fontSize: 'var(--empoleon-h1-font-size)',
      fontWeight: 'var(--empoleon-h1-font-weight)',
      lineHeight: 'var(--empoleon-h1-line-height)',
    });

    expect(getTitleSize(2, 'h1')).toStrictEqual({
      fontSize: 'var(--empoleon-h1-font-size)',
      fontWeight: 'var(--empoleon-h1-font-weight)',
      lineHeight: 'var(--empoleon-h1-line-height)',
    });
  });

  it('returns correct font size for size in px', () => {
    expect(getTitleSize(3, 32)).toStrictEqual({
      fontSize: 'calc(2rem * var(--empoleon-scale))',
      fontWeight: 'var(--empoleon-h3-font-weight)',
      lineHeight: 'var(--empoleon-h3-line-height)',
    });
  });
});

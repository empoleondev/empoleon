import { cssVariablesObjectToString } from './css-variables-object-to-string';

describe('@empoleon/core/css-variables-object-to-string', () => {
  it('converts object to css variables string', () => {
    expect(
      cssVariablesObjectToString({
        '--empoleon-color-white': '#fff',
        '--empoleon-color-black': '#000',
      })
    ).toBe('--empoleon-color-white: #fff;--empoleon-color-black: #000;');
  });
});

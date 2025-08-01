import { convertCssVariables } from './convert-css-variables';

const result = [
  '.empoleon-test{--empoleon-color-white: #fff;--empoleon-color-black: #000;}',
  '.empoleon-test[data-empoleon-color-scheme="dark"]{--empoleon-color-filled: red;}',
  '.empoleon-test[data-empoleon-color-scheme="light"]{--empoleon-color-filled: blue;}',
];

describe('@empoleon/core/convert-css-variables', () => {
  it('converts object to css variables string', () => {
    expect(
      convertCssVariables(
        {
          variables: {
            '--empoleon-color-white': '#fff',
            '--empoleon-color-black': '#000',
          },

          dark: {
            '--empoleon-color-filled': 'red',
          },

          light: {
            '--empoleon-color-filled': 'blue',
          },
        },
        '.empoleon-test'
      )
    ).toBe(result.join(''));
  });
});

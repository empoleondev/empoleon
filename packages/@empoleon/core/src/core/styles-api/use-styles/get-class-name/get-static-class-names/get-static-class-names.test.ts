import { getStaticClassNames } from './get-static-class-names';

describe('@empoleon/core/get-static-class-names', () => {
  it('returns correct static class names for single themeName', () => {
    expect(
      getStaticClassNames({
        themeName: ['Input'],
        selector: 'wrapper',
        classNamesPrefix: 'empoleon',
      })
    ).toStrictEqual(['empoleon-Input-wrapper']);
  });

  it('returns correct static class names for multiple themeNames', () => {
    expect(
      getStaticClassNames({
        themeName: ['Input', 'Select'],
        selector: 'wrapper',
        classNamesPrefix: 'empoleon',
      })
    ).toStrictEqual(['empoleon-Input-wrapper', 'empoleon-Select-wrapper']);
  });

  it('returns empty array if withStaticClass is false', () => {
    expect(
      getStaticClassNames({
        themeName: ['Input', 'Select'],
        selector: 'wrapper',
        classNamesPrefix: 'empoleon',
        withStaticClass: false,
      })
    ).toStrictEqual([]);
  });
});

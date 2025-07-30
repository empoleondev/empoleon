import { filterProps } from './filter-props';

describe('@empoleon/core/filterProps', () => {
  it('filters out props with undefined value', () => {
    expect(
      filterProps({
        a: undefined,
        b: null,
        c: 0,
        d: '',
        e: {},
        f: [],
      })
    ).toStrictEqual({
      b: null,
      c: 0,
      d: '',
      e: {},
      f: [],
    });
  });
});

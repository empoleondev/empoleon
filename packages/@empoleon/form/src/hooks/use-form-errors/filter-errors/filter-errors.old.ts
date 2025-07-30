import { filterErrors } from './filter-errors';

describe('@empoleon/form/filter-errors', () => {
  it('filters null, false and undefined errors', () => {
    expect(filterErrors({ a: null, b: 0, c: '', d: false, f: undefined, g: [] })).toStrictEqual({
      b: 0,
      c: '',
      g: [],
    });
  });
});

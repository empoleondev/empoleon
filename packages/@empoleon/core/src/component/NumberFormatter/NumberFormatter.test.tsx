import { tests } from '@empoleon-tests/core';
import { NumberFormatter } from './NumberFormatter';

describe('@empoleon/core/NumberFormatter', () => {
  tests.itHasExtend({ component: NumberFormatter });

  it('has correct displayName', () => {
    expect(NumberFormatter.displayName).toEqual('@empoleon/core/NumberFormatter');
  });
});

import { randomId } from './random-id';

describe('@empoleon/hooks/random-id', () => {
  it('returns random id with empoleon- prefix', () => {
    expect(randomId().includes('empoleon-')).toBe(true);
    expect(randomId()).toHaveLength(18);
  });

  it('supports custom prefix', () => {
    expect(randomId('my-prefix-').includes('my-prefix-')).toBe(true);
  });
});

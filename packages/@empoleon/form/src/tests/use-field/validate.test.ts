import { renderHook } from '@solidjs/testing-library';
import { useField } from '../../use-field';
import { isNotEmpty } from '../../validators';

function validateAsync(value: string): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value === 'test' ? 'error' : null);
    }, 1000);
  });
}

describe('@empoleon/form/use-field/validate', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('supports sync validation', async () => {
    const hook = renderHook(() =>
      useField({ initialValue: 'test', validate: (value) => (value === 'test' ? 'error' : null) })
    );
    hook.result.validate();
    expect(hook.result.error()).toBe('error');

    hook.result.setValue('new value');
    await hook.result.validate();
    expect(hook.result.error()).toBe(null);
  });

  it('supports async validation', async () => {
    const hook = renderHook(() => useField({ initialValue: 'test', validate: validateAsync }));

    const validate1 = hook.result.validate();
    vi.advanceTimersByTime(1000);
    await validate1;
    expect(hook.result.error()).toBe('error');

    hook.result.setValue('new value');
    const validate2 = hook.result.validate();
    vi.advanceTimersByTime(1000);
    await validate2;
    expect(hook.result.error()).toBe(null);
  });

  it('works correctly with validators', async () => {
    const hook = renderHook(() =>
      useField({ initialValue: '', validate: isNotEmpty('test error') })
    );

    await hook.result.validate();
    expect(hook.result.error()).toBe('test error');

    hook.result.setValue('test');
    await hook.result.validate();
    expect(hook.result.error()).toBe(null);
  });

  it('validates field on value change if validateOnChange is set to true', async () => {
    const hook = renderHook(() =>
      useField({
        initialValue: 'test',
        validateOnChange: true,
        validate: (value) => (value === 'test' ? 'error' : null),
      })
    );

    hook.result.getInputProps().onChange('new value');
    expect(hook.result.error()).toBe(null);

    hook.result.getInputProps().onChange('test');
    expect(hook.result.error()).toBe('error');
  });

  it('validate filed on blur if validateOnBlur is set to true', async () => {
    const hook = renderHook(() =>
      useField({
        initialValue: 'test',
        validateOnBlur: true,
        validate: (value) => (value === 'test' ? 'error' : null),
      })
    );

    hook.result.getInputProps().onBlur();
    expect(hook.result.error()).toBe('error');

    hook.result.getInputProps().onChange('new value');
    hook.result.getInputProps().onBlur();
    expect(hook.result.error()).toBe(null);
  });
});

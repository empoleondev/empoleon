import { renderHook } from '@solidjs/testing-library';
import { useField } from '../../use-field';

describe('@empoleon/form/use-field/error', () => {
  it('correctly sets initial error', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialError: 'test-error' }));
    expect(hook.result.error()).toBe('test-error');
  });

  it('changes error with setError handler', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialError: 'test-error' }));
    expect(hook.result.error()).toBe('test-error');
    hook.result.setError('new error');
    expect(hook.result.error()).toBe('new error');
  });

  it('resets error to null with reset handler', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialError: 'test-error' }));
    expect(hook.result.error()).toBe('test-error');
    hook.result.setError('new error');
    expect(hook.result.error()).toBe('new error');
    hook.result.reset();
    expect(hook.result.error()).toBe(null);
  });

  it('handles resolveValidationError error function', async () => {
    const hook = renderHook(() =>
      useField({
        initialValue: 'test',
        validate: () => Promise.reject(new Error('test-error')),
        resolveValidationError: (error) => (error instanceof Error ? error.message : null),
      })
    );

    expect(hook.result.error()).toBe(null);
    await hook.result.validate();
    expect(hook.result.error()).toBe('test-error');
  });

  it('clears error when value is set if clearErrorOnChange is set to true', async () => {
    const hook = renderHook(() =>
      useField({ initialValue: 'test', validate: (value) => (value === 'test' ? 'error' : null) })
    );

    expect(hook.result.error()).toBe(null);
    hook.result.setValue('test');
    await hook.result.validate();
    expect(hook.result.error()).toBe('error');

    hook.result.setValue('new value');
    expect(hook.result.error()).toBe(null);
  });

  it('does not clear error when value is set if clearErrorOnChange is set to false', async () => {
    const hook = renderHook(() =>
      useField({
        initialValue: 'test',
        validate: (value) => (value === 'test' ? 'error' : null),
        clearErrorOnChange: false,
      })
    );

    expect(hook.result.error()).toBe(null);
    hook.result.setValue('test');
    await hook.result.validate();
    expect(hook.result.error()).toBe('error');

    hook.result.setValue('new value');
    expect(hook.result.error()).toBe('error');
  });
});

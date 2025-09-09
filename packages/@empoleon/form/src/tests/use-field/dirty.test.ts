import { renderHook } from '@solidjs/testing-library';
import { useField } from '../../use-field';

describe('@empoleon/form/use-field/dirty', () => {
  it('detects correct dirty state', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.isDirty()).toBe(false);
    hook.result.getInputProps().onChange('new value');
    expect(hook.result.isDirty()).toBe(true);
  });

  it('resets dirty state with reset handler', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.isDirty()).toBe(false);
    hook.result.getInputProps().onChange('new value');
    expect(hook.result.isDirty()).toBe(true);
    hook.result.reset();
    expect(hook.result.isDirty()).toBe(false);
  });
});

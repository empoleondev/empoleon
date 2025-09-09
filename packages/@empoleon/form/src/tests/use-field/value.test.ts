import { renderHook } from '@solidjs/testing-library';
import { useField } from '../../use-field';

describe('@empoleon/form/use-field/value', () => {
  it('assigns correct initial value', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.getValue()).toBe('test');
  });

  it('changes value with setValue handler', async () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.getValue()).toBe('test');
    hook.result.setValue('new value');
    expect(hook.result.getValue()).toBe('new value');
  });

  it('resets value to initial value with reset handler', async () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.getValue()).toBe('test');
    hook.result.setValue('new value');
    expect(hook.result.getValue()).toBe('new value');
    hook.result.reset();
    expect(hook.result.getValue()).toBe('test');
  });

  it('calls onValueChange handler when value changes', async () => {
    const onValueChange = vi.fn();
    const hook = renderHook(() => useField({ initialValue: 'test', onValueChange }));
    hook.result.setValue('new value');
    expect(onValueChange).toHaveBeenLastCalledWith('new value');

    hook.result.getInputProps().onChange('new value 2');
    expect(onValueChange).toHaveBeenLastCalledWith('new value 2');
  });
});

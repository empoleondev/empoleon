import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('accepts initial dirty state', () => {
    const hook = renderHook(() => useForm({ mode, initialDirty: { a: true, b: false } }));
    expect(hook.result.isDirty('a')).toBe(true);
    expect(hook.result.isDirty('b')).toBe(false);
    expect(hook.result.isDirty()).toBe(true);
  });

  it('sets field as dirty if value changes', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1 } }));
    expect(hook.result.isDirty('a')).toBe(false);
    expect(hook.result.isDirty()).toBe(false);

    hook.result.setFieldValue('a', 5);
    expect(hook.result.isDirty('a')).toBe(true);
    expect(hook.result.isDirty()).toBe(true);

    hook.result.setFieldValue('a', 1);
    expect(hook.result.isDirty('a')).toBe(false);
    expect(hook.result.isDirty()).toBe(false);
  });

  it('allows to set dirty state with setDirty handler', () => {
    const hook = renderHook(() => useForm());
    expect(hook.result.isDirty()).toBe(false);
    expect(hook.result.isDirty('a')).toBe(false);

    hook.result.setDirty({ a: true });
    expect(hook.result.isDirty()).toBe(true);
    expect(hook.result.isDirty('a')).toBe(true);
  });

  it('resets status with resetDirty handler', () => {
    const hook = renderHook(() => useForm({ mode, initialDirty: { a: true } }));
    expect(hook.result.isDirty()).toBe(true);

    hook.result.resetDirty();
    expect(hook.result.isDirty()).toBe(false);
  });

  it('sets list field as dirty if list item changes', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: [{ b: 1 }, { b: 2 }] } }));
    hook.result.setFieldValue('a.0', { b: 3 });
    expect(hook.result.isDirty('a.0')).toBe(true);
    expect(hook.result.isDirty('a')).toBe(true);

    hook.result.setFieldValue('a', [{ b: 1 }, { b: 2 }]);
    expect(hook.result.isDirty('a.0')).toBe(false);
    expect(hook.result.isDirty('a')).toBe(false);

    hook.result.insertListItem('a', [{ b: 3 }]);
    expect(hook.result.isDirty('a.2')).toBe(true);
    expect(hook.result.isDirty('a')).toBe(true);

    hook.result.removeListItem('a', 2);
    expect(hook.result.isDirty('a.2')).toBe(false);
    expect(hook.result.isDirty('a')).toBe(false);
  });
}

describe('@empoleon/form/dirty-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/dirty-uncontrolled', () => {
  tests('uncontrolled');
});

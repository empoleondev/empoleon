import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('memoizes values that were used in resetDirty', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    expect(hook.result.isDirty()).toBe(false);

    hook.result.setFieldValue('a', 3);
    expect(hook.result.isDirty()).toBe(true);

    hook.result.resetDirty();
    expect(hook.result.isDirty()).toBe(false);

    hook.result.setFieldValue('a', 1);
    expect(hook.result.isDirty()).toBe(true);

    hook.result.setFieldValue('a', 3);
    expect(hook.result.isDirty()).toBe(false);
  });

  it('correctly handles partial values', () => {
    const hook = renderHook(() =>
      useForm<{ a: number; b?: number }>({ mode, initialValues: { a: 1, b: 2 } })
    );

    expect(hook.result.isDirty()).toBe(false);

    hook.result.setValues({ a: 2 });
    hook.result.resetDirty({ a: 2 });

    expect(hook.result.isDirty()).toBe(false);
  });

  it('should handle reseting with new values', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    expect(hook.result.isDirty()).toBe(false);

    hook.result.resetDirty({ a: 2, b: 2 });
    expect(hook.result.isDirty()).toBe(true);
  });
}

describe('@empoleon/form/resetDirty-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/resetDirty-uncontrolled', () => {
  tests('uncontrolled');
});

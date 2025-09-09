import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('resets errors and values with reset handler', () => {
    const hook = renderHook(() =>
      useForm({ mode, initialErrors: { a: 1, b: 2 }, initialValues: { c: 3, d: 4 } })
    );
    expect(hook.result.errors).toStrictEqual({ a: 1, b: 2 });
    expect(hook.result.getValues()).toStrictEqual({ c: 3, d: 4 });

    hook.result.setValues({ c: 5, d: 6 });
    hook.result.setErrors({ a: 7, b: 8 });
    expect(hook.result.getValues()).toStrictEqual({ c: 5, d: 6 });
    expect(hook.result.errors).toStrictEqual({ a: 7, b: 8 });

    hook.result.reset();
    expect(hook.result.errors).toStrictEqual({});
    expect(hook.result.getValues()).toStrictEqual({ c: 3, d: 4 });
  });

  it('resets touched and dirty state', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: { a: 1 },
        initialDirty: { a: true },
        initialTouched: { a: true },
      })
    );

    expect(hook.result.isDirty()).toBe(true);
    expect(hook.result.isTouched()).toBe(true);

    hook.result.reset();
    expect(hook.result.isDirty()).toBe(false);
    expect(hook.result.isTouched()).toBe(false);
  });

  it('resets values without keeping added values', () => {
    const hook = renderHook(() =>
      useForm<{ a: number; b?: number; c?: number }>({ mode, initialValues: { a: 1, b: 2 } })
    );

    hook.result.setFieldValue('c', 3);
    expect(hook.result.isDirty()).toBe(true);
    expect(hook.result.getValues()).toStrictEqual({ a: 1, b: 2, c: 3 });

    hook.result.reset();
    expect(hook.result.isDirty()).toBe(false);
    expect(hook.result.getValues()).toStrictEqual({ a: 1, b: 2 });
  });

  it('resets values correctly after updating initial values', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    const newInitialState = { a: 3, b: 4 };

    hook.result.setValues({ a: 100, b: 200 });
    hook.result.setInitialValues(newInitialState);
    hook.result.reset();

    expect(hook.result.getValues()).toStrictEqual(newInitialState);
  });
}

describe('@empoleon/form/reset-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/reset-uncontrolled', () => {
  tests('uncontrolled');
});

import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

interface Values {
  a: number;
  b: number;
}

function tests(mode: FormMode) {
  it('resets errors when setValues is called', () => {
    const hook = renderHook(() => useForm<Values>({ mode, initialErrors: { a: 1, b: 2 } }));
    expect(hook.result.errors).toStrictEqual({ a: 1, b: 2 });
    hook.result.setValues({ a: 1, b: 2 });
    expect(hook.result.errors).toStrictEqual({});
  });

  it('does not reset errors when setValues is called if clearInputErrorOnChange is false', () => {
    const hook = renderHook(() =>
      useForm<Values>({
        mode,
        initialErrors: { a: 1, b: 2 },
        clearInputErrorOnChange: false,
      })
    );

    expect(hook.result.errors).toStrictEqual({ a: 1, b: 2 });
    hook.result.setValues({ a: 1, b: 2 });
    expect(hook.result.errors).toStrictEqual({ a: 1, b: 2 });
  });

  it('allows setting values partial', () => {
    const hook = renderHook(() => useForm<Values>({ mode, initialValues: { a: 1, b: 2 } }));
    hook.result.setValues({ a: 3 });
    expect(hook.result.getValues()).toStrictEqual({ a: 3, b: 2 });
  });
}

describe('@empoleon/form/setValues-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/setValues-uncontrolled', () => {
  tests('uncontrolled');
});

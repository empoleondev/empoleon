import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('sets given value with root path', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));

    hook.result.setFieldValue('a', 10);
    expect(hook.result.getValues()).toStrictEqual({ a: 10, b: 2 });

    hook.result.setFieldValue('b', 20);
    expect(hook.result.getValues()).toStrictEqual({ a: 10, b: 20 });
  });

  it('sets given value at composite path', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: { d: 2, b: { c: 1 } } } }));

    hook.result.setFieldValue('a.b.c', 10);
    expect(hook.result.getValues()).toStrictEqual({ a: { d: 2, b: { c: 10 } } });

    hook.result.setFieldValue('a.d', 20);
    expect(hook.result.getValues()).toStrictEqual({ a: { d: 20, b: { c: 10 } } });
  });

  it('sets given value at array path', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: [{ b: 1 }, { b: 2 }] } }));

    hook.result.setFieldValue('a.1.b', 20);
    expect(hook.result.getValues()).toStrictEqual({ a: [{ b: 1 }, { b: 20 }] });

    hook.result.setFieldValue('a.0.b', 10);
    expect(hook.result.getValues()).toStrictEqual({ a: [{ b: 10 }, { b: 20 }] });
  });

  it('sets given value at mixed nested path', () => {
    const hook = renderHook(() =>
      useForm({ mode, initialValues: { a: [{ b: { c: 1 } }, { b: { c: 2 } }] } })
    );

    hook.result.setFieldValue('a.1.b.c', 20);
    expect(hook.result.getValues()).toStrictEqual({
      a: [{ b: { c: 1 } }, { b: { c: 20 } }],
    });

    hook.result.setFieldValue('a.0.b.c', 10);
    expect(hook.result.getValues()).toStrictEqual({
      a: [{ b: { c: 10 } }, { b: { c: 20 } }],
    });
  });

  it('sets value at path based on previous value', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: { d: 2, b: { c: 1 } } } }));

    hook.result.setFieldValue('a.b.c', (prev) => prev + 1);
    expect(hook.result.getValues()).toStrictEqual({ a: { d: 2, b: { c: 2 } } });
  });
}

describe('@empoleon/form/setFieldValue-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/setFieldValue-uncontrolled', () => {
  tests('uncontrolled');
});

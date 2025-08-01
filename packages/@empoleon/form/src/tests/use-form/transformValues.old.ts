import { act, renderHook } from '@testing-library/react';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

const getFormEvent = () => ({ preventDefault: vi.fn() }) as any;

function tests(mode: FormMode) {
  it('does not transform values if transformValues function is not provided', () => {
    const spy = vi.fn();
    const event = getFormEvent();
    const hook = renderHook(() => useForm({ mode, initialValues: { a: '1', b: 1 } }));
    act(() => hook.result.current.onSubmit(spy)(event));
    expect(spy).toHaveBeenCalledWith({ a: '1', b: 1 }, event);
  });

  it('transforms values with given transformValues function', () => {
    const spy = vi.fn();
    const event = getFormEvent();
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: { a: '1', b: 1 },
        transformValues: (values) => ({ a: Number(values.a), b: values.b.toString() }),
      })
    );
    act(() => hook.result.current.onSubmit(spy)(event));
    expect(spy).toHaveBeenCalledWith({ a: 1, b: '1' }, event);
  });
}

describe('@empoleon/form/transformValues-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/transformValues-uncontrolled', () => {
  tests('uncontrolled');
});

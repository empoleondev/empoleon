import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

const getFormEvent = () => ({ preventDefault: vi.fn() }) as any;

function tests(mode: FormMode) {
  it('resets form with onReset handler', () => {
    const event = getFormEvent();
    const hook = renderHook(() =>
      useForm({
        mode,
        clearInputErrorOnChange: false,
        initialValues: { a: 1, b: 2 },
        initialErrors: { a: 'error-a', b: 'error-b' },
      })
    );

    hook.result.setValues({ a: 10, b: 20 });
    expect(hook.result.getValues()).toStrictEqual({ a: 10, b: 20 });
    expect(hook.result.errors).toStrictEqual({ a: 'error-a', b: 'error-b' });

    hook.result.onReset(event);
    expect(hook.result.getValues()).toStrictEqual({ a: 1, b: 2 });
    expect(hook.result.errors).toStrictEqual({});
  });
}

describe('@empoleon/form/onReset-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/onReset-uncontrolled', () => {
  tests('uncontrolled');
});

import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

// const getFormEvent = () => ({ preventDefault: vi.fn() }) as any;
const getFormEvent = () => ({ preventDefault: vi.fn(), type: 'submit' }) as any;

function tests(mode: FormMode) {
  it('calls handleSubmit with values and event when all values are valid', () => {
    const hook = renderHook(() =>
      useForm({ mode, initialValues: { banana: 'test banana', apple: 'test apple' } })
    );

    const event = getFormEvent();
    const handleSubmit = vi.fn();
    const handleValidationFailure = vi.fn();

    hook.result.onSubmit(handleSubmit, handleValidationFailure)(event);

    expect(event.preventDefault).toHaveBeenCalled();

    expect(handleValidationFailure).not.toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith(
      { banana: 'test banana', apple: 'test apple' },
      event
    );
  });

  it('calls handleValidationFailure when values are not valid', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: {
          banana: '',
          orange: '',
        },

        validate: {
          banana: (value) => (value !== 'test-banana' ? 'invalid banana' : null),
          orange: (value) => (value !== 'test-orange' ? 'invalid orange' : null),
        },
      })
    );

    const event = getFormEvent();
    const handleSubmit = vi.fn();
    const handleValidationFailure = vi.fn();

    hook.result.onSubmit(handleSubmit, handleValidationFailure)(event);
    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleValidationFailure).toHaveBeenCalledWith(
      {
        banana: 'invalid banana',
        orange: 'invalid orange',
      },
      {
        banana: '',
        orange: '',
      },
      event
    );
    expect(hook.result.errors).toStrictEqual({
      banana: 'invalid banana',
      orange: 'invalid orange',
    });

    hook.result.setValues({ banana: 'test-banana', orange: 'test-orange' });
    hook.result.onSubmit(handleSubmit)(event);
    expect(handleSubmit).toHaveBeenCalledWith(
      { banana: 'test-banana', orange: 'test-orange' },
      event
    );
  });

  it('allows to call onSubmit without event', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1 } }));
    const handleSubmit = vi.fn();
    hook.result.onSubmit(handleSubmit)();
    expect(handleSubmit).toHaveBeenCalledWith({ a: 1 }, undefined);
  });
}

describe('@empoleon/form/onSubmit-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/onSubmit-uncontrolled', () => {
  tests('uncontrolled');
});

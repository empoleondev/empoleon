import { JSX, splitProps } from 'solid-js';
import { TransformedValues, UseFormReturnType } from '../types';

export interface FormProps<Form extends UseFormReturnType<any>>
  extends JSX.HTMLAttributes<HTMLFormElement> {
  form: Form;
  onSubmit?: (values: TransformedValues<Form>) => void;
  onReset?: JSX.EventHandler<HTMLFormElement, Event>;
  ref?: ((el: HTMLFormElement) => void);
}

export const Form = <Form extends UseFormReturnType<any>>(
  props: FormProps<Form>
): JSX.Element => {
  const [local, others] = splitProps(props, ['form', 'onSubmit', 'onReset', 'ref']);

  return (
    <form
      {...others}
      onSubmit={(event) => {
        const formHandler = local.form.onSubmit(typeof local.onSubmit === 'function' ? local.onSubmit : () => {});
        formHandler(event as unknown as SubmitEvent);
      }}
      onReset={(event) => {
        if (typeof local.onReset === 'function') {
          local.onReset(event);
        }
        local.form.onReset(event as unknown as Event);
      }}
      ref={local.ref}
    />
  );
};

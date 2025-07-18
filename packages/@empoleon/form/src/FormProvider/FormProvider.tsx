import { Component, createContext, JSX, useContext } from 'solid-js';
import { _TransformValues, UseForm, UseFormReturnType } from '../types';
import { useForm } from '../use-form';

export interface FormProviderProps<Form> {
  form: Form;
  children: JSX.Element;
}

export function createFormContext<
  Values,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>() {
  type Form = UseFormReturnType<Values, TransformValues>;

  const FormContext = createContext<Form | null>(null);

  const FormProvider: Component<FormProviderProps<Form>> = (props) => {
    return <FormContext.Provider value={props.form}>{props.children}</FormContext.Provider>;
  }

  function useFormContext() {
    const ctx = useContext(FormContext);
    if (!ctx) {
      throw new Error('useFormContext was called outside of FormProvider context');
    }

    return ctx;
  }

  return [FormProvider, useFormContext, useForm] as [
    Component<FormProviderProps<Form>>,
    () => Form,
    UseForm<Values, TransformValues>,
  ];
}

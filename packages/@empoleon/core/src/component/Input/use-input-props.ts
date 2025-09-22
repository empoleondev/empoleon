import { mergeProps, splitProps } from 'solid-js';
import { BoxProps, extractStyleProps, StylesApiProps, useProps } from '../../core';
import { __BaseInputProps } from './Input';

interface BaseProps
  extends __BaseInputProps,
    BoxProps,
    StylesApiProps<{ props: any; stylesNames: string }> {
  __staticSelector?: string;
  __stylesApiProps?: Record<string, any>;
  id?: string;
}

export function useInputProps<T extends BaseProps, U extends Partial<T> | null>(
  component: string,
  defaultProps: U,
  _props: T
) {
  const props = useProps<T, U>(component, defaultProps, _props);

  const [local, others] = splitProps(props, [
    'label',
    'description',
    'error',
    'required',
    'classNames',
    'styles',
    'className',
    'unstyled',
    '__staticSelector',
    '__stylesApiProps',
    'errorProps',
    'labelProps',
    'descriptionProps',
    'wrapperProps',
    'id',
    'size',
    'style',
    'inputContainer',
    'inputWrapperOrder',
    'withAsterisk',
    'variant',
    'vars',
    'mod',
    'attributes',
  ]) as any;

  const { styleProps, rest } = extractStyleProps(others);

  return mergeProps(rest, {
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    get wrapperProps() {
      return {
        label: local.label,
        description: local.description,
        error: local.error,
        required: local.required,
        classNames: local.classNames,
        className: local.className,
        __staticSelector: local.__staticSelector,
        __stylesApiProps: local.__stylesApiProps || props,
        errorProps: local.errorProps,
        labelProps: local.labelProps,
        descriptionProps: local.descriptionProps,
        unstyled: local.unstyled,
        styles: local.styles,
        size: local.size,
        style: local.style,
        inputContainer: local.inputContainer,
        inputWrapperOrder: local.inputWrapperOrder,
        withAsterisk: local.withAsterisk,
        variant: local.variant,
        id: local.id,
        mod: local.mod,
        attributes: local.attributes,
        vars: local.vars,
        ...local.wrapperProps,
        ...styleProps,
      } as typeof local.wrapperProps & BoxProps;
    },
    get inputProps() {
      return {
        required: local.required,
        classNames: local.classNames,
        styles: local.styles,
        unstyled: local.unstyled,
        size: local.size,
        __staticSelector: local.__staticSelector,
        __stylesApiProps: local.__stylesApiProps || props,
        error: local.error,
        variant: local.variant,
        id: local.id,
      };
    },
  })
}

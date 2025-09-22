// import { mergeProps, splitProps } from 'solid-js';
// import { BoxProps, extractStyleProps, StylesApiProps, useEmpoleonTheme, useProps } from '../../core';
// import { __BaseInputProps } from './Input';

// interface BaseProps
//   extends __BaseInputProps,
//     BoxProps,
//     StylesApiProps<{ props: any; stylesNames: string }> {
//   __staticSelector?: string;
//   __stylesApiProps?: Record<string, any>;
//   id?: string;
// }

// export function useInputProps<T extends Record<string, any>, U extends Partial<T> | null = {}>(
//   component: string,
//   defaultProps: U,
//   props: T
// ) {
//   const theme = useEmpoleonTheme();
//   const contextPropsPayload = theme.components[component]?.defaultProps;
//   const contextProps =
//     typeof contextPropsPayload === 'function' ? contextPropsPayload(theme) : contextPropsPayload;

//   const merged = mergeProps(defaultProps || {}, contextProps || {}, props);

//   const [local, others] = splitProps(merged, [
//     'label',
//     'description',
//     'error',
//     'required',
//     'classNames',
//     'styles',
//     'className',
//     'unstyled',
//     '__staticSelector',
//     '__stylesApiProps',
//     'errorProps',
//     'labelProps',
//     'descriptionProps',
//     'wrapperProps',
//     'id',
//     'size',
//     'style',
//     'inputContainer',
//     'inputWrapperOrder',
//     'withAsterisk',
//     'variant',
//     'vars',
//     'mod',
//     'attributes',
//     'ref'
//   ]);

//   const { styleProps, rest } = extractStyleProps(others);

//   // Create the base object with the direct properties like the original
//   const baseResult = mergeProps(rest, {
//     classNames: local.classNames,
//     styles: local.styles,
//     unstyled: local.unstyled,
//     inputProps: {
//       ...local,
//       __stylesApiProps: local.__stylesApiProps || merged,
//     },
//   });

//   const result = new Proxy(baseResult, {
//     get(target, prop) {
//       if (prop === 'wrapperProps') {
//         return {
//           label: local.label,
//           description: local.description,
//           error: local.error,
//           required: local.required,
//           classNames: local.classNames,
//           className: local.className,
//           __staticSelector: local.__staticSelector,
//           __stylesApiProps: local.__stylesApiProps || merged,
//           errorProps: local.errorProps,
//           labelProps: local.labelProps,
//           descriptionProps: local.descriptionProps,
//           unstyled: local.unstyled,
//           styles: local.styles,
//           size: local.size,
//           style: local.style,
//           inputContainer: local.inputContainer,
//           inputWrapperOrder: local.inputWrapperOrder,
//           withAsterisk: local.withAsterisk,
//           variant: local.variant,
//           id: local.id,
//           mod: local.mod,
//           attributes: local.attributes,
//           ...local.wrapperProps,
//           ...styleProps,
//         };
//       }
//       return target[prop as keyof typeof target];
//     }
//   });

//   return result;
// }

import { mergeProps, splitProps } from 'solid-js';
import { BoxProps, extractStyleProps, StylesApiProps, useEmpoleonTheme, useProps } from '../../core';
import { __BaseInputProps } from './Input';

interface BaseProps
  extends __BaseInputProps,
    BoxProps,
    StylesApiProps<{ props: any; stylesNames: string }> {
  __staticSelector?: string;
  __stylesApiProps?: Record<string, any>;
  id?: string;
}

export function useInputProps<T extends Record<string, any>, U extends Partial<T> | null = {}>(
  component: string,
  defaultProps: U,
  props: T
) {
  const theme = useEmpoleonTheme();
  const contextPropsPayload = theme.components[component]?.defaultProps;
  const contextProps =
    typeof contextPropsPayload === 'function' ? contextPropsPayload(theme) : contextPropsPayload;

  const merged = mergeProps(defaultProps || {}, contextProps || {}, props);

  const [local, others] = splitProps(merged, [
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
    'ref'
  ]);

  const { styleProps, rest } = extractStyleProps(others);

  const baseResult = mergeProps(rest, {
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    inputProps: mergeProps({}, local, {
      __stylesApiProps: local.__stylesApiProps || merged,
    }),
  });

  const result = new Proxy(baseResult, {
    get(target, prop) {
      if (prop === 'wrapperProps') {
        return {
          label: local.label,
          description: local.description,
          error: local.error,
          required: local.required,
          classNames: local.classNames,
          className: local.className,
          __staticSelector: local.__staticSelector,
          __stylesApiProps: local.__stylesApiProps || merged,
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
          ...local.wrapperProps,
          ...styleProps,
        };
      }
      return target[prop as keyof typeof target];
    }
  });

  return result;
}

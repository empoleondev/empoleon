import { splitProps, JSX, createEffect } from 'solid-js';
import {
  BoxProps,
  DataAttributes,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
} from '../../core';
import { __BaseInputProps, __InputStylesNames, Input, InputVariant, useInputProps } from '../Input';

export interface InputBaseProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<InputBaseFactory> {
  __staticSelector?: string;
  __stylesApiProps?: Record<string, any>;

  /** Props passed down to the root element (`Input.Wrapper` component) */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Determines whether the input can have multiple lines, for example when `component="textarea"`, `false` by default */
  multiline?: boolean;

  /** Determines whether `aria-` and other accessibility attributes should be added to the input, `true` by default */
  withAria?: boolean;

  /** Event handler for the focus capture phase */
  onFocusCapture?: (event: FocusEvent) => void;

  /** Event handler for the blur capture phase */
  onBlurCapture?: (event: FocusEvent) => void;
}

export type InputBaseFactory = PolymorphicFactory<{
  props: InputBaseProps;
  defaultRef: HTMLInputElement;
  defaultComponent: 'input';
  stylesNames: __InputStylesNames;
  variant: InputVariant;
}>;

const defaultProps: Partial<InputBaseProps> = {
  __staticSelector: 'InputBase',
  withAria: true,
};

export const InputBase = polymorphicFactory<InputBaseFactory>(_props => {
  const props = useInputProps('InputBase', defaultProps, _props);

  const [local, others] = splitProps(props, [
    'inputProps',
    'wrapperProps',
    'ref'
  ]);

  return (
    <Input.Wrapper {...local.wrapperProps}>
      <Input {...local.inputProps} {...others} ref={local.ref} />
    </Input.Wrapper>
  );
});

InputBase.classes = { ...Input.classes, ...Input.Wrapper.classes };
InputBase.displayName = '@empoleon/core/InputBase';

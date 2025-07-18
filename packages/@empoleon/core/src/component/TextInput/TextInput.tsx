import { splitProps } from 'solid-js';
import { BoxProps, ElementProps, factory, Factory, StylesApiProps, useProps } from '../../core';
import { __BaseInputProps, __InputStylesNames, InputVariant } from '../Input';
import { InputBase } from '../InputBase';

export interface TextInputProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<TextInputFactory>,
    ElementProps<'input', 'size'> {}

export type TextInputFactory = Factory<{
  props: TextInputProps;
  variant: InputVariant;
  ref: HTMLInputElement;
  stylesNames: __InputStylesNames;
}>;

const defaultProps: Partial<TextInputProps> = {};

export const TextInput = factory<TextInputFactory>(_props => {
  const props = useProps('TextInput', defaultProps, _props);
  const [local, others] = splitProps(props, ['ref']);

  return <InputBase component="input" ref={local.ref} {...others} __staticSelector="TextInput" />;
});

TextInput.classes = InputBase.classes;
TextInput.displayName = '@empoleon/core/TextInput';

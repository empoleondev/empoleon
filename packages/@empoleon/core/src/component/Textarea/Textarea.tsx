import { JSX, splitProps } from 'solid-js';
// @ts-ignore
import TextareaAutosize from 'solid-textarea-autosize';
import {
  BoxProps,
  ElementProps,
  factory,
  Factory,
  getEnv,
  StylesApiProps,
  useProps,
} from '../../core';
import { __BaseInputProps, __InputStylesNames } from '../Input';
import { InputBase } from '../InputBase';

export interface TextareaProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<TextareaFactory>,
    ElementProps<'textarea', 'size'> {
  __staticSelector?: string;

  /** Determines whether the textarea height should grow with its content, `false` by default */
  autosize?: boolean;

  /** Maximum rows for autosize textarea to grow, ignored if `autosize` prop is not set */
  maxRows?: number;

  /** Minimum rows of autosize textarea, ignored if `autosize` prop is not set */
  minRows?: number;

  /** Controls `resize` CSS property, `'none'` by default */
  resize?: JSX.CSSProperties['resize'];
}

export type TextareaFactory = Factory<{
  props: TextareaProps;
  ref: HTMLTextAreaElement;
  stylesNames: __InputStylesNames;
}>;

export const Textarea = factory<TextareaFactory>((_props) => {
  const props = useProps('Textarea', null, _props);
  const [local, others] = splitProps(props, [
    'autosize',
    'maxRows',
    'minRows',
    '__staticSelector',
    'resize',
    'ref',
  ]);

  const shouldAutosize = () => local.autosize && getEnv() !== 'test';
  const autosizeProps = shouldAutosize() ? { maxRows: local.maxRows, minRows: local.minRows } : {};

  return (
    <InputBase<any>
      component={shouldAutosize() ? TextareaAutosize : 'textarea'}
      ref={local.ref}
      {...others}
      __staticSelector={local.__staticSelector || 'Textarea'}
      multiline
      data-no-overflow={(local.autosize && local.maxRows === undefined) || undefined}
      __vars={{ '--input-resize': local.resize }}
      {...autosizeProps}
    />
  );
});

Textarea.classes = InputBase.classes;
Textarea.displayName = '@empoleon/core/Textarea';

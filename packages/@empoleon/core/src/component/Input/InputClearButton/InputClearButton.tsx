import { splitProps } from 'solid-js';
import {
  BoxProps,
  ElementProps,
  EmpoleonSize,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '../../../core';
import { CloseButton, CloseButtonStylesNames } from '../../CloseButton';
import { useInputContext } from '../Input.context';

export interface InputClearButtonProps
  extends BoxProps,
    StylesApiProps<InputClearButtonFactory>,
    ElementProps<'button'> {
  /** Size of the button, by default value is based on input context */
  size?: EmpoleonSize | (string & {});
}

export type InputClearButtonFactory = Factory<{
  props: InputClearButtonProps;
  ref: HTMLButtonElement;
  stylesNames: CloseButtonStylesNames;
}>;

export const InputClearButton = factory<InputClearButtonFactory>((_props) => {
  const props = useProps('InputClearButton', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'variant',
    'vars',
    'size',
    'ref',
  ]);

  const ctx = useInputContext();

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<InputClearButtonFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  return (
    <CloseButton
      variant={local.variant || 'transparent'}
      ref={local.ref}
      size={local.size || ctx?.size || 'sm'}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      __staticSelector="InputClearButton"
      {...others}
    />
  );
});

InputClearButton.displayName = '@empoleon/core/InputClearButton';

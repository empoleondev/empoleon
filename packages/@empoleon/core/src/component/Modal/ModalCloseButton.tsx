import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseCloseButton, ModalBaseCloseButtonProps } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalCloseButtonStylesNames = 'close';

export interface ModalCloseButtonProps
  extends ModalBaseCloseButtonProps,
    CompoundStylesApiProps<ModalCloseButtonFactory> {}

export type ModalCloseButtonFactory = Factory<{
  props: ModalCloseButtonProps;
  ref: HTMLButtonElement;
  stylesNames: ModalCloseButtonStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalCloseButtonProps> = {};

export const ModalCloseButton = factory<ModalCloseButtonFactory>((_props) => {
  const props = useProps('ModalCloseButton', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref',
  ]);

  const ctx = useModalContext();

  return (
    <ModalBaseCloseButton
      ref={local.ref}
      {...ctx.getStyles('close', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

ModalCloseButton.classes = classes;
ModalCloseButton.displayName = '@empoleon/core/ModalCloseButton';

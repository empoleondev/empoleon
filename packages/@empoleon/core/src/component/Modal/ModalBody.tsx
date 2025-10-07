import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseBody, ModalBaseBodyProps } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalBodyStylesNames = 'body';

export interface ModalBodyProps
  extends ModalBaseBodyProps,
    CompoundStylesApiProps<ModalBodyFactory> {}

export type ModalBodyFactory = Factory<{
  props: ModalBodyProps;
  ref: HTMLDivElement;
  stylesNames: ModalBodyStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalBodyProps> = {};

export const ModalBody = factory<ModalBodyFactory>((_props) => {
  const props = useProps('ModalBody', defaultProps, _props);
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
    <ModalBaseBody
      ref={local.ref}
      {...ctx.getStyles('body', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

ModalBody.classes = classes;
ModalBody.displayName = '@empoleon/core/ModalBody';

import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseHeader, ModalBaseHeaderProps } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalHeaderStylesNames = 'header';

export interface ModalHeaderProps
  extends ModalBaseHeaderProps,
    CompoundStylesApiProps<ModalHeaderFactory> {}

export type ModalHeaderFactory = Factory<{
  props: ModalHeaderProps;
  ref: HTMLElement;
  stylesNames: ModalHeaderStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalHeaderProps> = {};

export const ModalHeader = factory<ModalHeaderFactory>((_props) => {
  const props = useProps('ModalHeader', defaultProps, _props);
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
    <ModalBaseHeader
      ref={local.ref}
      {...ctx.getStyles('header', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

ModalHeader.classes = classes;
ModalHeader.displayName = '@empoleon/core/ModalHeader';

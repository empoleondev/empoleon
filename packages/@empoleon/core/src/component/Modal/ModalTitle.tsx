import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseTitle, ModalBaseTitleProps } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalTitleStylesNames = 'title';

export interface ModalTitleProps
  extends ModalBaseTitleProps,
    CompoundStylesApiProps<ModalTitleFactory> {}

export type ModalTitleFactory = Factory<{
  props: ModalTitleProps;
  ref: HTMLHeadingElement;
  stylesNames: ModalTitleStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalTitleProps> = {};

export const ModalTitle = factory<ModalTitleFactory>((_props) => {
  const props = useProps('ModalTitle', defaultProps, _props);
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
    <ModalBaseTitle
      ref={local.ref}
      {...ctx.getStyles('title', {
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
        className: local.className,
      })}
      {...others}
    />
  );
});

ModalTitle.classes = classes;
ModalTitle.displayName = '@empoleon/core/ModalTitle';

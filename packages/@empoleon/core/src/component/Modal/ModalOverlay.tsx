import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, useProps } from '../../core';
import { ModalBaseOverlay, ModalBaseOverlayProps } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalOverlayStylesNames = 'overlay';

// @ts-ignore
export interface ModalOverlayProps
  extends ModalBaseOverlayProps,
    CompoundStylesApiProps<ModalOverlayFactory> {}

export type ModalOverlayFactory = Factory<{
  props: ModalOverlayProps;
  ref: HTMLDivElement;
  stylesNames: ModalOverlayStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalOverlayProps> = {};

export const ModalOverlay = factory<ModalOverlayFactory>(_props => {
  const props = useProps('ModalOverlay', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref'
  ]);

  const ctx = useModalContext();

  return (
    <ModalBaseOverlay
      ref={local.ref}
      {...ctx.getStyles('overlay', { classNames: local.classNames, style: local.style, styles: local.styles, className: local.className })}
      {...others}
    />
  );
});

ModalOverlay.classes = classes;
ModalOverlay.displayName = '@empoleon/core/ModalOverlay';

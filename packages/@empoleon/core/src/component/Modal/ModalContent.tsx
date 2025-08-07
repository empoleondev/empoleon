import { splitProps } from 'solid-js';
import { CompoundStylesApiProps, factory, Factory, rem, useProps } from '../../core';
import { ModalBaseContent, ModalBaseContentProps, NativeScrollArea } from '../ModalBase';
import { useModalContext } from './Modal.context';
import classes from './Modal.module.css';

export type ModalContentStylesNames = 'content' | 'inner';

export interface ModalContentProps
  extends ModalBaseContentProps,
    CompoundStylesApiProps<ModalContentFactory> {
  __hidden?: boolean;
}

export type ModalContentFactory = Factory<{
  props: ModalContentProps;
  ref: HTMLDivElement;
  stylesNames: ModalContentStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ModalContentProps> = {};

export const ModalContent = factory<ModalContentFactory>(_props => {
  const props = useProps('ModalContent', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'children',
    '__hidden',
    'ref'
  ]);

  const ctx = useModalContext();
  const Scroll = ctx.scrollAreaComponent || NativeScrollArea;

  // console.log('hi', ctx.getStyles('inner', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames }));

  return (
    <ModalBaseContent
      {...ctx.getStyles('content', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      innerProps={ctx.getStyles('inner', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      data-full-screen={ctx.fullScreen || undefined}
      data-modal-content
      data-hidden={local.__hidden || undefined}
      ref={local.ref}
      {...others}
    >
      <div style={{
        'max-height': ctx.fullScreen ? '100dvh' : `calc(100dvh - (${rem(ctx.yOffset)} * 2))`,
      }}>
        <Scroll>
          {local.children}
        </Scroll>
      </div>
    </ModalBaseContent>
  );
});

ModalContent.classes = classes;
ModalContent.displayName = '@empoleon/core/ModalContent';

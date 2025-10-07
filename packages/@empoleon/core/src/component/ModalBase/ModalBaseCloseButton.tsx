import cx from 'clsx';
import { splitProps } from 'solid-js';
import { BoxProps, ElementProps } from '../../core';
import { __CloseButtonProps, CloseButton } from '../CloseButton';
import { useModalBaseContext } from './ModalBase.context';
import classes from './ModalBase.module.css';

export interface ModalBaseCloseButtonProps
  extends __CloseButtonProps,
    BoxProps,
    ElementProps<'button'> {}

export function ModalBaseCloseButton(props: ModalBaseCloseButtonProps) {
  const [local, others] = splitProps(props, ['className', 'onClick', 'ref']);

  const ctx = useModalBaseContext();
  return (
    <CloseButton
      ref={local.ref}
      {...others}
      onClick={(event) => {
        ctx.onClose();
        typeof local.onClick === 'function' && local.onClick?.(event);
      }}
      className={cx({ [classes.close]: !ctx.unstyled }, local.className)}
      unstyled={ctx.unstyled}
    />
  );
}

ModalBaseCloseButton.displayName = '@empoleon/core/ModalBaseCloseButton';

import cx from 'clsx';
import { Box, BoxProps, ElementProps } from '../../core';
import { useModalBaseContext } from './ModalBase.context';
import { useModalTitle } from './use-modal-title-id';
import classes from './ModalBase.module.css';
import { splitProps } from 'solid-js';

export interface ModalBaseTitleProps extends BoxProps, ElementProps<'h2'> {}

export function ModalBaseTitle(props: ModalBaseTitleProps) {
  const [local, others] = splitProps(props, [
    'className',
    'ref'
  ]);

  const id = useModalTitle();
    const ctx = useModalBaseContext();
    return (
      <Box
        component="h2"
        ref={local.ref}
        className={cx({ [classes.title]: !ctx.unstyled }, local.className)}
        {...others}
        id={id}
      />
    );
}

ModalBaseTitle.displayName = '@empoleon/core/ModalBaseTitle';

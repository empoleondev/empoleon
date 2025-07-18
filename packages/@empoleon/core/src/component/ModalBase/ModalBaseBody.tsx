import cx from 'clsx';
import { Box, BoxProps, ElementProps } from '../../core';
import { useModalBaseContext } from './ModalBase.context';
import { useModalBodyId } from './use-modal-body-id';
import classes from './ModalBase.module.css';
import { splitProps } from 'solid-js';

export interface ModalBaseBodyProps extends BoxProps, ElementProps<'div'> {}

export function ModalBaseBody(props: ModalBaseBodyProps) {
  const [local, others] = splitProps(props, [
    'className',
    'ref'
  ]);

  const bodyId = useModalBodyId();
    const ctx = useModalBaseContext();
    return (
      <Box
        ref={local.ref}
        {...others}
        id={bodyId}
        className={cx({ [classes.body]: !ctx.unstyled }, local.className)}
      />
    );
}

ModalBaseBody.displayName = '@empoleon/core/ModalBaseBody';

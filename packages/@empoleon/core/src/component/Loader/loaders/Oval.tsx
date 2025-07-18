import cx from 'clsx';
import { Box } from '../../../core';
import { EmpoleonLoaderComponent } from '../Loader.types';
import classes from '../Loader.module.css';
import { splitProps } from 'solid-js';

export const Oval: EmpoleonLoaderComponent = (props: any) => {
  const [local, others] = splitProps(props, ['className', 'ref']);

  return (
    <Box
      component="span"
      className={cx(classes.ovalLoader, local.className)}
      ref={local.ref}
      {...others}
    />
  );
};

Oval.displayName = '@empoleon/core/Oval';

import cx from 'clsx';
import { splitProps } from 'solid-js';
import { Box } from '../../../core';
import { EmpoleonLoaderComponent } from '../Loader.types';
import classes from '../Loader.module.css';

export const Bars: EmpoleonLoaderComponent = (props: any) => {
  const [local, others] = splitProps(props, ['className', 'ref']);

  return (
    <Box
      component="span"
      className={cx(classes.barsLoader, local.className)}
      ref={local.ref}
      {...others}
    >
      <span class={classes.bar} />
      <span class={classes.bar} />
      <span class={classes.bar} />
    </Box>
  );
};

Bars.displayName = '@empoleon/core/Bars';

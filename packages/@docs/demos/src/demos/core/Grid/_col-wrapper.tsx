import { Grid, GridColProps } from '@empoleon/core';
import classes from './_col-wrapper.module.css';

export function ColWrapper({ children, ...others }: GridColProps) {
  return (
    <Grid.Col {...others}>
      <div class={classes.col}>
        <div class={classes.label}>{children}</div>
      </div>
    </Grid.Col>
  );
}

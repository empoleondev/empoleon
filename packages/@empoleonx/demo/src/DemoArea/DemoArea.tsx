import { Box, rem } from '@empoleon/core';
import classes from './DemoArea.module.css';
import { JSX, mergeProps } from 'solid-js';

export interface DemoAreaProps {
  children?: JSX.Element;
  withPadding?: boolean;
  centered?: boolean;
  maxWidth?: number | string;
  minHeight?: number | string;
  dimmed?: boolean;
  striped?: boolean;
  overflow?: 'hidden' | 'auto';
}

export function DemoArea(props: DemoAreaProps) {
  const mergedProps = mergeProps({
    ...props,
    withPadding: true
  })

  return (
    <Box
      className={classes.demo}
      style={{ overflow: mergedProps.overflow }}
      mod={{ 'with-padding': mergedProps.withPadding, centered: mergedProps.centered, dimmed: mergedProps.dimmed, striped: mergedProps.striped }}
      __vars={{
        '--demo-flex': mergedProps.maxWidth ? '1' : undefined,
        '--demo-max-width': mergedProps.maxWidth ? rem(mergedProps.maxWidth) : undefined,
        '--demo-min-height': mergedProps.minHeight ? rem(mergedProps.minHeight) : undefined,
        '--demo-margin-y': mergedProps.maxWidth && mergedProps.centered ? 'auto' : undefined,
      }}
    >
      <div class={classes.demoInner}>{mergedProps.children}</div>
    </Box>
  );
}

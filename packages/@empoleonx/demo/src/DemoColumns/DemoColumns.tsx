import { JSX } from 'solid-js';
import { SimpleGrid, Text } from '@empoleon/core';
import { DemoArea, DemoAreaProps } from '../DemoArea';
import classes from './DemoColumns.module.css';

export interface DemoColumnsProps extends DemoAreaProps {
  title?: JSX.Element;
  description?: JSX.Element;
  withGrid?: boolean;
  controls: JSX.Element;
}

export function DemoColumns(props: DemoColumnsProps) {
  return (
    <div class={classes.root}>
      <div class={classes.columns}>
        <DemoArea
          withPadding={props.withPadding}
          maxWidth={props.maxWidth}
          minHeight={props.minHeight}
          centered={props.centered}
          dimmed={props.dimmed}
          striped={props.striped}
          overflow={props.overflow}
        >
          {props.children}
        </DemoArea>

        <div class={classes.controls}>
          {props.title && (
            <div class={classes.header}>
              <Text fw={500} fz="sm" mb={5}>
                {props.title}
              </Text>
              {props.description && (
                <Text c="dimmed" fz={11} lh={1.45}>
                  {props.description}
                </Text>
              )}
            </div>
          )}

          {props.withGrid ? (
            <SimpleGrid type="container" cols={{ base: 1, '480px': 2, '780px': 4 }} p={8}>
              {props.controls}
            </SimpleGrid>
          ) : (
            props.controls
          )}
        </div>
      </div>
    </div>
  );
}

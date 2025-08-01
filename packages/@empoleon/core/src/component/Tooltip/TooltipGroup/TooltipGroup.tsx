import { JSX } from 'solid-js';
import { FloatingDelayGroup } from '@empoleon/solid-floating-ui';
import { ExtendComponent, Factory, EmpoleonThemeComponent, useProps } from '../../../core';
import { TooltipGroupProvider } from './TooltipGroup.context';

export interface TooltipGroupProps {
  /** <Tooltip /> components */
  children: JSX.Element;

  /** Open delay in ms */
  openDelay?: number;

  /** Close delay in ms */
  closeDelay?: number;
}

const defaultProps: Partial<TooltipGroupProps> = {
  openDelay: 0,
  closeDelay: 0,
};

export function TooltipGroup(props: TooltipGroupProps) {
  const { openDelay, closeDelay, children } = useProps('TooltipGroup', defaultProps, props);

  return (
    <TooltipGroupProvider value>
      <FloatingDelayGroup delay={{ open: openDelay, close: closeDelay }}>
        {children}
      </FloatingDelayGroup>
    </TooltipGroupProvider>
  );
}

export type TooltipGroupFactory = Factory<{
  props: TooltipGroupProps;
}>;

TooltipGroup.displayName = '@empoleon/core/TooltipGroup';
TooltipGroup.extend = (c: ExtendComponent<TooltipGroupFactory>): EmpoleonThemeComponent => c;

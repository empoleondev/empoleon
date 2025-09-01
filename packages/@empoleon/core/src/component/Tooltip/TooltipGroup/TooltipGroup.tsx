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

const defaultProps = {
  openDelay: 0,
  closeDelay: 0,
} satisfies Partial<TooltipGroupProps>;

export function TooltipGroup(_props: TooltipGroupProps) {
  const props = useProps('TooltipGroup', defaultProps, _props);

  return (
    <TooltipGroupProvider value>
      <FloatingDelayGroup delay={{ open: props.openDelay, close: props.closeDelay }}>
        {props.children}
      </FloatingDelayGroup>
    </TooltipGroupProvider>
  );
}

export type TooltipGroupFactory = Factory<{
  props: TooltipGroupProps;
}>;

TooltipGroup.displayName = '@empoleon/core/TooltipGroup';
TooltipGroup.extend = (c: ExtendComponent<TooltipGroupFactory>): EmpoleonThemeComponent => c;

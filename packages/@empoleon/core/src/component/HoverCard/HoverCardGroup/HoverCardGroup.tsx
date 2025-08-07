import { FloatingDelayGroup } from '@empoleon/solid-floating-ui';
import { ExtendComponent, Factory, EmpoleonThemeComponent, useProps } from '../../../core';
import { HoverCardGroupProvider } from './HoverCardGroup.context';
import { JSX } from 'solid-js';

export interface HoverCardGroupProps {
  /** `HoverCard` components */
  children: JSX.Element;

  /** Open delay in ms */
  openDelay?: number;

  /** Close delay in ms */
  closeDelay?: number;
}

const defaultProps = {
  openDelay: 0,
  closeDelay: 0,
} satisfies Partial<HoverCardGroupProps>;

export function HoverCardGroup(_props: HoverCardGroupProps) {
  const props = useProps('HoverCardGroup', defaultProps, _props);

  return (
    <HoverCardGroupProvider value>
      <FloatingDelayGroup delay={{ open: props.openDelay, close: props.closeDelay }}>
        {props.children}
      </FloatingDelayGroup>
    </HoverCardGroupProvider>
  );
}

export type HoverCardGroupFactory = Factory<{
  props: HoverCardGroupProps;
}>;

HoverCardGroup.displayName = '@mantine/core/HoverCardGroup';
HoverCardGroup.extend = (c: ExtendComponent<HoverCardGroupFactory>): EmpoleonThemeComponent => c;

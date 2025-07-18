import { JSX } from 'solid-js';
import { Button } from '../Button';
import { Switch } from '../Switch';
import { Tooltip } from '../Tooltip';
import { HoverCard } from './HoverCard';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'HoverCard',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <HoverCard>
        <HoverCard.Target>
          <Button>Hover to reveal</Button>
        </HoverCard.Target>

        <HoverCard.Dropdown>Hello</HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <HoverCard unstyled>
        <HoverCard.Target>
          <Button>Hover to reveal</Button>
        </HoverCard.Target>

        <HoverCard.Dropdown>Hello</HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
}

export function TargetWithTooltip() {
  return (
    <div style={{ 'padding': '40px' }}>
      <HoverCard>
        <Tooltip label="Tooltip first">
          {(props) => (
            <HoverCard.Target>
              <Button {...props}>Tooltip first</Button>
            </HoverCard.Target>
          )}
        </Tooltip>

        <HoverCard.Dropdown>Dropdown</HoverCard.Dropdown>
      </HoverCard>

      <HoverCard>
        <HoverCard.Target>
          <Tooltip label="Tooltip last">
            {(props) => <Button ml="xl" {...props}>Tooltip last</Button>}
          </Tooltip>
        </HoverCard.Target>

        <HoverCard.Dropdown>Dropdown</HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
}

export function WithSwitch() {
  return (
    <div style={{ 'padding': '40px' }}>
      <HoverCard width='280px' shadow="md" closeDelay={5000}>
        <HoverCard.Target refProp="rootRef" eventPropsWrapperName="wrapperProps">
          <Switch label="Switch label" />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <p>
            Hover card is revealed when user hovers over target element, it will be hidden once
            mouse is not over both target and dropdown elements
          </p>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  );
}

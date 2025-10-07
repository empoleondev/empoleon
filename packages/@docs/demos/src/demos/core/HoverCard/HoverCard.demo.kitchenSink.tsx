import { createEffect, createSignal } from 'solid-js';
import { Button, HoverCard, HoverCardProps, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { HoverCard, Button, Text } from '@empoleon/core';

function Demo() {
  return (
    <HoverCard{{props}}>
      <HoverCard.Target>
        <Button>Hover to reveal the card</Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">
          Hover card is revealed when user hovers over target element
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
`;

function Demo(props: HoverCardProps) {
  const [width, setWidth] = createSignal(props.width || 280);
  const [openDelay, setOpenDelay] = createSignal(props.openDelay || 0);
  const [closeDelay, setCloseDelay] = createSignal(props.closeDelay || 0);

  createEffect(() => {
    setWidth(props.width || 280);
    setOpenDelay(props.openDelay || 0);
    setCloseDelay(props.closeDelay || 0);
  });

  return (
    <HoverCard
      width={width()}
      shadow={props.shadow}
      position={props.position}
      offset={props.offset}
      arrowOffset={props.arrowOffset}
      arrowPosition={props.arrowPosition}
      arrowRadius={props.arrowRadius}
      arrowSize={props.arrowSize}
      withArrow={props.withArrow}
      openDelay={openDelay()}
      closeDelay={closeDelay()}
      closeOnEscape={props.closeOnEscape}
      withinPortal={props.withinPortal}
      disabled={props.disabled}
      keepMounted={props.keepMounted}
      zIndex={props.zIndex}
    >
      <HoverCard.Target>
        <Button>Hover to reveal the card</Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">
          Hover card is revealed when user hovers over target element, it will be hidden once mouse
          is not over both target and dropdown elements
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'width',
      type: 'number',
      initialValue: 280,
      libraryValue: 'max-content',
      min: 100,
      max: 600,
      step: 10,
    },
    {
      prop: 'shadow',
      type: 'size',
      initialValue: 'md',
      libraryValue: undefined,
    },
    {
      prop: 'position',
      type: 'select',
      initialValue: 'bottom',
      libraryValue: 'bottom',
      data: [
        { label: 'Top', value: 'top' },
        { label: 'Top Start', value: 'top-start' },
        { label: 'Top End', value: 'top-end' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Bottom Start', value: 'bottom-start' },
        { label: 'Bottom End', value: 'bottom-end' },
        { label: 'Left', value: 'left' },
        { label: 'Left Start', value: 'left-start' },
        { label: 'Left End', value: 'left-end' },
        { label: 'Right', value: 'right' },
        { label: 'Right Start', value: 'right-start' },
        { label: 'Right End', value: 'right-end' },
      ],
    },
    {
      prop: 'offset',
      type: 'number',
      initialValue: 8,
      libraryValue: 8,
      min: 0,
      max: 40,
      step: 2,
    },
    {
      prop: 'arrowOffset',
      type: 'number',
      initialValue: 5,
      libraryValue: 5,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      prop: 'arrowPosition',
      type: 'select',
      initialValue: 'center',
      libraryValue: 'center',
      data: [
        { label: 'Center', value: 'center' },
        { label: 'Side', value: 'side' },
      ],
    },
    {
      prop: 'arrowRadius',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      prop: 'arrowSize',
      type: 'number',
      initialValue: 7,
      libraryValue: 7,
      min: 2,
      max: 20,
      step: 1,
    },
    {
      prop: 'withArrow',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'openDelay',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 2000,
      step: 100,
    },
    {
      prop: 'closeDelay',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 2000,
      step: 100,
    },
    {
      prop: 'closeOnEscape',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withinPortal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'keepMounted',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'zIndex',
      type: 'number',
      initialValue: 300,
      libraryValue: 300,
      min: 100,
      max: 1000,
      step: 50,
    },
  ],
};

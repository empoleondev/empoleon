import { Button, Popover, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Popover, Button, Text } from '@empoleon/core';

function Demo() {
  return (
    <Popover width={200} opened position="bottom-start" withArrow{{props}}>
      <Popover.Target>
        <Button>Target element</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Arrow position can be changed for *-start and *-end positions</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Popover {...props}>
      <Popover.Target>
        <Button>Target element</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Arrow position can be changed for *-start and *-end positions</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
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
      prop: 'width',
      type: 'select',
      initialValue: '200px',
      libraryValue: 'max-content',
      data: [
        { label: 'Max Content', value: 'max-content' },
        { label: 'Target Width', value: 'target' },
        { label: '200px', value: '200px' },
        { label: '300px', value: '300px' },
        { label: '400px', value: '400px' },
      ],
    },
    {
      prop: 'shadow',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'offset',
      type: 'number',
      initialValue: 8,
      libraryValue: 8,
      min: 0,
      max: 50,
      step: 1,
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      type: 'segmented',
      prop: 'arrowPosition',
      initialValue: 'center',
      libraryValue: 'center',
      data: ['center', 'side'],
    },
    {
      prop: 'withArrow',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'number',
      prop: 'arrowOffset',
      initialValue: 10,
      libraryValue: 10,
      min: 5,
      max: 50,
    },

    {
      type: 'number',
      prop: 'arrowSize',
      initialValue: 7,
      libraryValue: 7,
      min: 5,
      max: 12,
    },

    {
      type: 'number',
      prop: 'arrowRadius',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 10,
    },
    {
      prop: 'opened',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'trapFocus',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'closeOnClickOutside',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'closeOnEscape',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withRoles',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'returnFocus',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withinPortal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
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
      min: 0,
      max: 1000,
      step: 10,
    },
    {
      prop: 'floatingStrategy',
      type: 'select',
      initialValue: 'absolute',
      libraryValue: 'absolute',
      data: [
        { label: 'Absolute', value: 'absolute' },
        { label: 'Fixed', value: 'fixed' },
      ],
    },
  ],
};

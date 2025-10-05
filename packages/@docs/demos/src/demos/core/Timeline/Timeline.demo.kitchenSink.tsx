import { Box, TimelineProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { TimelineBase } from './_base';

function Wrapper(props: TimelineProps) {
  return (
    <Box maw={320} mx="auto">
      <TimelineBase noIcon {...props} />
    </Box>
  );
}

const code = `
import { Timeline } from '@empoleon/core';

function Demo() {
  return (
    <Timeline{{props}}>
      {/* items */}
    </Timeline>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'active',
      type: 'number',
      initialValue: 1,
      libraryValue: null,
      min: -1,
      max: 3,
      step: 1,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'xl',
      libraryValue: 'xl',
    },
    {
      prop: 'bulletSize',
      type: 'number',
      initialValue: 25,
      libraryValue: 20,
      min: 18,
      max: 40,
      step: 1,
    },
    {
      prop: 'lineWidth',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      min: 1,
      max: 6,
      step: 1,
    },
    {
      prop: 'align',
      type: 'segmented',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      initialValue: 'left',
      libraryValue: 'left',
    },
    {
      prop: 'reverseActive',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};

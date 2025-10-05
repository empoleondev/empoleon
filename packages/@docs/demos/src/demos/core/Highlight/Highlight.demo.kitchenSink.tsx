import { Highlight, HighlightProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Highlight } from '@empoleon/core';

function Demo() {
  return (
    <Highlight{{props}}>
      {{children}}
    </Highlight>
  );
}
`;

function Demo(props: HighlightProps) {
  return (
    <Highlight
      maw={600}
      mx="auto"
      {...props}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    {
      prop: 'highlight',
      type: 'string',
      initialValue: 'this',
      libraryValue: null,
    },
    {
      prop: 'children',
      type: 'string',
      initialValue: 'Highlight This, definitely THIS and also this!',
      libraryValue: null,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'yellow',
      libraryValue: 'yellow',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'span',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'truncate',
      type: 'select',
      initialValue: 'false',
      libraryValue: false,
      data: [
        { label: 'False', value: 'false' },
        { label: 'True', value: 'true' },
        { label: 'Start', value: 'start' },
        { label: 'End', value: 'end' },
      ],
    },
    {
      prop: 'lineClamp',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      prop: 'inherit',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'inline',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};

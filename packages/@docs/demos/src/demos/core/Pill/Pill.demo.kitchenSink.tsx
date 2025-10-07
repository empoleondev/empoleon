import { Pill, PillProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Pill } from '@empoleon/core';
import { IconCheck } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Pill{{props}}>
      React
    </Pill>
  );
}
`;

function Demo(props: PillProps) {
  return <Pill {...props}>React</Pill>;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'withRemoveButton',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
  ],
};

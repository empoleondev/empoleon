import { Checkbox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Checkbox } from '@empoleon/core';

function Demo() {
  return (
    <Checkbox.Indicator
      {{props}}
    />
  );
}
`;

interface CheckboxIndicatorProps {
  checked?: boolean;
  indeterminate?: boolean;
  color?: string;
  size?: string;
  radius?: string;
  disabled?: boolean;
  autoContrast?: boolean;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: (props: CheckboxIndicatorProps) => <Checkbox.Indicator {...props} />,
  code,
  centered: true,
  controls: [
    {
      prop: 'checked',
      type: 'boolean',
      initialValue: true,
      libraryValue: false,
    },
    {
      prop: 'indeterminate',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'disabled',
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

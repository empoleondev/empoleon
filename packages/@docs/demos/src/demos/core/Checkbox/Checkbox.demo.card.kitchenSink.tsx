import { Checkbox, Group, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Checkbox, Group, Text } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <Checkbox.Card
        {{props}}
        value="react"
      >
        <Group wrap="nowrap" align="flex-start">
          <Checkbox.Indicator />
          <div>
            <Text fw={500}>React</Text>
            <Text fz="sm" c="dimmed">
              A JavaScript library for building user interfaces
            </Text>
          </div>
        </Group>
      </Checkbox.Card>
    </Group>
  );
}
`;

interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  withBorder?: boolean;
  radius?: string;
  padding?: string;
}

function Demo(props: CheckboxCardProps) {
  const [checked, setChecked] = createSignal(props.checked || props.defaultChecked || false);

  createEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  });

  return (
    <Group>
      <Checkbox.Card
        {...props}
        checked={checked()}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        value="react"
      >
        <Group wrap="nowrap" align="flex-start">
          <Checkbox.Indicator />
          <div>
            <Text fw={500}>React</Text>
            <Text fz="sm" c="dimmed">
              A JavaScript library for building user interfaces
            </Text>
          </div>
        </Group>
      </Checkbox.Card>
    </Group>
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
      prop: 'checked',
      type: 'boolean',
      initialValue: true,
      libraryValue: false
    },
    {
      prop: 'withBorder',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
  ],
};

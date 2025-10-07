import { Show } from 'solid-js';
import { Divider, DividerProps, Flex, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Divider, Text, Flex } from '@empoleon/core';
import { Show } from 'solid-js';

function Demo() {
  return (
    <>
      <Show when={props.orientation === 'horizontal'}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
          perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
          aliquid commodi atque sunt officiis natus?
        </Text>

        <Divider{{props}} />

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus ea,
          perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed pariatur
          aliquid commodi atque sunt officiis natus?
        </Text>
      </Show>

      <Show when={props.orientation === 'vertical'}>
        <Flex align="center">
          <Text style={{ flex: 1 }}>
            Lorem ipsum dolor sit amet,
          </Text>
          <Divider{{props}} />
          <Text style={{ flex: 1 }}>
            consectetur adipisicing elit.
          </Text>
        </Flex>
      </Show>
    </>
  );
}
`;

function Demo(props: DividerProps) {
  return (
    <>
      <Show when={props.orientation === 'horizontal'}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus
          ea, perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed
          pariatur aliquid commodi atque sunt officiis natus?
        </Text>

        <Divider {...props} />

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, officiis! Fugit minus
          ea, perferendis eum consectetur quae vitae. Aliquid, quam reprehenderit? Maiores sed
          pariatur aliquid commodi atque sunt officiis natus?
        </Text>
      </Show>

      <Show when={props.orientation === 'vertical'}>
        <Flex align="center">
          <Text style={{ flex: 1 }}>Lorem ipsum dolor sit amet,</Text>
          <Divider {...props} />
          <Text style={{ flex: 1 }}>consectetur adipisicing elit.</Text>
        </Flex>
      </Show>
    </>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 500,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'solid',
      libraryValue: 'solid',
      data: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'gray',
      libraryValue: undefined,
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs',
    },
    {
      prop: 'orientation',
      type: 'select',
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      prop: 'label',
      type: 'string',
      initialValue: '',
      libraryValue: undefined,
    },
    {
      prop: 'labelPosition',
      type: 'select',
      initialValue: 'center',
      libraryValue: 'center',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
};

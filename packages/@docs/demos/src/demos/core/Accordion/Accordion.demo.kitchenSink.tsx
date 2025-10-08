import { IconChevronDown, IconPlus } from '@tabler/icons-solidjs';
import { createEffect, createSignal, For } from 'solid-js';
import { Accordion, AccordionProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { data, dataCode } from './_base';

const code = `
import { For } from 'solid-js';
import { Accordion } from '@empoleon/core';
import { data } from './data';

function Demo() {
  return (
    <Accordion{{props}} defaultValue="Apples">
      <For each={data}>
        {(item) => (
          <Accordion.Item value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
          </Accordion.Item>
        )}
      </For>
    </Accordion>
  );
}
`;

function Demo(props: AccordionProps & { chevron?: string }) {
  const [value, setValue] = createSignal(props.multiple ? ['Apples'] : 'Apples');

  createEffect(() => {
    setValue(props.multiple ? ['Apples'] : 'Apples');
  });

  const getChevron = () => {
    if (props.chevron === 'plus-minus') {
      return () => <IconPlus size={props.chevronIconSize || 16} />;
    }
    if (props.chevron === 'default') {
      return () => <IconChevronDown size={props.chevronIconSize || 16} />;
    }
    if (props.chevron === 'none') { return null };
    return undefined;
  };

  return (
    <Accordion {...props} chevron={getChevron()} value={value()} onChange={setValue} mih={320}>
      <For each={data}>
        {(item) => (
          <Accordion.Item value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
          </Accordion.Item>
        )}
      </For>
    </Accordion>
  );
}

export const kitchensink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Contained', value: 'contained' },
        { label: 'Filled', value: 'filled' },
        { label: 'Separated', value: 'separated' },
        { label: 'Unstyled', value: 'unstyled' },
      ],
    },
    { prop: 'radius', type: 'size', libraryValue: 'sm', initialValue: 'sm' },
    {
      prop: 'chevronPosition',
      type: 'segmented',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    {
      prop: 'chevronIconSize',
      type: 'number',
      initialValue: 16,
      libraryValue: 16,
      min: 12,
      max: 25,
    },
    { prop: 'disableChevronRotation', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'multiple', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'loop', type: 'boolean', initialValue: true, libraryValue: true },
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 1000,
      step: 50,
    },
    {
      prop: 'chevronSize',
      type: 'number',
      initialValue: 16,
      libraryValue: 16,
      min: 16,
      max: 40,
      step: 2,
    },
    {
      prop: 'order',
      type: 'select',
      initialValue: '2',
      libraryValue: '2',
      data: [
        { label: 'h1', value: '1' },
        { label: 'h2', value: '2' },
        { label: 'h3', value: '3' },
        { label: 'h4', value: '4' },
        { label: 'h5', value: '5' },
        { label: 'h6', value: '6' },
      ],
    },
    {
      prop: 'chevron',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Plus/Minus', value: 'plus-minus' },
        { label: 'No Chevron', value: 'none' },
      ],
    },
  ],
};

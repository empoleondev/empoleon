import { Accordion, AccordionProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { AccordionStylesApi } from '@docs/styles-api';
import { data } from './_base';
import { For } from 'solid-js';

const code = `
import { Accordion } from '@empoleon/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion value="Apples" order={2}{{props}}>
      {items}
    </Accordion>
  );
}
`;

function Demo(props: AccordionProps) {
  return (
    <Accordion value="Apples" order={2} {...props}>
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

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: AccordionStylesApi,
  component: Demo,
  centered: true,
  maxWidth: '100%',
  code,
};

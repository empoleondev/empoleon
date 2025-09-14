import { Accordion } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { data, dataCode } from './_base';
import { For } from 'solid-js';

const code = `
import { Accordion } from '@empoleon/core';
import { data } from './data';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item value={item.value}>
      <Accordion.Control icon={item.emoji} disabled={item.value === 'Bananas'}>
        {item.value}
      </Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion maw={400} defaultValue="Apples">
      {items}
    </Accordion>
  );
}
`;

function Demo() {
  return (
    <Accordion defaultValue="Apples" mih={270}>
      <For each={data}>
        {(item) => (
          <Accordion.Item value={item.value}>
            <Accordion.Control icon={item.emoji} disabled={item.value === 'Bananas'}>
              {item.value}
            </Accordion.Control>
            <Accordion.Panel>{item.description}</Accordion.Panel>
          </Accordion.Item>
        )}
      </For>
    </Accordion>
  );
}

export const disabled: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  maxWidth: 600,
};

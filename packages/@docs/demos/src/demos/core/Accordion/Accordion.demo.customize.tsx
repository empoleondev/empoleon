import { Accordion } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { data, dataCode } from './_base';
import classes from './Accordion.demo.customize.module.css';
import { For } from 'solid-js';

const code = `
import { For } from 'solid-js';
import { Accordion } from '@empoleon/core';
import { data } from './data';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Accordion maw={400} defaultValue="Apples" classNames={classes}>
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

const cssCode = `.root {
  border-radius: var(--empoleon-radius-sm);
  background-color: light-dark(var(--empoleon-color-gray-0), var(--empoleon-color-dark-6));
}

.item {
  background-color: light-dark(var(--empoleon-color-gray-0), var(--empoleon-color-dark-6));
  border: 1px solid transparent;
  position: relative;
  z-index: 0;
  transition: transform 150ms ease;

  &[data-active] {
    transform: scale(1.03);
    z-index: 1;
    background-color: var(--empoleon-color-body);
    border-color: light-dark(var(--empoleon-color-gray-2), var(--empoleon-color-dark-4));
    box-shadow: var(--empoleon-shadow-md);
    border-radius: var(--empoleon-radius-md);
  }
}

.chevron {
  &[data-rotate] {
    transform: rotate(-90deg);
  }
}
`;

function Demo() {
  return (
    <Accordion defaultValue="Apples" classNames={classes} variant="filled">
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

export const customize: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'data.ts', code: dataCode, language: 'tsx' },
  ],
  centered: true,
  maxWidth: 500,
};

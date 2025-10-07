import { createSignal } from 'solid-js';
import { Checkbox, Group, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Checkbox.demo.card.module.css';

const cssCode = `.root {
  position: relative;
  padding: var(--empoleon-spacing-md);
  transition: border-color 150ms ease;

  &[data-checked] {
    border-color: var(--empoleon-primary-color-filled);
  }

  @mixin hover {
    @mixin light {
      background-color: var(--empoleon-color-gray-0);
    }

    @mixin dark {
      background-color: var(--empoleon-color-dark-6);
    }
  }
}

.label {
  font-family: var(--empoleon-font-family-monospace);
  font-weight: bold;
  font-size: var(--empoleon-font-size-md);
  line-height: 1.3;
  color: var(--empoleon-color-bright);
}

.description {
  margin-top: 8px;
  color: var(--empoleon-color-dimmed);
  font-size: var(--empoleon-font-size-xs);
}
`;

const code = `
import { useState } from 'react';
import { Checkbox, Group, Text } from '@empoleon/core';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Card
      className={classes.root}
      radius="md"
      checked={checked}
      onClick={() => setChecked((c) => !c)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>@empoleon/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
  );
}
`;

function Demo() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Checkbox.Card
      className={classes.root}
      radius="md"
      checked={checked()}
      onClick={() => setChecked((c) => !c)}
    >
      <Group wrap="nowrap" align="flex-start">
        <Checkbox.Indicator />
        <div>
          <Text className={classes.label}>@empoleon/core</Text>
          <Text className={classes.description}>
            Core components library: inputs, buttons, overlays, etc.
          </Text>
        </div>
      </Group>
    </Checkbox.Card>
  );
}

export const card: EmpoleonDemo = {
  type: 'code',
  centered: true,
  maxWidth: 320,
  component: Demo,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'Demo.module.css', language: 'scss', code: cssCode },
  ],
};

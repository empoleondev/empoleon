import { Group, Radio, Stack, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Radio.demo.card.module.css';
import { createSignal, For } from 'solid-js';

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
import { createSignal, For } from 'solid-js';
import { Radio, Group, Stack, Text } from '@empoleon/core';
import classes from './Demo.module.css';

const data = [
  {
    name: '@empoleon/core',
    description: 'Core components library: inputs, buttons, overlays, etc.',
  },
  { name: '@empoleon/hooks', description: 'Collection of reusable hooks for React applications.' },
  { name: '@empoleon/notifications', description: 'Notifications system' },
];

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <>
      <Radio.Group
        value={value()}
        onChange={setValue}
        label="Pick one package to install"
        description="Choose a package that you will need in your application"
      >
        <Stack pt="md" gap="xs">
          <For each={data}>
            {(item) => (
              <Radio.Card className={classes.root} radius="md" value={item.name}>
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <div>
                    <Text className={classes.label}>{item.name}</Text>
                    <Text className={classes.description}>{item.description}</Text>
                  </div>
                </Group>
              </Radio.Card>
            )}
          </For>
        </Stack>
      </Radio.Group>

      <Text fz="xs" mt="md">
        CurrentValue: {value() || '–'}
      </Text>
    </>
  );
}
`;

const data = [
  {
    name: '@empoleon/core',
    description: 'Core components library: inputs, buttons, overlays, etc.',
  },
  { name: '@empoleon/hooks', description: 'Collection of reusable hooks for React applications.' },
  { name: '@empoleon/notifications', description: 'Notifications system' },
];

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <>
      <Radio.Group
        value={value()}
        onChange={setValue}
        label="Pick one package to install"
        description="Choose a package that you will need in your application"
      >
        <Stack pt="md" gap="xs">
          <For each={data}>
            {(item) => (
              <Radio.Card className={classes.root} radius="md" value={item.name}>
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator />
                  <div>
                    <Text className={classes.label}>{item.name}</Text>
                    <Text className={classes.description}>{item.description}</Text>
                  </div>
                </Group>
              </Radio.Card>
            )}
          </For>
        </Stack>
      </Radio.Group>

      <Text fz="xs" mt="md">
        CurrentValue: {value() || '–'}
      </Text>
    </>
  );
}

export const cardGroup: EmpoleonDemo = {
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

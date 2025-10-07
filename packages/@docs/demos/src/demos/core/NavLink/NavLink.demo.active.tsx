import { IconActivity, IconChevronRight, IconFingerprint, IconGauge } from '@tabler/icons-solidjs';
import { createSignal, For } from 'solid-js';
import { Box, Group, NavLink } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, For } from 'solid-js';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-solidjs';
import { Box, Group, NavLink } from '@empoleon/core';

const data = [
  { icon: IconGauge, label: 'Dashboard', description: 'Item with description' },
  {
    icon: IconFingerprint,
    label: 'Security',
    rightSection: <IconChevronRight size={16} stroke='1.5' />,
  },
  { icon: IconActivity, label: 'Activity' },
];

function Demo() {
  const [active, setActive] = createSignal(0);

  return (
    <Group justify="center">
      <Box w={220}>
        <For each={data}>
          {(item, index) => (
            <NavLink
              href="#required-for-focus"
              active={index() === active()}
              label={item.label}
              description={item.description}
              rightSection={item.rightSection}
              leftSection={<item.icon size={16} stroke='1.5' />}
              onClick={() => setActive(index())}
              {...props}
            />
          )}
        </For>
      </Box>;
    </Group>
  );
}
`;

const data = [
  { icon: IconGauge, label: 'Dashboard', description: 'Item with description' },
  {
    icon: IconFingerprint,
    label: 'Security',
    rightSection: <IconChevronRight size={16} stroke="1.5" class="mantine-rotate-rtl" />,
  },
  { icon: IconActivity, label: 'Activity' },
];

function Demo(props: any) {
  const [active, setActive] = createSignal(0);

  const items = data.map((item, index) => (
    <NavLink
      href="#required-for-focus"
      active={index === active()}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size={16} stroke="1.5" />}
      onClick={() => setActive(index)}
      {...props}
    />
  ));

  return (
    <Group justify="center">
      <Box w={220}>
        <For each={data}>
          {(item, index) => (
            <NavLink
              href="#required-for-focus"
              active={index() === active()}
              label={item.label}
              description={item.description}
              rightSection={item.rightSection}
              leftSection={<item.icon size={16} stroke="1.5" />}
              onClick={() => setActive(index())}
              {...props}
            />
          )}
        </For>
      </Box>
      ;
    </Group>
  );
}

export const active: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'subtle', label: 'Subtle' },
        { value: 'light', label: 'Light' },
        { value: 'filled', label: 'Filled' },
      ],

      libraryValue: 'light',
      initialValue: 'light',
    },
  ],
};

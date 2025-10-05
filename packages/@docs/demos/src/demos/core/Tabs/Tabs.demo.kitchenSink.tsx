import { IconMessageCircle, IconPhoto, IconSettings, IconUser } from '@tabler/icons-solidjs';
import { Tabs, TabsProps, useDirection } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: TabsProps) {
  const { dir } = useDirection();
  const panelProps =
    () => props.orientation === 'vertical' ? { [dir === 'rtl' ? 'pr' : 'pl']: 'xs' } : { pt: 'xs' };

  return (
    <Tabs defaultValue="gallery" {...props}>
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
          Settings
        </Tabs.Tab>
        <Tabs.Tab value="account" leftSection={<IconUser size={12} />}>
          Account
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" {...panelProps}>
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" {...panelProps}>
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" {...panelProps}>
        Settings tab content
      </Tabs.Panel>

      <Tabs.Panel value="account" {...panelProps}>
        Account tab content
      </Tabs.Panel>
    </Tabs>
  );
}

const code = `
import { Tabs } from '@empoleon/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconUser } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Tabs{{props}} defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
          Settings
        </Tabs.Tab>
        <Tabs.Tab value="account" leftSection={<IconUser size={12} />}>
          Account
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>

      <Tabs.Panel value="account">
        Account tab content
      </Tabs.Panel>
    </Tabs>
  );
}`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue'
    },
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Outline', value: 'outline' },
        { label: 'Pills', value: 'pills' },
      ],
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
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
      prop: 'placement',
      type: 'select',
      initialValue: 'left',
      libraryValue: 'left',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      prop: 'inverted',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'keepMounted',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'activateTabWithKeyboard',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'allowTabDeactivation',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'loop',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
  ],
};

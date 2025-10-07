import { IconCalendar } from '@tabler/icons-solidjs';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Component, createSignal } from 'solid-js';

const getCode = (name: string) => `
import { createSignal } from 'solid-js';
import { IconCalendar } from '@tabler/icons-solidjs';
import { ${name} } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  const icon = <IconCalendar size={18} stroke='1.5' />;
  return (
    <${name}
      leftSection={<IconCalendar size={18} stroke='1.5' />}
      leftSectionPointerEvents="none"
      label="Pick date"
      placeholder="Pick date"
      value={value()}
      onChange={setValue}
    />
  );
}
`;

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<string | null>(null);
    return (
      <Component
        leftSection={<IconCalendar size={18} stroke='1.5px' />}
        leftSectionPointerEvents="none"
        label="Pick date"
        placeholder="Pick date"
        value={value()}
        onChange={setValue}
      />
    );
  };
}

export function getPickerInputIconDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}

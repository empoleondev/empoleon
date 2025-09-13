import { IconClock } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { TimeInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useRef } from 'react';
import { ActionIcon } from '@empoleon/core';
import { TimeInput } from '@empoleon/dates';
import { IconClock } from '@tabler/icons-solidjs';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <TimeInput label="Click icon to show browser picker" ref={ref} rightSection={pickerControl} />
  );
}
`;

function Demo() {
  const [ref, setRef] = createSignal<HTMLInputElement>();

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref()?.showPicker()}>
      <IconClock size={16} stroke='1.5' />
    </ActionIcon>
  );

  return (
    <TimeInput label="Click icon to show browser picker" ref={setRef} rightSection={pickerControl} />
  );
}

export const picker: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};

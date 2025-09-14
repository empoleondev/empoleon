import { IconCheck, IconX } from '@tabler/icons-solidjs';
import { Switch } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Switch } from '@empoleon/core';
import { IconCheck, IconX } from '@tabler/icons-solidjs';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="Switch with thumb icon"
      thumbIcon={
        checked ? (
          <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke={3} />
        ) : (
          <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
        )
      }
    />
  );
}
`;

function Demo() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Switch
      checked={checked()}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="Switch with thumb icon"
      thumbIcon={
        checked() ? (
          <IconCheck size={12} color="var(--mantine-color-teal-6)" stroke='3' />
        ) : (
          <IconX size={12} color="var(--mantine-color-red-6)" stroke='3' />
        )
      }
    />
  );
}

export const thumbIcon: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};

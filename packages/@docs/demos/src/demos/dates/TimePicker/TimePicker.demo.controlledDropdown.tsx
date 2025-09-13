import { IconClock } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { IconClock } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { TimePicker } from '@empoleon/dates';

function Demo() {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [value, setValue] = useState('');

  return (
    <TimePicker
      rightSection={
        <ActionIcon onClick={() => setDropdownOpened(true)} variant="default">
          <IconClock size={18} stroke={1.5} />
        </ActionIcon>
      }
      value={value}
      onChange={(val) => {
        setValue(val);
        if (value === '') {
          setDropdownOpened(false);
        }
      }}
      popoverProps={{
        opened: dropdownOpened,
        onChange: (_opened) => !_opened && setDropdownOpened(false),
      }}
    />
  );
}
`;

function Demo() {
  const [dropdownOpened, setDropdownOpened] = createSignal(false);
  const [value, setValue] = createSignal('');

  return (
    <TimePicker
      rightSection={
        <ActionIcon onClick={() => setDropdownOpened(true)} variant="default">
          <IconClock size={18} stroke='1.5' />
        </ActionIcon>
      }
      value={value()}
      onChange={(val) => {
        setValue(val);
        if (value() === '') {
          setDropdownOpened(false);
        }
      }}
      popoverProps={{
        opened: dropdownOpened(),
        onChange: (_opened) => !_opened && setDropdownOpened(false),
      }}
    />
  );
}

export const controlledDropdown: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};

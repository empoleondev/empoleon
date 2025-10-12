import { IconCheck, IconX } from '@tabler/icons-solidjs';
import { createSignal, For } from 'solid-js';
import { Box, PasswordInput, Popover, Progress, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-solidjs';
import { PasswordInput, Progress, Text, Popover, Box } from '@empoleon/core';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function Demo() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label="Your password"
            placeholder="Your password"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function PasswordRequirement(props: { meets: boolean; label: string }) {
  return (
    <Text
      c={props.meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {props.meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{props.label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

function Demo() {
  const [popoverOpened, setPopoverOpened] = createSignal(false);
  const [value, setValue] = createSignal('');
  const strength = () => getStrength(value());
  const color = () => strength() === 100 ? 'teal' : strength() > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened()}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        {(targetProps) => (
          <div
            {...targetProps}
            onFocusIn={() => setPopoverOpened(true)}
            onFocusOut={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              label="Your password"
              placeholder="Your password"
              value={value()}
              onInput={(event) => setValue(event.currentTarget.value)}
            />
          </div>
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color()} value={strength()} size={5} mb="xs" />
        <PasswordRequirement label="Includes at least 6 characters" meets={value().length > 5} />
        <For each={requirements}>
          {(requirement) => (
            <PasswordRequirement label={requirement.label} meets={requirement.re.test(value())} />
          )}
        </For>
      </Popover.Dropdown>
    </Popover>
  );
}

export const strengthMeter: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};

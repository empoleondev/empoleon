import { IconChevronDown, IconChevronUp } from '@tabler/icons-solidjs';
import { Button } from '@empoleon/core';
import { useCounter } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { IconChevronDown, IconChevronUp } from '@tabler/icons-solidjs';
import { Button } from '@empoleon/core';
import { useCounter } from '@empoleon/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <Button.Group>
      <Button variant="default" radius="md" onClick={decrement}>
        <IconChevronDown color="var(--empoleon-color-red-text)" />
      </Button>
      <Button.GroupSection variant="default" bg="var(--empoleon-color-body)" miw={80}>
        {value}
      </Button.GroupSection>
      <Button variant="default" radius="md" onClick={increment}>
        <IconChevronUp color="var(--empoleon-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}
`;

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <Button.Group>
      <Button variant="default" radius="md" onClick={decrement}>
        <IconChevronDown color="var(--empoleon-color-red-text)" />
      </Button>
      <Button.GroupSection variant="default" bg="var(--empoleon-color-body)" miw={80}>
        {value()}
      </Button.GroupSection>
      <Button variant="default" radius="md" onClick={increment}>
        <IconChevronUp color="var(--empoleon-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}

export const groupSection: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};

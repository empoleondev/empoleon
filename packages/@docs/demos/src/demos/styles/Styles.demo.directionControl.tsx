import { IconTextDirectionLtr, IconTextDirectionRtl } from '@tabler/icons-solidjs';
import { createEffect } from 'solid-js';
import { ActionIcon, useDirection } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, useDirection } from '@empoleon/core';
import { IconTextDirectionLtr, IconTextDirectionRtl } from '@tabler/icons-solidjs';

function Demo() {
  const { toggleDirection, dir } = useDirection();
  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" radius="md" size="lg">
      {dir === 'rtl' ? (
        <IconTextDirectionLtr stroke='1.5' />
      ) : (
        <IconTextDirectionRtl stroke='1.5' />
      )}
    </ActionIcon>
  );
}
`;

function Demo() {
  const { toggleDirection, dir, setDirection } = useDirection();
  createEffect(() => () => setDirection('ltr'), []);

  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" radius="md" size="lg">
      {dir === 'rtl' ? (
        <IconTextDirectionLtr stroke="1.5" />
      ) : (
        <IconTextDirectionRtl stroke="1.5" />
      )}
    </ActionIcon>
  );
}

export const directionControl: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};

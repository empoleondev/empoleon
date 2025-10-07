import { createSignal } from 'solid-js';
import { Chip, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Chip, Group } from '@empoleon/core';

function Demo() {
  const [value, setValue] = useState<string | null>('first');
  const handleChipClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === value) {
      setValue(null);
    }
  };

  return (
    <Chip.Group multiple={false} value={value} onChange={setValue}>
      <Group>
        <Chip value="first" onClick={handleChipClick}>
          First
        </Chip>
        <Chip value="second" onClick={handleChipClick}>
          Second
        </Chip>
        <Chip value="third" onClick={handleChipClick}>
          Third
        </Chip>
      </Group>
    </Chip.Group>
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>('first');
  const handleChipClick = (
    event: MouseEvent & { currentTarget: HTMLInputElement; target: Element }
  ) => {
    if (event.currentTarget.value === value()) {
      setValue(null);
    }
  };

  return (
    <Chip.Group multiple={false} value={value()} onChange={setValue}>
      <Group>
        <Chip value="first" onClick={handleChipClick}>
          First
        </Chip>
        <Chip value="second" onClick={handleChipClick}>
          Second
        </Chip>
        <Chip value="third" onClick={handleChipClick}>
          Third
        </Chip>
      </Group>
    </Chip.Group>
  );
}

export const deselect: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};

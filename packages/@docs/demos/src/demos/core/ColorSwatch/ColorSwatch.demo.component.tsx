import { createSignal } from 'solid-js';
import { CheckIcon, ColorSwatch } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal } from 'solid-js';
import { ColorSwatch, CheckIcon } from '@empoleon/core';

function Demo() {
  const [checked, setChecked] = createSignal(true);

  return (
    <ColorSwatch
      component="button"
      color="var(--empoleon-color-grape-6)"
      onClick={() => setChecked((c) => !c)}
      style={{ color: '#fff', cursor: 'pointer' }}
    >
      {checked() && <CheckIcon size={12} />}
    </ColorSwatch>
  );
}
`;

function Demo() {
  const [checked, setChecked] = createSignal(true);

  return (
    <ColorSwatch
      component="button"
      color="var(--empoleon-color-grape-6)"
      onClick={() => setChecked((c) => !c)}
      c="white"
      style={{ cursor: 'pointer' }}
    >
      {checked() && <CheckIcon size={12} />}
    </ColorSwatch>
  );
}

export const component: EmpoleonDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};

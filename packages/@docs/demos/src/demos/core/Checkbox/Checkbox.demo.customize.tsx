import { Checkbox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Checkbox.demo.customize.module.css';
import { createSignal } from 'solid-js';

const cssCode = `
.root {
  border: 1px solid light-dark(var(--empoleon-color-gray-3), var(--empoleon-color-dark-4));
  padding: var(--empoleon-spacing-xs) var(--empoleon-spacing-sm);
  border-radius: var(--empoleon-radius-md);
  font-weight: 500;
  transition:
    color 100ms ease,
    background-color 100ms ease,
    border-color 100ms ease;
  cursor: pointer;

  &[data-checked] {
    background-color: var(--empoleon-color-blue-filled);
    border-color: var(--empoleon-color-blue-filled);
    color: var(--empoleon-color-white);
  }

  & * {
    pointer-events: none;
    user-select: none;
  }
}
`;

const code = `
import { useState } from 'react';
import { Checkbox } from '@empoleon/core';
import classes from './Demo.module.css';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      classNames={classes}
      label="Checkbox button"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}
`;

function Demo() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Checkbox
      classNames={classes}
      label="Checkbox button"
      checked={checked()}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      wrapperProps={{
        onClick: () => setChecked((c) => !c),
      }}
    />
  );
}

export const customize: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  defaultExpanded: false,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};

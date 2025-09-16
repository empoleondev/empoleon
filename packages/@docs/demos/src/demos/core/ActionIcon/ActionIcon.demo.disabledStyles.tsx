import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './ActionIcon.demo.disabledStyles.module.css';

const code = `
import { ActionIcon } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <IconHeart />
    </ActionIcon>
  );
}
`;

const cssCode = `
.button {
  &:disabled,
  &[data-disabled] {
    border-color: light-dark(var(--empoleon-color-gray-3), var(--empoleon-color-dark-4));
    background-color: transparent;
  }
}
`;

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <IconHeart />
    </ActionIcon>
  );
}

export const disabledStyles: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};

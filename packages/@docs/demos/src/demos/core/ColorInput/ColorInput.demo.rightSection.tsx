import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';
import { ActionIcon, ColorInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';
import { ActionIcon, ColorInput } from '@empoleon/core';

const randomColor = () => \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`;

function Demo() {
  const [value, onChange] = useState(randomColor());
  return (
    <ColorInput
      placeholder="Pick color"
      label="Your favorite color"
      value={value}
      onChange={onChange}
      rightSection={
        <ActionIcon onClick={() => onChange(randomColor())}>
          <IconRefresh size={16} />
        </ActionIcon>
      }
    />
  );
}
`;

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

function Demo() {
  const [value, onChange] = useState(randomColor());
  return (
    <ColorInput
      maw={320}
      mx="auto"
      placeholder="Pick color"
      label="Your favorite color"
      value={value}
      onChange={onChange}
      rightSection={
        <ActionIcon onClick={() => onChange(randomColor())}>
          <IconRefresh size={16} />
        </ActionIcon>
      }
    />
  );
}

export const rightSection: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};

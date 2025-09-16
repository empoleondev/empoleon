import { Button } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--empoleon-color-pink-filled) 0%, var(--empoleon-color-orange-filled) 50%, var(--empoleon-color-yellow-filled) 100%)';

  return (
    <Button
      radius="md"
      styles={{
        root: {
          padding: 2,
          border: 0,
          backgroundImage: gradient,
        },

        inner: {
          background: 'var(--empoleon-color-body)',
          color: 'var(--empoleon-color-text)',
          borderRadius: 'calc(var(--button-radius) - 2px)',
          paddingLeft: 'var(--empoleon-spacing-md)',
          paddingRight: 'var(--empoleon-spacing-md)',
        },

        label: {
          backgroundImage: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      Gradient button
    </Button>
  );
}
`;

function Demo() {
  const gradient =
    'linear-gradient(45deg, var(--empoleon-color-pink-filled) 0%, var(--empoleon-color-orange-filled) 50%, var(--empoleon-color-yellow-filled) 100%)';

  return (
    <Button
      radius="md"
      styles={{
        root: {
          padding: '2px',
          border: 0,
          'background-image': gradient,
        },

        inner: {
          background: 'var(--empoleon-color-body)',
          color: 'var(--empoleon-color-text)',
          'border-radius': 'calc(var(--button-radius) - 2px)',
          'padding-left': 'var(--empoleon-spacing-md)',
          'padding-right': 'var(--empoleon-spacing-md)',
        },

        label: {
          'background-image': gradient,
          '--webkit-background-clip': 'text',
          '--webkit-text-fill-color': 'transparent',
        },
      }}
    >
      Gradient button
    </Button>
  );
}

export const styles: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};

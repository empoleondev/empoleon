import { Highlight } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Highlight } from '@empoleon/core';

function Demo() {
  return (
    <Highlight
      ta="center"
      highlight={['highlighted', 'default']}
      highlightStyles={{
        backgroundImage:
          'linear-gradient(45deg, var(--empoleon-color-cyan-5), var(--empoleon-color-indigo-5))',
        fontWeight: 700,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      You can change styles of highlighted part if you do not like default styles
    </Highlight>
  );
}
`;

function Demo() {
  return (
    <Highlight
      ta="center"
      highlight={['highlighted', 'default']}
      highlightStyles={{
        'background-image':
          'linear-gradient(45deg, var(--empoleon-color-cyan-5), var(--empoleon-color-indigo-5))',
        'font-weight': 700,
        '--webkit-background-clip': 'text',
        '--webkit-text-fill-color': 'transparent',
      }}
    >
      You can change styles of highlighted part if you do not like default styles
    </Highlight>
  );
}

export const styles: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};

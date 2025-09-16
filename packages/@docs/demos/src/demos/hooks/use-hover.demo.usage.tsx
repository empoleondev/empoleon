import { Text } from '@empoleon/core';
import { useHover } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useHover } from '@empoleon/hooks';

function Demo() {
  const { hovered, ref } = useHover();
  return (
    <div ref={ref}>
      {hovered ? 'I am hovered' : 'Put mouse over me please'}
    </div>
  );
}
`;

function Demo() {
  const { hovered, ref } = useHover();
  return (
    <div
      ref={ref}
      style={{
        height: '60px',
        'background-color': 'var(--empoleon-color-blue-light)',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      }}
    >
      <Text>{hovered() ? 'I am hovered' : 'Put mouse over me please'}</Text>
    </div>
  );
}

export const useHoverDemo: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};

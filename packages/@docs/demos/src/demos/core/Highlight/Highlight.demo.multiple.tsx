import { Highlight } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Highlight } from '@empoleon/core';

function Demo() {
  return <Highlight highlight={['this', 'that']}>Highlight this and also that</Highlight>;
}
`;

function Demo() {
  return <Highlight highlight={['this', 'that']}>Highlight this and also that</Highlight>;
}

export const multiple: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};

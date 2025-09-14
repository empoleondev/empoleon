import { getTreeExpandedState, Tree, useTree } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { data, dataCode } from './data';

const code = `
import { getTreeExpandedState, Tree, useTree } from '@empoleon/core';
import { data } from './data';

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, ['src', 'src/components']),
  });

  return <Tree data={data} tree={tree} />;
}
`;

function Demo() {
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(data, ['src', 'src/components']),
  });

  return <Tree data={data} tree={tree} />;
}

export const expandedState: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
};

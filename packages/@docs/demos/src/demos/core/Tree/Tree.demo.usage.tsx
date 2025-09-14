import { Tree } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { data, dataCode } from './data';

const code = `
import { Tree } from '@empoleon/core';
import { data } from './data';

function Demo() {
  return <Tree data={data} />;
}
`;

function Demo() {
  return <Tree data={data} />;
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
};

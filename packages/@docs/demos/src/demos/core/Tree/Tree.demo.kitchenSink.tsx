import { Tree, TreeProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { data, dataCode } from './data';

const code = `
import { Tree } from '@empoleon/core';
import { data } from './data';

function Demo() {
  return (
    <Tree{{props}} data={data} />
  );
}
`;

function Demo(props: TreeProps) {
  return <Tree {...props} data={data} />;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  centered: true,
  controls: [
    {
      prop: 'levelOffset',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'expandOnClick',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'expandOnSpace',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'selectOnClick',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'clearSelectionOnOutsideClick',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'allowRangeSelection',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'checkOnSpace',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};

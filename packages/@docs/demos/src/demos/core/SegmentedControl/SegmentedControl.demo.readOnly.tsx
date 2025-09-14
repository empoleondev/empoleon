import { SegmentedControl } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { SegmentedControl } from '@empoleon/core';

function Demo() {
  return <SegmentedControl readOnly defaultValue="Angular" data={['React', 'Angular', 'Vue']} />;
}
`;

function Demo() {
  return <SegmentedControl readOnly defaultValue="Angular" data={['React', 'Angular', 'Vue']} />;
}

export const readOnly: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};

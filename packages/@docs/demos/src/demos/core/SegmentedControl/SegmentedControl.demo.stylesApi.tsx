import { SegmentedControl } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { SegmentedControlStylesApi } from '@docs/styles-api';

const code = `
import { SegmentedControl } from '@empoleon/core';

function Demo() {
  return <SegmentedControl{{props}} data={['React', 'Angular', 'Vue']} />;
}
`;

function Demo(props: any) {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} {...props} />;
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: SegmentedControlStylesApi,
  component: Demo,
  code,
  centered: true,
};

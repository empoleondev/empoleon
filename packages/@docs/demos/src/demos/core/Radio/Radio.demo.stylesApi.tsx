import { Radio } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { RadioStylesApi } from '@docs/styles-api';

const code = `
import { Radio } from '@empoleon/core';

function Demo() {
  return (
    <Radio
      label="Radio"
      description="Radio description"
      error="Radio error"
      defaultChecked
     {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Radio
      label="Radio"
      description="Radio description"
      error="Radio error"
      defaultChecked
      {...props}
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: RadioStylesApi,
  component: Demo,
  code,
  centered: true,
};

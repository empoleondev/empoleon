import { Radio } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
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

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: RadioStylesApi,
  component: Demo,
  code,
  centered: true,
};

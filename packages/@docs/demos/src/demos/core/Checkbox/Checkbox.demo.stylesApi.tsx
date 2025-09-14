import { Checkbox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { CheckboxStylesApi } from '@docs/styles-api';

const code = `
import { Checkbox } from '@empoleon/core';

function Demo() {
  return (
    <Checkbox
      label="Checkbox"
      description="Checkbox description"
      error="Checkbox error"
      defaultChecked
     {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Checkbox
      label="Checkbox"
      description="Checkbox description"
      error="Checkbox error"
      defaultChecked
      {...props}
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: CheckboxStylesApi,
  component: Demo,
  code,
  centered: true,
};

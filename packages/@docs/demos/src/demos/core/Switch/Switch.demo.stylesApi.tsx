import { Switch } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { SwitchStylesApi } from '@docs/styles-api';

const code = `
import { Switch } from '@empoleon/core';

function Demo() {
  return <Switch{{props}} label="Switch component" description="Switch description" error="Switch error />;
}
`;

function Demo(props: any) {
  return (
    <Switch
      {...props}
      label="Switch component"
      description="Switch description"
      error="Switch error"
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: SwitchStylesApi,
  component: Demo,
  centered: true,
  code,
};

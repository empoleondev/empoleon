import { PinInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { PinInputStylesApi } from '@docs/styles-api';

const code = `
import { PinInput } from '@empoleon/core';

function Demo() {
  return (
    <PinInput{{props}} />
  );
}
`;

function Demo(props: any) {
  return <PinInput {...props} />;
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: PinInputStylesApi,
  component: Demo,
  code,
  centered: true,
};

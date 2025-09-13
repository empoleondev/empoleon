import { PinInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
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

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: PinInputStylesApi,
  component: Demo,
  code,
  centered: true,
};

import { IconAt } from '@tabler/icons-react';
import { NumberInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { NumberInputStylesApi } from '@docs/styles-api';

const code = `
import { IconAt } from '@tabler/icons-react';
import { NumberInput } from '@empoleon/core';

function Demo() {
  return (
    <NumberInput
      label="Label"
      placeholder="NumberInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <NumberInput
      label="Label"
      placeholder="NumberInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: NumberInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};

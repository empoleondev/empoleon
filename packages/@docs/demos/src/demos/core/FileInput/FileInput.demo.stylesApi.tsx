import { IconAt } from '@tabler/icons-solidjs';
import { FileInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { FileInputStylesApi } from '@docs/styles-api';

const code = `
import { IconAt } from '@tabler/icons-solidjs';
import { FileInput } from '@empoleon/core';

function Demo() {
  return (
    <FileInput
      label="Label"
      placeholder="FileInput"
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
    <FileInput
      label="Label"
      placeholder="FileInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      {...props}
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: FileInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};

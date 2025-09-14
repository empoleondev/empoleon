import { IconAt } from '@tabler/icons-solidjs';
import { Textarea } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { TextareaStylesApi } from '@docs/styles-api';

const code = `
import { IconAt } from '@tabler/icons-solidjs';
import { Textarea } from '@empoleon/core';

function Demo() {
  return (
    <Textarea
      label="Label"
      placeholder="Textarea"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      autosize
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Textarea
      label="Label"
      placeholder="Textarea"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconAt size={18} />}
      autosize
      {...props}
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: TextareaStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};

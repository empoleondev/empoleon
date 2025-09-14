import { IconLock } from '@tabler/icons-solidjs';
import { PasswordInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { PasswordInputStylesApi } from '@docs/styles-api';

const code = `
import { IconLock } from '@tabler/icons-solidjs';
import { PasswordInput } from '@empoleon/core';

function Demo() {
  return (
    <PasswordInput
      label="Label"
      placeholder="PasswordInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconLock size={18} />}
      {{props}}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <PasswordInput
      label="Label"
      placeholder="PasswordInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<IconLock size={18} />}
      {...props}
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: PasswordInputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
